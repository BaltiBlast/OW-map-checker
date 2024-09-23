// --- IMPORTS
// local
const { getDataMap } = require("../middleware/getMethods.js");
const { updateCheckbox } = require("../middleware/postMethods.js");

const dashboardController = {
  dashboardInit: async (req, res) => {
    // fetch & sort data
    const dataMaps = await getDataMap();
    dataMaps.sort((a, b) => a.name.localeCompare(b.name));

    // render
    res.render("dashboard", { dataMaps });
  },

  // -------------------------------------------------------------------------------------- //
  postUpdateCheckboxes: async (req, res) => {
    const { recordId, checkboxFieldName, isChecked } = req.body;

    try {
      await updateCheckbox(recordId, checkboxFieldName, isChecked);
      res.status(200).json({ message: "Checkbox updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update checkbox" });
    }
  },
};

module.exports = dashboardController;
