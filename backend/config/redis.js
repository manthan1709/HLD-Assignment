const { createClient } = require("redis");

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis Connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { redisClient, connectRedis };