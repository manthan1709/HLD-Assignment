const SearchQuery = require("../models/SearchQuery");
const { redisClient } = require("../config/redis");

const searchBuffer = {};

const addToBuffer = (query) => {
  if (searchBuffer[query]) {
    searchBuffer[query]++;
  } else {
    searchBuffer[query] = 1;
  }

  console.log("Buffer:", searchBuffer);
};

const flushBuffer = async () => {
  const entries = Object.entries(searchBuffer);

  if (entries.length === 0) {
    return;
  }

  console.log("Flushing Buffer...");

  try {
    for (const [query, count] of entries) {
      await SearchQuery.findOneAndUpdate(
        { query },
        {
          $inc: {
            count,
            recentCount: count,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      const normalized = query.toLowerCase();

      for (let i = 1; i <= normalized.length; i++) {
        const prefix = normalized.substring(0, i);

        await redisClient.del(
          `suggest:${prefix}`
        );
      }

      delete searchBuffer[query];
    }

    console.log(
      "Affected Cache Keys Cleared"
    );
  } catch (error) {
    console.error(
      "Batch Writer Error:",
      error
    );
  }
};

setInterval(flushBuffer, 30000);

module.exports = {
  addToBuffer,
};