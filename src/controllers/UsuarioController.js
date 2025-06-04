const UsuarioService = require("../services/UsuarioService");

module.exports = {
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const usuario = await UsuarioService.getById(id);
      if (!usuario)
        return res.status(404).json({ message: "Usuário não encontrado" });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const novoUsuario = await UsuarioService.create(req.body);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const usuarioAtualizado = await UsuarioService.update(id, req.body);
      if (!usuarioAtualizado)
        return res.status(404).json({ message: "Usuário não encontrado" });
      res.json(usuarioAtualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await UsuarioService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
