const CategoriaService = require("../services/CategoriaService");

module.exports = {
  async getAll(req, res) {
    try {
      const userId = parseInt(req.query.user_id);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ message: "user_id é obrigatório na query" });
      }
      const categorias = await CategoriaService.getAllByUser(userId);
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const categoria = await CategoriaService.getById(id);
      if (!categoria)
        return res.status(404).json({ message: "Categoria não encontrada" });
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { nome, user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({ message: "user_id é obrigatório" });
      }
      const novaCategoria = await CategoriaService.create({ nome, user_id });
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createFromForm(req, res) {
    try {
      const { nome, usuarioId } = req.body;
      if (!usuarioId) {
        return res.status(400).send("Usuário não informado");
      }
      await CategoriaService.create({ nome, user_id: parseInt(usuarioId) });
      res.redirect(`/pages/tasks?usuarioId=${usuarioId}`);
    } catch (error) {
      res.status(400).send("Erro ao criar categoria: " + error.message);
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { nome } = req.body;

      // Buscar a categoria atual para obter o user_id
      const categoriaAtual = await CategoriaService.getById(id);
      if (!categoriaAtual) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      const categoriaAtualizada = await CategoriaService.update(id, { nome });

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.json(categoriaAtualizada);
      }

      // Se é do formulário, redireciona para a página de tarefas
      res.redirect(`/pages/tasks?usuarioId=${categoriaAtual.user_id}`);
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(400).json({ error: error.message });
      }

      // Se é do formulário, redireciona com erro
      res.status(400).send(`Erro ao atualizar categoria: ${error.message}`);
    }
  },

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);

      // Buscar a categoria atual para obter o user_id antes de deletar
      const categoriaAtual = await CategoriaService.getById(id);
      if (!categoriaAtual) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await CategoriaService.delete(id);

      // Se é uma requisição de API, retorna 204
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(204).send();
      }

      // Se é do formulário, redireciona para a página de tarefas
      res.redirect(`/pages/tasks?usuarioId=${categoriaAtual.user_id}`);
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);

      // Se é uma requisição de API, retorna JSON
      if (
        req.headers.accept &&
        req.headers.accept.includes("application/json")
      ) {
        return res.status(500).json({ error: error.message });
      }

      // Se é do formulário, redireciona com erro
      res.status(500).send(`Erro ao deletar categoria: ${error.message}`);
    }
  },
};
