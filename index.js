require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authentication = require("./routes/authentication");
const user = require("./routes/user");
const post = require("./routes/post");
const mongoConnect = require("./db/mongo-connect");
const redis = require("./db/redis-connect");
//Database Connection with mongoDB
mongoConnect()
  .then(async() => {
    console.log("mongoDB connected");
    await redis.on("connect", function (res) {
      console.log("Redis connected");
      console.log("Redis Status: "+redis.status);
    });
    await redis.on("error", function (err) {
      console.log("Redis Error :"+err);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//Routes
app.use("/api", authentication);
app.use("/api", user);
app.use("/api", post);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

module.exports = app;
