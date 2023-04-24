"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use(express.json());

// body-parser middleware use
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

//import routes
const bidRoute = require("./routes/bid");

//route middlewares
app.use("/backend/bid", bidRoute);
module.exports = {
  app,
};
