const Redis = require("ioredis");
require("dotenv").config();
const redis = new Redis(process.env.REDIS_URL);
module.exports = redis;

// https://github.com/redis/node-redis/blob/master/README.md
