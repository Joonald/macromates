import { RequestHandler } from "express";
import User from "../models/userModels";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { CookieOptions } from "express-serve-static-core";

const signToken = (id: Types.ObjectId) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
};

export const signUp: RequestHandler = async (req, res) => {
  try {
    // creating new user with sign up information
    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    // Signs the token and sends the server
    const accessToken = signToken(newUser._id);
    const refreshToken = signToken(newUser._id);
    const cookieOptions = {
      // secure: true,
      domain: undefined,
      httpOnly: true,
      maxAge: Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    };
    res.cookie("jwt", refreshToken, cookieOptions);
    res.status(201).json({
      status: "success",
      message: "New user has been created",
      accessToken,
      user: newUser,
    });
    console.log(req.headers, "request headers");
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
    return res.status(500).send("An unknown error occured.");
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Check if email and password exists
    if (!username || !password) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Incorrect username or password",
        })
      );
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ username: username }).select("+password");
    // Calling the user instance method to compare passwords
    // Awaiting the instance method beacuse its an async operation
    if (!user || !(await user!.correctPassword(password, user!.password))) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Incorrect username or password",
        })
      );
    }

    // Signs the token and sends the server
    const accessToken = signToken(user._id);
    const refreshToken = signToken(user._id);

    const cookieOption: CookieOptions = {
      secure: true,
      httpOnly: true,
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIES_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      sameSite: "none",
    };

    res.cookie("jwt", refreshToken, cookieOption);
    res.status(200).json({
      status: "success",
      message: "Log in successful",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(404).json({
      status: "Incorrect username or password.",
      message: error,
    });
  }
};

export const protectRoute: RequestHandler = async (req, res, next) => {
  // 1 Getting token and check if its there
  // req.requestTime = new Date();
  // 2 Verification token
  // 3 Check if user still exists
  // 4 CHeck if user changed password after the token was issued
};
