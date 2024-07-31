import { RequestHandler } from "express";
import User from "../models/userModels";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const signToken = (id: Types.ObjectId) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE_IN,
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
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      message: "New user has been created",
      token,
      data: newUser,
    });
  } catch (error: any) {
    try {
      // Checking mongodb error to provide user feedback if duplicate username or email
      if (error.code && error.code === 11000) {
        const field = Object.keys(error.keyValue);
        const code = 409;
        res.status(code).send({
          field,
          message: `An account with that ${field} already exists.`,
        });
      }
    } catch (error) {
      res.status(500).send("An unknown error occured.");
    }
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
    const user = await User.findOne({ username: username }).select(
      "+password -firstName -lastName -email"
    );
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
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      message: "Log in successful",
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Incorrect username or password.",
      message: error,
    });
  }
};
