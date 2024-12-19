import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { toMs } from "../util/time";

export const securityMiddleware = helmet();

export const apiLimiter = rateLimit({
  windowMs: toMs({ minutes: 15 }),
  limit: 100,
  message: "Too many requests from this IP, or maybe a big fan? Come back in 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
})

export const authLimiter = rateLimit({
  windowMs: toMs({ minutes: 30 }),
  limit: 5,
  message: "Too many login attempts, please try again after an hour",
});