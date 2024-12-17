import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/project.routes";
import { connectDatabase } from './config/database';
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { requestLogger } from "./middleware/logger.middleware";

dotenv.config();

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Logging, because why not
app.use(requestLogger);

// Routes definitions
app.use(`${env.API_PREFIX}/projects`, projectRoutes);

// Error middleware
app.use(errorHandler);

// Connect to database
connectDatabase();

app.listen(env.PORT, () => {
  console.log('Server is running on PORT ', env.PORT);
});
