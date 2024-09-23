const express = require("express");
const router = express.Router();
const { getDataMap } = require("./middleware/getMethods.js");
const { updateCheckbox } = require("./middleware/postMethods.js");

router.get("/", async (req, res) => {
  const dataMaps = await getDataMap();
  dataMaps.sort((a, b) => a.name.localeCompare(b.name));
  const numberOfMaps = dataMaps.length;
  const columns = Math.ceil(Math.sqrt(numberOfMaps));
  res.render("index", { dataMaps, columns });
});

router.get("/dashboard", async (req, res) => {
  const dataMaps = await getDataMap();
  dataMaps.sort((a, b) => a.name.localeCompare(b.name));
  res.render("dashboard", { dataMaps });
});

router.post("/update-checkbox", async (req, res) => {
  const { recordId, checkboxFieldName, isChecked } = req.body;

  try {
    await updateCheckbox(recordId, checkboxFieldName, isChecked);
    res.status(200).json({ message: "Checkbox updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update checkbox" });
  }
});

module.exports = router;
