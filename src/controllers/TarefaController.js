const TarefaService = require("../services/TarefaService");
const CategoriaService = require("../services/CategoriaService");
const UsuarioService = require("../services/UsuarioService");

module.exports = {
  async getAll(req, res) {
    try {
      const tarefas = await TarefaService.getAll();
      res.json(tarefas);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await TarefaService.findById(id);
      if (!tarefa)
        return res.status(404).json({ error: "Tarefa não encontrada" });
      res.json(tarefa);
    } catch (error) {
      console.error("Erro ao buscar tarefa:", error);
      res.status(500).json({ error: "Erro ao buscar tarefa" });
    }
  },

  async create(req, res) {
    try {
      const { titulo, descricao, status, data, userId, categoriaId } = req.body;

      // Validar campos obrigatórios
      if (!titulo || !status || !data || !userId || !categoriaId) {
        return res.status(400).json({
          error:
            "Campos obrigatórios: titulo, status, data, userId, categoriaId",
        });
      }

      // Padronizar nomes dos campos para o service
      const novaTarefa = await TarefaService.create({
        titulo,
        descricao: descricao || null,
        status,
        data: new Date(data), // Garantir que é um objeto Date
        user_id: parseInt(userId),
        categoria_id: parseInt(categoriaId),
      });

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(201).json(novaTarefa);
      }

      // Se é do formulário, redireciona
      res.redirect(`/tasks?usuarioId=${userId}`);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res
          .status(400)
          .json({ error: error.message || "Erro ao criar tarefa" });
      }

      // Se é do formulário, redireciona com erro
      res.status(400).send(`Erro ao criar tarefa: ${error.message}`);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      // Buscar a tarefa atual para obter o userId
      const tarefaAtual = await TarefaService.findById(id);
      if (!tarefaAtual) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      // Converter campos se necessário
      if (data.userId) {
        data.user_id = parseInt(data.userId);
        delete data.userId;
      }
      if (data.categoriaId) {
        data.categoria_id = parseInt(data.categoriaId);
        delete data.categoriaId;
      }
      if (data.data) {
        data.data = new Date(data.data);
      }

      const tarefaAtualizada = await TarefaService.update(id, data);

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.json(tarefaAtualizada);
      }

      // Se é do formulário, redireciona para a página de tarefas
      res.redirect(`/tasks?usuarioId=${tarefaAtual.user_id}`);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res
          .status(400)
          .json({ error: error.message || "Erro ao atualizar tarefa" });
      }

      // Se é do formulário, redireciona com erro
      res.status(400).send(`Erro ao atualizar tarefa: ${error.message}`);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Buscar a tarefa atual para obter o userId antes de deletar
      const tarefaAtual = await TarefaService.findById(id);
      if (!tarefaAtual) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await TarefaService.delete(id);

      // Se é uma requisição de API, retorna 204
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(204).send();
      }

      // Se é do formulário, redireciona para a página de tarefas
      res.redirect(`/tasks?usuarioId=${tarefaAtual.user_id}`);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(500).json({ error: "Erro ao deletar tarefa" });
      }

      // Se é do formulário, redireciona com erro
      res.status(500).send(`Erro ao deletar tarefa: ${error.message}`);
    }
  },

  async renderTasksPage(req, res) {
    try {
      console.log("Query recebida:", req.query);

      // Verifica se usuarioId está presente e é um número válido
      const usuarioIdRaw = req.query.usuarioId;
      console.log("Valor de usuarioId recebido:", usuarioIdRaw);

      if (!usuarioIdRaw || isNaN(parseInt(usuarioIdRaw))) {
        return res.status(400).send("Usuário inválido ou não informado");
      }

      const userId = parseInt(usuarioIdRaw);

      // Busca todas as categorias do usuário
      const categorias = await CategoriaService.getAllByUser(userId);

      // Para cada categoria, busca as tarefas vinculadas
      for (const categoria of categorias) {
        const tarefas = await TarefaService.getByCategoriaId(categoria.id);
        categoria.tarefas = tarefas;
      }

      res.render("tasks", { userId, categorias });
    } catch (error) {
      console.error("Erro ao carregar página de tarefas:", error);
      res
        .status(500)
        .send("Erro ao carregar a página de tarefas: " + error.message);
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await UsuarioService.login(email, senha);
      res.redirect(`/pages/tasks?usuarioId=${usuario.id}`);
    } catch (error) {
      res.render("pages/login", { error: "Credenciais inválidas" });
    }
  },
};
