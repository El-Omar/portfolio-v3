import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load the appropriate .env file based on NODE_ENV
const envPath = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV || 'development'}`
);
dotenv.config({ path: envPath });

// Environment validation schema
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().transform(Number).default("5000"),
  API_PREFIX: z.string().default("/api/v1"),

  // Database
  MONGODB_URI: z.string().url(),
  MONGODB_HOST: z.string(),
  MONGODB_PORT: z.string().transform(Number),
  MONGODB_DATABASE: z.string(),
  MONGODB_USERNAME: z.string(),
  MONGODB_PASSWORD: z.string(),
  MONGODB_AUTH_SOURCE: z.string().default("admin"),

  // Cloud Storage
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET: z.string(),
  AWS_REGION: z.string(),
  AWS_ALLOWED_MIME_TYPES: z.string(),
  AWS_MAX_FILE_SIZE: z.string(),

  // Content Management
  CMS_ADMIN_USERNAME: z.string().email(),
  CMS_ADMIN_PASSWORD: z.string().min(12),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string(),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join('.'));
      throw new Error(
        `❌ Invalid environment variables: ${missingVars.join(', ')}\n${error.message}`
      );
    }
    throw error;
  }
};

// Export validated environment variables
export const env = parseEnv();
