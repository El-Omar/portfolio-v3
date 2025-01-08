import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/project.routes";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { requestLogger } from "./middleware/logger.middleware";
import {
  apiLimiter,
  securityMiddleware,
} from "./middleware/security.middleware";
import { API_ROUTES } from "@portfolio-v3/shared";

dotenv.config();

const app = express();

// Security helmet
app.use(securityMiddleware);

app.use(express.json());

// Basic middleware
app.use(cors());

// Logging, because why not
app.use(requestLogger);

// Security: rate limiter
app.use(apiLimiter);

// Routes definitions
app.use(
  `${env.API_PREFIX}/${env.CMS_ADMIN_PATH}${API_ROUTES.AUTH.BASE}`,
  authRoutes
);
app.use(`${env.API_PREFIX}${API_ROUTES.PROJECTS.BASE}`, projectRoutes);
app.use(`${env.API_PREFIX}${API_ROUTES.UPLOADS.BASE}`, uploadRoutes);

// Error middleware
app.use(errorHandler);

// Connect to database
connectDatabase();

app.listen(env.PORT, () => {
  console.log("Server is running on PORT ", env.PORT);
});
