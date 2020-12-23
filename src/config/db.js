const mongoose = require("mongoose");
const { __prod__ } = require("../constant");

async function connectToDatabase() {
  await mongoose
    .connect(__prod__ ? process.env.DB_URL_PROD : process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error({ err }));
}

connectToDatabase();
