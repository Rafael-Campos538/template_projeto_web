const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// CONFIGURAR MIDDLEWARES PRIMEIRO, ANTES DAS ROTAS
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views", "pages"));
app.use(express.static(path.join(__dirname, "public")));

// DEPOIS OS CONTROLLERS
const usuarioController = require("./controllers/UsuarioController");
const tarefaController = require("./controllers/TarefaController");
const categoriaController = require("./controllers/CategoriaController");

// DEPOIS AS ROTAS
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const tarefaRoutes = require("./routes/tarefaRoutes");

// Rotas da API
app.use("/api/categorias", categoriaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/tarefas", tarefaRoutes);

// Rotas das páginas
app.get("/", (req, res) => res.redirect("/login"));

app.get("/login", (req, res) => res.render("login"));
app.post("/login", (req, res) => usuarioController.login(req, res));

app.get("/cadastro", (req, res) => res.render("cadastro"));
app.post("/cadastro", (req, res) => usuarioController.cadastrar(req, res));

app.get("/tasks", (req, res) => tarefaController.renderTasksPage(req, res));
app.post("/tasks", (req, res) => tarefaController.create(req, res));

// ROTAS PARA PUT E DELETE DE TAREFAS VIA PÁGINAS
app.put("/tasks/:id", (req, res) => tarefaController.update(req, res));
app.delete("/tasks/:id", (req, res) => tarefaController.delete(req, res));

app.post("/categorias", (req, res) =>
  categoriaController.createFromForm(req, res)
);

// ROTAS PARA PUT E DELETE DE CATEGORIAS VIA PÁGINAS
app.put("/categorias/:id", (req, res) => categoriaController.update(req, res));
app.delete("/categorias/:id", (req, res) =>
  categoriaController.delete(req, res)
);

if (process.env.NODE_ENV !== "test") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Acesse o site em: http://localhost:${port}`);
    console.log(`Para testar as rotas, use o arquivo rest.http`);
  });
}

module.exports = app;
