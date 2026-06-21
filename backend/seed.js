require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");

const SearchQuery = require("./models/SearchQuery");

const data = [
  { query: "iphone", count: 100000 },
  { query: "iphone 15", count: 85000 },
  { query: "iphone charger", count: 60000 },
  { query: "iphone case", count: 50000 },
  { query: "java tutorial", count: 40000 },
  { query: "javascript tutorial", count: 35000 },
  { query: "chatgpt", count: 70000 },
];

const seedData = async () => {
  try {
    await connectDB();

    await SearchQuery.deleteMany();

    await SearchQuery.insertMany(data);

    console.log("Data Inserted");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();