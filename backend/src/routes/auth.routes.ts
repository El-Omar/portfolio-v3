import express from "express";
import { z } from "zod";
import { login } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validate.middleware";

const router = express.Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});

router.post("/login", validateRequest(loginSchema), login);

export default router;
