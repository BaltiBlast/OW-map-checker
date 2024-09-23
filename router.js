// -- IMPORTS
const express = require("express");
const router = express.Router();

// controllers
const homeController = require("./controllers/homeController.js");
const { homeInit } = homeController;

const dashboardController = require("./controllers/dashboardController.js");
const { dashboardInit, postUpdateCheckboxes } = dashboardController;

// routes
router.get("/", homeInit);
router.get("/dashboard", dashboardInit);

router.post("/update-checkbox", postUpdateCheckboxes);

module.exports = router;
