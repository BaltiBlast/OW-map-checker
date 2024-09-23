const db = require("../services/API/db.js");
const tableDataMaps = "data-maps";

const postMethods = {
  updateCheckbox: async (recordId, checkboxFieldName, isChecked) => {
    try {
      await db(tableDataMaps).update([
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
  },
};

module.exports = postMethods;
