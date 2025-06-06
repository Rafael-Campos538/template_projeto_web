const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

// Aqui ficam as rotas
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");

const usuarioController = require("./controllers/UsuarioController");
//usuarioController.login(req, res);
const tarefaController = require("../src/controllers/TarefaController");

app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views", "pages"));
app.use(express.static(path.join(__dirname, "src", "public")));

app.get("/", (req, res) => res.redirect("/login"));

app.get("/pages/login", (req, res) => res.render("login"));
app.post("/pages/login", (req, res) => usuarioController.login(req, res));

app.get("/pages/cadastro", (req, res) => res.render("cadastro"));
app.post("/pages/cadastro", (req, res) => usuarioController.cadastrar(req, res));

app.get("/pages/tasks", (req, res) => tarefaController.renderTasksPage(req, res));
app.post("/pages/tasks", (req, res) => tarefaController.create(req, res));

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}

module.exports = app;
