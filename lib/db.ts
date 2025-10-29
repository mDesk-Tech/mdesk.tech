import { MongoClient, type Collection, type Db } from "mongodb";

// MongoDB connection string
const uri = process.env.MONGODB_URI || "";
const dbName = "mdesk";
const collectionName = "rate_limits";

// Connection cache - properly cache client, db, and collection
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let cachedCollection: Collection | null = null;

export async function getCollection() {
  // Return cached collection if available
  if (cachedCollection && cachedClient) {
    return cachedCollection;
  }

  try {
    // Reuse existing client if available
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, {
        maxPoolSize: 10,
        minPoolSize: 2,
        maxIdleTimeMS: 60000,
      });
      await cachedClient.connect();
    }

    // Get database and collection
    if (!cachedDb) {
      cachedDb = cachedClient.db(dbName);
    }

    if (!cachedCollection) {
      cachedCollection = cachedDb.collection(collectionName);

      // Create indexes for better query performance
      // Use background: true to avoid blocking
      await Promise.all([
        cachedCollection.createIndex(
          { timestamp: 1 },
          { expireAfterSeconds: 3600, background: true },
        ), // Auto-delete after 1 hour
        cachedCollection.createIndex({ ip: 1 }, { background: true }), // Index for IP lookups
      ]);
    }

    return cachedCollection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Reset cache on error
    cachedClient = null;
    cachedDb = null;
    cachedCollection = null;
    throw error;
  }
}

// Cleanup function for graceful shutdown
async function cleanup() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    cachedCollection = null;
  }
}

// Close MongoDB connection when the application shuts down
process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
