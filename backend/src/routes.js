const { Router } = require("express");

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");
const routes = Router();

/*  Tipos de parametros
    Query Params: req.query (Filtros, ordenação, paginação ...)
    Route Params: req.params (Identificar recurso no put ou delete)
    Body: req.body (Dados para criar ou alterar um regitro)
*/

//rotas

//rota raiz - somente de teste
routes.get("/", (req, res) => {
  res.json({ msg: "Server estartado" });
});

routes.post("/devs", DevController.store); //rota de cadastrar dev
routes.get("/devs", DevController.index); //rota de listar todos os dev
routes.get("/search", SearchController.index); //buscar dev por distancia e filtrar por tech

module.exports = routes;
