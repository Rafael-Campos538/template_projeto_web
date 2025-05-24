// src/controllers/CategoriaController.js
const CategoriaService = require("../services/CategoriaService");

module.exports = {
  async index(req, res) {
    const categorias = await CategoriaService.getAll();
    res.json(categorias);
  },

  async show(req, res) {
    const { id } = req.params;
    const categoria = await CategoriaService.getById(id);
    if (!categoria)
      return res.status(404).json({ error: "Categoria não encontrada" });
    res.json(categoria);
  },

  async store(req, res) {
    const nova = await CategoriaService.create(req.body); // req.body.nome
    res.status(201).json(nova);
  },

  async update(req, res) {
    const { id } = req.params;
    const atualizada = await CategoriaService.update(id, req.body);
    res.json(atualizada);
  },

  async delete(req, res) {
    const { id } = req.params;
    await CategoriaService.delete(id);
    res.status(204).send();
  },
};
