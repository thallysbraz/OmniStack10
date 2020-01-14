const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  //buscar dev por distancia e filtrar por tech
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    console.log(techsArray);
    return res.json({ dados: longitude });
  }
};
