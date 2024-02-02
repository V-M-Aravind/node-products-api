const mongoose = require("mongoose");

function mongoDBConnect() {
  return mongoose
    .connect(
      `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.uozgz5z.mongodb.net/node-prod-api-db`
    )
    .then((client) => {
      console.log("mongo db connected");
    })
    .catch((e) => {
      console.log("mongo db connection failed :", e);
      throw e;
    });
}
module.exports = mongoDBConnect;
