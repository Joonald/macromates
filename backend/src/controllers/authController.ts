import { RequestHandler, Response } from "express";
import User from "../models/userModels";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Types } from "mongoose";
import { CookieOptions } from "express-serve-static-core";
import catchError from "../util/catchError";

const signAccessToken = (id: Types.ObjectId) => {
  return jwt.sign({ id: id }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

const signRefreshToken = (id: Types.ObjectId) => {
  return jwt.sign({ id: id }, process.env.JWT_REFRESH_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const signUp: RequestHandler = async (req, res) => {
  try {
    // Creating new user with sign up information
    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // Signs the token and sends the server
    const accessToken = signAccessToken(newUser._id);
    const refreshToken = signRefreshToken(newUser._id);
    const cookieOption: CookieOptions = {
      secure: true,
      httpOnly: true,
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      sameSite: "none",
    };

    // Set the jwt token, and returns accessToken and user info
    res.cookie("jwt", refreshToken, cookieOption);
    return res.status(201).json({
      status: "success",
      message: "New user has been created",
      accessToken,
      user: newUser,
    });
  } catch (error: any) {
    // Checking mongodb error to provide user feedback if duplicate username or email
    if (error.code && error.code === 11000) {
      const field = Object.keys(error.keyValue);
      const code = 409;
      return res.status(code).send({
        field,
        message: `An account with that ${field} already exists.`,
      });
    }
    return catchError(res, 500, "An error has occured during signup.");
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Check if email and password exists
    if (!username || !password) {
      return catchError(res, 401, "Incorrect username or password.");
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ username: username }).select("+password");

    // Calling the user instance method to compare passwords
    // Awaiting the instance method beacuse its an async operation
    if (!user || !(await user!.correctPassword(password, user!.password))) {
      return catchError(res, 401, "Incorrect username or password.");
    }

    // Signs the token and sends the server
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    const cookieOption: CookieOptions = {
      secure: true,
      httpOnly: true,
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      sameSite: "none",
    };

    // Set the jwt token, and returns accessToken and user info
    res.cookie("jwt", refreshToken, cookieOption);
    return res.status(200).json({
      status: "success",
      message: "Log in successful",
      accessToken,
      user,
    });
  } catch (error) {
    return catchError(res, 500, "An error has occured during login.");
  }
};

export const me: RequestHandler = async (req, res) => {
  // This routes helps the frontend persist user login state by returning user info on refresh
  return res.status(200).json({
    message: "success",
    user: req.user,
  });
};

export const refreshToken: RequestHandler = async (req, res) => {
  // 1. Check request cookies
  const refreshToken = req.cookies.jwt;

  // 2. Check if refresh token is present
  if (!refreshToken) return catchError(res, 401, "No refresh token provided.");

  // 3. Verify refresh token
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    ) as {
      id: string;
      iat: number;
      exp: number;
    };

    // 4. Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user)
      return catchError(
        res,
        401,
        "The user belonging to this token no longer exists."
      );

    // 5. Create and return new access token
    const newAccessToken = signAccessToken(user._id);
    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    catchError(res, 403, "Invalid refresh token.");
  }
};

export const protectRoute: RequestHandler = async (req, res, next) => {
  try {
    // 1. Getting access token from headers
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Check if access token is present
    if (!token) return catchError(res, 401, "Please log in to get access.");

    // 3. Verifify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as {
      id: string;
      iat: number;
      exp: number;
    };

    // 4. Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) return catchError(res, 401, "User no longer exists.");

    // 5. Grant access to the protected route
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return catchError(res, 401, "Token Expired. Please sign in again.");
    } else if (error instanceof JsonWebTokenError) {
      return catchError(res, 401, "Invalid Token. Please sign in again.");
    } else {
      // Fallback for other errors
      return catchError(res, 500, "Unknown error has occured.");
    }
  }
};
