const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  //buscar dev por distancia e filtrar por tech
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray // busca por tecnologia
      },
      location: {
        //buscando por localização
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude] // buscando longitude e latitude
          },
          $maxDistance: 10000 // raio maximo de busca
        }
      }
    }).sort({ name: 1 });
    return res.json({ devs });
  }
};
