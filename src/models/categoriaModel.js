const Joi = require("joi");

const categoriaSchema = Joi.object({
  nome: Joi.string().required(),
});

module.exports = { categoriaSchema };
