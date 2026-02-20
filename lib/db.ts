import { MongoClient, type Collection } from "mongodb";

// MongoDB config
const uri = process.env.MONGODB_URI || "";
const dbName = "mdesk";
const collectionName = "rate_limits";

// Cache connection
let client: MongoClient | null = null;
let collection: Collection | null = null;

// Guard against duplicate handler registration in HMR
// Use globalThis to persist across HMR reloads (Next.js pattern)
const globalForDb = globalThis as typeof globalThis & {
  __dbHandlersRegistered?: boolean;
};
const handlersRegistered = globalForDb.__dbHandlersRegistered ?? false;

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
// Guard for edge runtime: check process and process.on are available
if (
  typeof setInterval !== "undefined" &&
  typeof process !== "undefined" &&
  typeof process.on === "function" &&
  !handlersRegistered
) {
  globalForDb.__dbHandlersRegistered = true;
  const timer = setInterval(cleanup, 60 * 60 * 1000);
  // Allow the process to exit even if the timer is still running
  if (typeof timer.unref === "function") {
    timer.unref();
  }

  // Close MongoDB connection when the application shuts down
  process.on("beforeExit", async () => {
    try {
      await closeClient();
    } catch (error) {
      console.error("Error during beforeExit cleanup:", error);
    }
  });

  // Handle termination signals
  process.on("SIGTERM", async () => {
    try {
      await closeClient();
    } catch (error) {
      console.error("Error during SIGTERM cleanup:", error);
    } finally {
      process.exit(0);
    }
  });

  process.on("SIGINT", async () => {
    try {
      await closeClient();
    } catch (error) {
      console.error("Error during SIGINT cleanup:", error);
    } finally {
      process.exit(0);
    }
  });
}

async function closeClient() {
  if (client) {
    await client.close();
    client = null;
    collection = null;
  }
}
