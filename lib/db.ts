import { MongoClient, type Collection } from "mongodb";
import { cache } from "react";

// MongoDB config
const uri = process.env.MONGODB_URI || "";
const dbName = "mdesk";
const collectionName = "rate_limits";

// Guard against duplicate handler registration and connection leaks in HMR
// Use globalThis to persist across HMR reloads (Next.js pattern)
const globalForDb = globalThis as typeof globalThis & {
  __dbHandlersRegistered?: boolean;
  __dbClient?: MongoClient | null;
  __dbCollection?: Collection | null;
  __dbConnectionPromise?: Promise<Collection> | undefined;
};

// Use global cached handler flag to survive HMR reloads
const handlersRegistered = globalForDb.__dbHandlersRegistered ?? false;

/**
 * Obtain the rate-limits MongoDB collection, establishing and caching a client connection if needed.
 * Uses React.cache() for per-request deduplication and global caching for HMR survival.
 *
 * @returns The MongoDB collection for the configured database and collection name.
 * @throws If establishing the MongoDB connection fails, the error is rethrown.
 */
const getCollectionCached = cache(async () => {
  // Return existing collection if already connected
  if (globalForDb.__dbCollection) return globalForDb.__dbCollection;

  // Return existing promise if connection is in progress
  if (globalForDb.__dbConnectionPromise) {
    return globalForDb.__dbConnectionPromise;
  }

  // Create connection promise
  globalForDb.__dbConnectionPromise = (async () => {
    try {
      // Connect to MongoDB
      globalForDb.__dbClient = new MongoClient(uri);
      await globalForDb.__dbClient.connect();

      // Get database and collection
      const db = globalForDb.__dbClient.db(dbName);
      globalForDb.__dbCollection = db.collection(collectionName);

      return globalForDb.__dbCollection;
    } catch (err) {
      // Clear the promise on error so future calls can retry
      globalForDb.__dbConnectionPromise = undefined;
      // Close the client to prevent connection leaks
      // Wrap in try-catch to ensure original error always propagates
      try {
        await closeClient();
      } catch (closeErr) {
        // Log the close error but don't let it swallow the original error
        console.error(
          "Error closing MongoDB client after connection failure:",
          closeErr,
        );
      }
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  })();

  return globalForDb.__dbConnectionPromise;
});

/**
 * Obtain the rate-limits MongoDB collection with per-request deduplication.
 *
 * @returns The MongoDB collection for the configured database and collection name.
 * @throws If establishing the MongoDB connection fails, the error is rethrown.
 */
export async function getCollection() {
  return getCollectionCached();
}

/**
 * Delete rate-limit documents older than one hour from the database.
 *
 * Connects to the configured `rate_limits` collection and removes documents whose `timestamp`
 * is earlier than one hour ago. Any errors encountered during the operation are logged to the console.
 */
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

/**
 * Close the cached MongoDB client and clear the cached connection state.
 *
 * If a client is present on the module's global cache, this closes the client
 * and resets `__dbClient`, `__dbCollection`, and `__dbConnectionPromise` so a
 * future call to getCollection() can establish a new connection.
 */
async function closeClient() {
  if (globalForDb.__dbClient) {
    await globalForDb.__dbClient.close();
    globalForDb.__dbClient = null;
    globalForDb.__dbCollection = null;
    globalForDb.__dbConnectionPromise = undefined;
  }
}
