import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(async (mongoose) => {
      // Ensure collections exist to prevent WriteConflict/LockTimeout in transactions
      try {
        await mongoose.connection.createCollection('users').catch(() => {});
        await mongoose.connection.createCollection('utm_campaigns').catch(() => {});
      } catch (e) {
        // Ignore errors if collections already exist
      }
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
