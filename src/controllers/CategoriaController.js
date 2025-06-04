const CategoriaService = require("../services/CategoriaService");

module.exports = {
  async getAll(req, res) {
    try {
      const categorias = await CategoriaService.getAll();
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
      const novaCategoria = await CategoriaService.create(req.body);
      res.status(201).json(novaCategoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
