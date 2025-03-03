import mongoose from "mongoose";
import { env } from "./env";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export const connectDatabase = async (retryCount = 0): Promise<void> => {
  try {
    // Use the full URI if provided, otherwise construct from components
    const uri =
      `mongodb://${env.MONGO_INITDB_ROOT_USERNAME}:${env.MONGO_INITDB_ROOT_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGO_INITDB_DATABASE}?authSource=${env.MONGO_INITDB_AUTH_SOURCE}`;

    console.log(
      `Connecting to MongoDB (attempt ${retryCount + 1}/${MAX_RETRIES + 1})...`
    );

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Keep low for fast failures in development
    });

    console.log("✅ MongoDB connected successfully");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        console.error("Error during MongoDB disconnection:", err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);

    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection in ${RETRY_DELAY_MS / 1000} seconds...`);
      setTimeout(() => {
        connectDatabase(retryCount + 1);
      }, RETRY_DELAY_MS);
    } else {
      console.error("Max retries reached. Could not connect to MongoDB.");
      process.exit(1);
    }
  }
};
