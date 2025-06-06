const TarefaRepository = require("../repositories/TarefaRepository");
const Joi = require("joi");

// Schema de validação para tarefas
const tarefaSchema = Joi.object({
  titulo: Joi.string().required(),
  descricao: Joi.string().allow(null, ""),
  status: Joi.string().required(),
  data: Joi.date().required(),
  user_id: Joi.number().integer().required(),
  categoria_id: Joi.number().integer().required(),
});

module.exports = {
  async getAll() {
    return await TarefaRepository.getAll();
  },

  async findById(id) {
    return await TarefaRepository.findById(id);
  },

  async create(data) {
    // Adicionar validação antes de criar
    await tarefaSchema.validateAsync(data);
    return await TarefaRepository.create(data);
  },

  async update(id, data) {
    // Validar dados parciais para update
    const updateSchema = tarefaSchema.fork(Object.keys(data), (schema) =>
      schema.optional()
    );
    await updateSchema.validateAsync(data);
    return await TarefaRepository.update(id, data);
  },

  async delete(id) {
    await TarefaRepository.delete(id);
  },

  async getByCategoriaId(categoriaId) {
    return await TarefaRepository.getByCategoriaId(categoriaId);
  },
};
