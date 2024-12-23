import { z } from "zod";

/**
 * Next.js will load the variables in this order:
 *
 * .env.${NODE_ENV}.local
 * .env.local (except in test environment)
 * .env.${NODE_ENV}
 * .env
 */

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  API_URL: z.string(),
  CMS_ADMIN_PATH: z.string(),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join("."));
      throw new Error(
        `❌ Invalid environment variables: ${missingVars.join(", ")}\n${error.message}`,
      );
    }
    throw error;
  }
};

export const env = parseEnv();
