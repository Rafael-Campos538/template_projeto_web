const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// CONFIGURAR MIDDLEWARES PRIMEIRO, ANTES DAS ROTAS
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); // MOVER PARA CIMA
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views", "pages"));
app.use(express.static(path.join(__dirname, "src", "public")));

// DEPOIS OS CONTROLLERS
const usuarioController = require("./controllers/UsuarioController");
const tarefaController = require("../src/controllers/TarefaController");
const categoriaController = require("./controllers/CategoriaController");

// DEPOIS AS ROTAS
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");

app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

app.get("/", (req, res) => res.redirect("/login"));

app.get("/pages/login", (req, res) => res.render("login"));
app.post("/pages/login", (req, res) => tarefaController.login(req, res));

app.get("/pages/cadastro", (req, res) => res.render("cadastro"));
app.post("/pages/cadastro", (req, res) =>
  usuarioController.cadastrar(req, res)
);

app.get("/pages/tasks", (req, res) =>
  tarefaController.renderTasksPage(req, res)
);
app.post("/pages/tasks", (req, res) => tarefaController.create(req, res));

// ROTAS PARA PUT E DELETE DE TAREFAS VIA PÁGINAS
app.put("/pages/tasks/:id", (req, res) => tarefaController.update(req, res));
app.delete("/pages/tasks/:id", (req, res) => tarefaController.delete(req, res));

app.post("/pages/categorias", (req, res) =>
  categoriaController.createFromForm(req, res)
);

// ROTAS PARA PUT E DELETE DE CATEGORIAS VIA PÁGINAS
app.put("/categorias/:id", (req, res) => categoriaController.update(req, res));
app.delete("/categorias/:id", (req, res) =>
  categoriaController.delete(req, res)
);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}

module.exports = app;
