const UsuarioService = require("../services/UsuarioService");

module.exports = {
  async index(req, res) {
    const users = await UsuarioService.getAll();
    res.json(users);
  },

  async store(req, res) {
    const novo = await UsuarioService.create(req.body);
    res.status(201).json(novo);
  },
};
