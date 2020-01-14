const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes");

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

//rotas
app.use(routes);

app.listen(PORT, () => {
  console.log("server startado, na porta: " + PORT);
});
