import { Request, Response, NextFunction } from "express";
import ms from "ms";
import jwt from "jsonwebtoken";
import { AUTH } from "@portfolio-v3/shared";
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

    res.cookie(AUTH.KEY, token, {
      ...AUTH.OPTIONS,
      secure: env.NODE_ENV === "production",
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
  res.clearCookie(AUTH.KEY, {
    ...AUTH.OPTIONS,
    secure: env.NODE_ENV === "production",
  });

  res.json({ status: "success" });
};
