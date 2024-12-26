import { loginSchema as baseLoginSchema } from "@portfolio-v3/shared";
import { z } from "zod";

export const loginSchema = z.object({
  body: baseLoginSchema,
});
