const { Router } = require("express");

const DevController = require("./controllers/DevController");

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
routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);

module.exports = routes;
