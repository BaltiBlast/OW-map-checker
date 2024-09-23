// -- IMPORTS
// npm
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// local
const router = require("./router.js");

// -- CONFIGURATION
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
