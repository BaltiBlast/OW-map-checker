// -- IMPORTS
// local
const { getDataMap } = require("../middleware/getMethods.js");

const homeController = {
  homeInit: async (req, res) => {
    // fetch & sort data
    const dataMaps = await getDataMap();
    dataMaps.sort((a, b) => a.name.localeCompare(b.name));

    // calculate columns & render
    const numberOfMaps = dataMaps.length;
    const columns = Math.ceil(Math.sqrt(numberOfMaps));

    res.render("index", { dataMaps, columns });
  },
};

module.exports = homeController;
