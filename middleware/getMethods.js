const db = require("../services/API/db.js");
const tableDataMaps = "data-maps";

const getMethods = {
  // ---------- GET DATA MAP ---------- //
  getDataMap: async (req, res, next) => {
    const dataMaps = [];
    try {
      const records = await db(tableDataMaps).select().all();

      records.forEach((record) => {
        dataMaps.push({ id: record.id, ...record.fields });
      });
    } catch (error) {
      console.error("Error fetching records:", error);
    }
    return dataMaps;
  },
};

module.exports = getMethods;
