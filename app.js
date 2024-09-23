// -- IMPORTS
// npm
const express = require("express");
const app = express();
const Airtable = require("airtable");
require("dotenv").config();

// -- CONFIGURATION
app.use(express.static("public"));
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const apiKey = process.env.API_KEY;
const baseId = process.env.BASE_ID;
const tableName = process.env.TABLE_NAME;

const base = new Airtable({ apiKey }).base(baseId);

async function getdataMap() {
  const dataMaps = [];
  try {
    const records = await base(tableName).select().all();

    records.forEach((record) => {
      dataMaps.push({ id: record.id, ...record.fields });
    });
  } catch (error) {
    console.error("Error fetching records:", error);
  }
  return dataMaps;
}

async function updateCheckbox(recordId, checkboxFieldName, isChecked) {
  try {
    await base(tableName).update([
      {
        id: recordId,
        fields: {
          [checkboxFieldName]: isChecked,
        },
      },
    ]);
    console.log(
      `Checkbox ${checkboxFieldName} updated to ${isChecked} for record ID ${recordId}`
    );
  } catch (error) {
    console.error("Error updating checkbox:", error);
  }
}

// Route principale
app.get("/", async (req, res) => {
  const dataMaps = await getdataMap();
  dataMaps.sort((a, b) => a.name.localeCompare(b.name));

  const numberOfMaps = dataMaps.length;
  const columns = Math.ceil(Math.sqrt(numberOfMaps));
  res.render("index", { dataMaps, columns, markedNames: [] });
});

//------------------------------------------------------------------------------
app.get("/dashboard", async (req, res) => {
  const dataMaps = await getdataMap();
  dataMaps.sort((a, b) => a.name.localeCompare(b.name));

  res.render("dashboard", { dataMaps, apiKey, baseId, tableName });
});

//------------------------------------------------------------------------------
app.post("/update-checkbox", async (req, res) => {
  const { recordId, checkboxFieldName, isChecked } = req.body;

  try {
    await updateCheckbox(recordId, checkboxFieldName, isChecked);
    res.status(200).json({ message: "Checkbox updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update checkbox" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
