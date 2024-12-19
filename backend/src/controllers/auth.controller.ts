import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { InvalidCredentialsError } from "../util/errors";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (
      email !== env.CMS_ADMIN_USERNAME ||
      password !== env.CMS_ADMIN_PASSWORD
    ) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign(
      {
        id: "cms-admin",
        email: env.CMS_ADMIN_USERNAME,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      }
    );

    res.json({
      status: "success",
      data: {
        token,
        user: {
          email: env.CMS_ADMIN_USERNAME,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
