import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI not found in environment variables!");
}

// Validate MongoDB URI format (basic check)
if (!MONGODB_URI.startsWith('mongodb://') && !MONGODB_URI.startsWith('mongodb+srv://')) {
  throw new Error("⚠️ Invalid MONGODB_URI format. Must start with mongodb:// or mongodb+srv://");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // 30 seconds for cold start and slow connections
      socketTimeoutMS: 90000, // Close sockets after 90 seconds
      connectTimeoutMS: 30000, // 30 seconds to establish initial connection
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Maintain at least 1 socket connection
      maxIdleTimeMS: 60000, // Close connections after 60 seconds of inactivity
      retryWrites: true,
      retryReads: true,
    };

    console.log("⏳ Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("✅ DB Connected Successfully!");
      return mongoose;
    }).catch((error) => {
      // Log full error for debugging, but throw sanitized error
      console.error("❌ DB Connection Failed:", error);

      // Don't expose connection string in error messages
      const sanitizedError = new Error(
        "Failed to connect to database. Please check your MONGODB_URI configuration."
      );
      throw sanitizedError;
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

export default dbConnect;

