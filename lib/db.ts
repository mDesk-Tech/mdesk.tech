import { MongoClient, type Collection } from "mongodb";

// MongoDB connection string
const uri = process.env.MONGODB_URI || "";
const dbName = "mdesk";
const collectionName = "rate_limits";

// Connection cache
let client: MongoClient | null = null;
let collection: Collection | null = null;

export async function getCollection() {
  if (collection) return collection;

  try {
    // Connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();

    // Get database and collection
    const db = client.db(dbName);
    collection = db.collection(collectionName);

    // Create index for timestamp to improve query performance
    await collection.createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 3600 },
    ); // Auto-delete after 1 hour

    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function cleanup() {
  try {
    const coll = await getCollection();

    // Delete old rate limit entries (older than 1 hour)
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    await coll.deleteMany({ timestamp: { $lt: oneHourAgo } });
  } catch (error) {
    console.error("Error cleaning up rate limits:", error);
  }
}

// Run cleanup periodically (every hour)
if (typeof setInterval !== "undefined") {
  setInterval(cleanup, 60 * 60 * 1000);
}

// Close MongoDB connection when the application shuts down
process.on("beforeExit", async () => {
  if (client) {
    await client.close();
    client = null;
    collection = null;
  }
});
