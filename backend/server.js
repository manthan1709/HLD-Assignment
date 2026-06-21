require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const {
  connectRedis,
} = require("./config/redis");

const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

app.use("/", searchRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  await connectRedis();

  app.listen(PORT, () => {
    console.log(
      `Server Running On Port ${PORT}`
    );
  });
};

startServer();