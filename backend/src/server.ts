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

dotenv.config();

const app = express();

// Security: helmet
app.use(securityMiddleware);

// Basic middleware
app.use(cors());
app.use(express.json());

// Logging, because why not
app.use(requestLogger);

// Security: rate limiter
app.use(apiLimiter);

// Routes definitions
app.use(`${env.API_PREFIX}/${env.CMS_ADMIN_PATH}/auth`, authRoutes)
app.use(`${env.API_PREFIX}/projects`, projectRoutes);
app.use(`${env.API_PREFIX}/uploads`, uploadRoutes);

// Error middleware
app.use(errorHandler);

// Connect to database
connectDatabase();

app.listen(env.PORT, () => {
  console.log("Server is running on PORT ", env.PORT);
});
