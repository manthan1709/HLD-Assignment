const express = require("express");

const {
    getSuggestions,
    submitSearch,
    getTrendingSearches,
    cacheDebug,
  } = require("../controllers/searchController");

const router = express.Router();

router.get("/suggest", getSuggestions);
router.post("/search", submitSearch);
router.get("/trending", getTrendingSearches);
router.get("/cache/debug",cacheDebug);

module.exports = router;