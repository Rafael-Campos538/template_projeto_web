const UsuarioRepository = require("../repositories/UsuarioRepository");
const Joi = require("joi");

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
});

module.exports = {
  async getAll() {
    return await UsuarioRepository.getAll();
  },

  async getById(id) {
    return await UsuarioRepository.getById(id);
  },

  async create(dataUsuario) {
    await usuarioSchema.validateAsync(dataUsuario);
    return await UsuarioRepository.create(dataUsuario);
  },

  async update(id, dataUsuario) {
    await usuarioSchema.validateAsync(dataUsuario);
    return await UsuarioRepository.update(id, dataUsuario);
  },

  async delete(id) {
    return await UsuarioRepository.delete(id);
  },
};
