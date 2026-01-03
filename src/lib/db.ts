import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ .env.local mein MONGODB_URI nahi mila!");
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
      bufferCommands: false, // 👈 Wait mat karo
      serverSelectionTimeoutMS: 5000, // 👈 (IMPORTANT) 5 sec mein connect na ho to fail ho jao
    };

    console.log("⏳ Connecting to Mongo with 5s Timeout...");

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("✅ DB Connected Successfully!");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ DB Connection Failed (Time out):", e);
    throw e; // Ab ye error screen pe dikhega
  }

  return cached.conn;
}

export default dbConnect;
