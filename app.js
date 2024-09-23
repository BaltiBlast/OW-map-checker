// -- IMPORTS
// npm
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// local
const router = require("./router.js");

// -- CONFIGURATION
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Le broche tourne sur le port ${process.env.PORT}`);
});
