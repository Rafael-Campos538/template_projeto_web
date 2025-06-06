const Joi = require("joi");

const categoriaSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().required(),
  user_id: Joi.number().optional(),
});

module.exports = { categoriaSchema };
