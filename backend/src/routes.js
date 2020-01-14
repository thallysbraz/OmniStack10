const { Router } = require("express");
const axios = require("axios");

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
    const { github_username } = req.body;

    //fazendo busca na api do github e config proxy no axios
    const response = await axios.get(
      `https://api.github.com/users/${github_username}`,
      {
        proxy: {
          host: "192.168.1.21",
          port: 3128,
          protocolo: "http"
        }
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (Error) {
    res.json({ error: Error });
  }
});

module.exports = routes;
