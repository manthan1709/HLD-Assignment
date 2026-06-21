const mongoose = require("mongoose");

const searchQuerySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    index: true
  },

  count: {
    type: Number,
    default: 1,
  },

  recentCount: {
    type: Number,
    default: 0,
  },
});

searchQuerySchema.index({ count: -1 });
searchQuerySchema.index({ recentCount: -1 });

module.exports = mongoose.model(
  "SearchQuery",
  searchQuerySchema
);