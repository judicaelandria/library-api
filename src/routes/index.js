const book = require("./book");
const reader = require("./reader");
const loan = require("./loan");
const { Router } = require("express");

const routes = Router();

routes.use("/book", book);
routes.use("/reader", reader);
routes.use("/loan", loan);

module.exports = routes;
