const Joi = require("joi");

const tarefaSchema = Joi.object({
  titulo: Joi.string().required(),
  descricao: Joi.string().allow(null, ""),
  status: Joi.string().required(),
  data: Joi.date().required(),
  user_id: Joi.number().integer().required(),
  categoria_id: Joi.number().integer().required(),
});

module.exports = tarefaSchema;
