require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const cors = require("cors");

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

const startServer = async () => {
  await connectDB();

  await connectRedis();

  app.listen(process.env.PORT, () => {
    console.log(
      `Server Running On Port ${process.env.PORT}`
    );
  });
};

startServer();