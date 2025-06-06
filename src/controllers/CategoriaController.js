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

  /*async renderCategoriasPage(req, res) {
    try {
      const userId = parseInt(req.query.usuarioId);
      if (isNaN(userId)) {
        return res.status(400).send("Usuário inválido");
      }
      const categorias = await CategoriaService.getAllByUser(userId);
      res.render("categorias", { categorias, userId });
    } catch (error) {
      res.status(500).send("Erro ao carregar categorias: " + error.message);
    }
  },*/

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
      res.redirect(`/pages/categorias?usuarioId=${usuarioId}`);
    } catch (error) {
      res.status(400).send("Erro ao criar categoria: " + error.message);
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const categoriaAtualizada = await CategoriaService.update(id, req.body);
      if (!categoriaAtualizada)
        return res.status(404).json({ message: "Categoria não encontrada" });
      res.json(categoriaAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await CategoriaService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
