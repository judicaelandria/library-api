const mongoose = require("mongoose");

async function connectToDatabase() {
  await mongoose
    .connect(process.env.DB_URL_PROD, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error({ err }));
}

connectToDatabase();
