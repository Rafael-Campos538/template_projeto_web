const UsuarioService = require("../services/UsuarioService");

module.exports = {
  async index(req, res) {
    const usuarios = await UsuarioService.getAll();
    res.json(usuarios);
  },

  async store(req, res) {
    const novo = await UsuarioService.create(req.body);
    res.status(201).json(novo);
  },
};
