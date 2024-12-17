import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/project.routes";
import { connectDatabase } from './config/database';
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// Middleware stuff
app.use(cors());
app.use(express.json());

// Routes definitions
app.use(`${env.API_PREFIX}/projects`, projectRoutes);

// Error middleware
app.use(errorHandler);

// Connect to database
connectDatabase();

app.listen(env.PORT, () => {
  console.log('Server is running on PORT ', env.PORT);
});
