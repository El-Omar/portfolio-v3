import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/errors";
import { ZodError } from "zod";
import { Error as MongooseError } from "mongoose";
import { ENVIRONMENT } from "../config/environment";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error
  let statusCode = 500;
  let message = "Internal server error";
  let errors: string[] | undefined;

  // Handle known errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Handle Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errors = err.errors.map((e) => e.message);
  }
  // Handle Mongoose validation errors
  else if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = "Validation error";
    errors = Object.values(err.errors).map((e) => e.message);
  }

  if (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
    res.status(statusCode).json({
      status: "error",
      message,
      errors,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      status: "error",
      message,
      errors,
    });
  }
};
