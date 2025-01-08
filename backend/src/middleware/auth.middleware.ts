import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthenticationError, TokenExpiredError } from "../util/errors";
import { User } from "../types/user";
import { AUTH } from "@portfolio-v3/shared";

export type AuthRequest = Request & {
  user?: User;
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as User;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError();
    }
    throw new AuthenticationError("The token provided is invalid");
  }
};

export const authMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";

    if (!token) {
      throw new AuthenticationError("No token provided");
    }

    req.user = verifyToken(token);
    next();
  } catch (error) {
    next(error);
  }
};
