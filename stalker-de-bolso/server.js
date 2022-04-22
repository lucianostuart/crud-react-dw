const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Bem vindo ao Stalker de Bolso" });
});

require("./app/routes/gasto.routes")(app);

const port = 8081;
app.listen(port, () => {
  console.log(`Rodando na ${port} :)`);
});
