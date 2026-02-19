import { MongoClient, type Collection } from "mongodb";

// MongoDB config
const uri = process.env.MONGODB_URI || "";
const dbName = "mdesk";
const collectionName = "rate_limits";

// Cache connection
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

    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function cleanup() {
  try {
    const coll = await getCollection();

    // Remove old entries
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    await coll.deleteMany({ timestamp: { $lt: oneHourAgo } });
  } catch (error) {
    console.error("Error cleaning up rate limits:", error);
  }
}

// Cleanup every hour
if (typeof setInterval !== "undefined") {
  const timer = setInterval(cleanup, 60 * 60 * 1000);
  // Allow the process to exit even if the timer is still running
  timer.unref();

  // Close MongoDB connection when the application shuts down
  process.on("beforeExit", async () => {
    await closeClient();
  });

  // Handle termination signals
  process.on("SIGTERM", async () => {
    await closeClient();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await closeClient();
    process.exit(0);
  });
}

async function closeClient() {
  if (client) {
    await client.close();
    client = null;
    collection = null;
  }
}
