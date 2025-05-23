require("dotenv").config();
const express = require("express");
const app = express();

const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");

app.use(express.json());

app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
