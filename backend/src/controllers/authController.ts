import { RequestHandler } from "express";
import User from "../models/userModels";
import jwt from "jsonwebtoken";

export const signUp: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
      function (err, token) {
        res.status(201).json({
          status: "New user has been created.",
          token,
          data: newUser,
        });
      }
    );
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Check if email and password exists
    if (!username || !password) {
      return next(Error("Please provide email and password"));
    }
    // Check if user exists && password is correct
    const user = await User.findOne({ username: username }).select("+password");
    // Calling the user instance method to compare passwords
    const correctPassword = user!.correctPassword(password, user!.password);
    if (!user || !correctPassword) {
      return next(Error("Incorrect email or password."));
    }
    // Signs the token and sends the server
    jwt.sign(
      { _id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRE_IN },
      function (err, token) {
        res.status(200).json({
          status: "You've successfully logged in.",
          token,
        });
      }
    );
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};
