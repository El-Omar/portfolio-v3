import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async () => {
  try {
    // Use the full URI if provided, otherwise construct from components
    const uri =
      env.MONGODB_URI ||
      `mongodb://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DATABASE}?authSource=${env.MONGODB_AUTH_SOURCE}`;

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Keep low for fast failures in development
    });

    console.log('✅ MongoDB connected successfully');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB disconnection:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};
