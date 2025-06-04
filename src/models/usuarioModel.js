const Joi = require("joi");

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

module.exports = { usuarioSchema };
