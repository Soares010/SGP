const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./app/database/Connect");
database();

// Middlewares
app.use(express.json());
app.use(cors());

// Importando rotas do usuário
const userRoutes = require("./app/routes/UserRouter");
const projectRoutes = require("./app/routes/ProjectRouter");

app.get("/", (req, res) => {
  res.send("Ola");
});

// Usando a rota para trazer a requisição
app.use("/", userRoutes);
app.use("/", projectRoutes);

// Rodando servidor
app.listen(3000, () => console.log("Rodando servidor na porta 3000"));
