const express = require("express");
require("dotenv-safe").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressSession = require("express-session");
//connect to database
require("./config/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server started at localhost:${process.env.PORT}`);
});
