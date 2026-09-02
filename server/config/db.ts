import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  let mongodbUri = process.env.MONGODB_URI?.trim();

  if (!mongodbUri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (mongodbUri.startsWith('<') && mongodbUri.endsWith('>')) {
    mongodbUri = mongodbUri.slice(1, -1).trim();
  }
  if (
    (mongodbUri.startsWith('"') && mongodbUri.endsWith('"')) ||
    (mongodbUri.startsWith("'") && mongodbUri.endsWith("'"))
  ) {
    mongodbUri = mongodbUri.slice(1, -1).trim();
  }

  if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(mongodbUri, opts).then((m) => {
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
