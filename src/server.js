const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// Aqui ficam as rotas
const usuarioRoutes = require("./routes/usuarioRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");

app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);
app.use("/categorias", categoriaRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}

module.exports = app;
