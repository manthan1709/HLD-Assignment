const SearchQuery = require("../models/SearchQuery");
const { redisClient } = require("../config/redis");

const {
  addToBuffer,
} = require("../services/batchWriter");

const {
  getCacheNode,
} = require("../services/consistentHash");

const cacheDebug = (req, res) => {
  const prefix = req.query.prefix;

  const node = getCacheNode(prefix);

  res.json({
    prefix,
    cacheNode: node,
  });
};

const getSuggestions = async (req, res) => {
  console.log("API CALLED");

  try {
    const prefix = req.query.q?.toLowerCase();

    if (!prefix) {
      return res.json([]);
    }

    const cacheKey = `suggest:${prefix}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("CACHE HIT");
      return res.json(JSON.parse(cached));
    }

    console.log("CACHE MISS");

    const suggestions = await SearchQuery.find({
      query: {
        $regex: `^${prefix}`,
        $options: "i",
      },
    })
      .sort({ count: -1 })
      .limit(10);

    await redisClient.set(
      cacheKey,
      JSON.stringify(suggestions),
      {
        EX: 300,
      }
    );

    res.json(suggestions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const submitSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        message: "Query is required",
      });
    }

    const normalizedQuery = query
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

    addToBuffer(normalizedQuery);

    res.json({
      message: "Searched",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTrendingSearches = async (req, res) => {
  try {
    const trending = await SearchQuery.find()
      .sort({
        recentCount: -1,
        count: -1,
      })
      .limit(10);

    res.json(trending);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getSuggestions,
  submitSearch,
  getTrendingSearches,
  cacheDebug,
};