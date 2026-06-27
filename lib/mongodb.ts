/**
 * DEPRECATED: This local MongoDB connection helper is deprecated.
 * The backend has been migrated to Spring Boot (storyceller-backend).
 * All database operations are now handled by the Spring Boot services.
 */

/*
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/storyceller";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
*/

// Export a dummy function to prevent import breakages if any exist
export default async function connectToDatabase() {
  console.warn("connectToDatabase called, but database operations should be directed to the Spring Boot backend.");
  return null;
}

