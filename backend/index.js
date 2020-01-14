const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

//Config
app.use(express.json());

//Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/DevRadar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("conectado ao banco MONGODB");
  })
  .catch(err => {
    console.log("error ao conectar no banco " + err);
  });

/*  Tipos de parametros
    Query Params: req.query (Filtros, ordenação, paginação ...)
    Route Params: req.params (Identificar recurso no put ou delete)
    Body: req.body (Dados para criar ou alterar um regitro)
*/
//rotas

//rota raiz
app.get("/", (req, res) => {
  res.json({ msg: "Server estartado" });
});

app.listen(PORT, () => {
  console.log("server startado, na porta: " + PORT);
});
