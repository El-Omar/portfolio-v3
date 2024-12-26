import { Request, Response, NextFunction } from "express";
import ms from "ms";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { InvalidCredentialsError } from "../util/errors";
import { AUTH_TOKEN_KEY, COOKIE_OPTIONS } from "../constants/auth";

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

    const expiresIn = env.JWT_EXPIRES_IN;
    const maxAge = ms(expiresIn);

    const token = jwt.sign(
      {
        id: "cms-admin",
        email: env.CMS_ADMIN_USERNAME,
      },
      env.JWT_SECRET,
      {
        expiresIn,
      }
    );

    res.cookie(AUTH_TOKEN_KEY, token, {
      ...COOKIE_OPTIONS,
      maxAge,
    });

    res.json({
      status: "success",
      data: {
        token,
        user: {
          email: env.CMS_ADMIN_USERNAME,
        },
        maxAge,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (_: Request, res: Response) => {
  res.clearCookie(AUTH_TOKEN_KEY, COOKIE_OPTIONS);

  res.json({ status: "success" });
};
