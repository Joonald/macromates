import { Response } from "express";

const catchError = (res: Response, statusCode: number, statusMsg: string) => {
  return res.status(statusCode).json({
    status: "fail",
    message: statusMsg,
  });
};

export default catchError;
