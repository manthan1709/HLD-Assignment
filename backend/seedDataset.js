const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const SearchQuery = require("./models/SearchQuery");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected"))
  .catch(console.error);

const seedData = async () => {
  try {
    const file = fs.readFileSync(
      "./queries.tsv",
      "utf8"
    );

    const lines = file.split("\n");

    const documents = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      const parts = line.split("\t");

      if (parts.length < 2) continue;

      const query = parts[0]
        .trim()
        .toLowerCase();

      const count = parseInt(parts[1]);

      documents.push({
        query,
        count,
        recentCount: 0,
      });

      if (documents.length >= 500000) break;
    }

    await SearchQuery.deleteMany({});

    await SearchQuery.insertMany(
      documents,
      { ordered: false }
    );

    console.log(
      `Inserted ${documents.length} records`
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData(); 