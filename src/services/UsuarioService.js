const UsuarioRepository = require("../repositories/UsuarioRepository");
const Joi = require("joi");
const bcrypt = require("bcrypt");

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

    // Criptografar a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dataUsuario.senha, salt);
    dataUsuario.senha = hashedPassword;

    return await UsuarioRepository.create(dataUsuario);
  },

  async update(id, dataUsuario) {
    await usuarioSchema.validateAsync(dataUsuario);

    // Criptografar a nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dataUsuario.senha, salt);
    dataUsuario.senha = hashedPassword;

    return await UsuarioRepository.update(id, dataUsuario);
  },

  async delete(id) {
    return await UsuarioRepository.delete(id);
  },

  async login(email, senha) {
    const usuario = await UsuarioRepository.getByEmail(email);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Senha incorreta");
    }

    return usuario; // Você pode retornar os dados (exceto a senha) ou usar session/token depois
  },
};
