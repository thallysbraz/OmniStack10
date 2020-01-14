const { Router } = require("express");
const axios = require("axios");

const Dev = require("./models/Dev");

const routes = Router();

/*  Tipos de parametros
    Query Params: req.query (Filtros, ordenação, paginação ...)
    Route Params: req.params (Identificar recurso no put ou delete)
    Body: req.body (Dados para criar ou alterar um regitro)
*/

//rotas

//rota raiz
routes.get("/", (req, res) => {
  res.json({ msg: "Server estartado" });
});

//rota de cadastrar dev
routes.post("/devs", async (req, res) => {
  try {
    //Recebendo user name do github
    const { github_username, techs, latitude, longitude } = req.body;

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
    const dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    res.json(dev);
  } catch (Error) {
    res.json({ error: Error });
  }
});

module.exports = routes;
