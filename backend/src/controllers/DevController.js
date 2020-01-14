const axios = require("axios");

const Dev = require("../models/Dev");

//index, show, store, update, destroy

module.exports = {
  //index para listar dev
  async index(req, res) {
    //buscando dev no banco e ordenando crescente pelo nome
    const devs = await Dev.find().sort({ name: 1 });
    //retornando devs encontrados
    return res.json(devs);
  },

  //store para criar dev
  async store(req, res) {
    try {
      //Recebendo user name do github
      const { github_username, techs, latitude, longitude } = req.body;

      //verificando se dev ja existe

      let dev = await Dev.findOne({ github_username });

      if (dev) {
        res.json(dev);
      } else {
        //fazendo busca na api do github e config proxy no axios
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`,
          {
            proxy: {
              host: "192.168.1.21",
              port: 3128,
              protocolo: "http"
            }
          }
        );
        //pegando somente os dados necessario no github
        /*  {name = login} e a mesma coisa que:
        if(name == undefined){
        name = login
        }
    */
        const { name = login, avatar_url, bio } = apiResponse.data;

        //Convertendo techs de String para Array
        //split na virgula pra separar as tecnologias
        //map para percorrer todas as techs
        //tech.trim pra retirar os espaços
        const techsArray = techs.split(",").map(tech => tech.trim());

        //convertendo latitude e longitude
        const location = {
          type: "Point",
          coordinates: [longitude, latitude]
        };

        //salvando Dev no banco
        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location
        });

        return res.json(dev);
      }
    } catch (Error) {
      res.json({ error: Error });
    }
  }
};
