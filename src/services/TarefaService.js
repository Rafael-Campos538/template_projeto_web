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
    // Remove o campo 'id' para evitar erro na validação
    const { id: _, ...dataSemId } = data;

    // Cria schema parcial para validar apenas os campos enviados
    const updateSchema = tarefaSchema.fork(Object.keys(dataSemId), (schema) =>
      schema.optional()
    );

    // Valida os dados sem o campo 'id'
    await updateSchema.validateAsync(dataSemId);

    // Chama o repository passando o id e os dados validados
    return await TarefaRepository.update(id, dataSemId);
  },

  async delete(id) {
    return await TarefaRepository.delete(id);
  },
  async getByCategoriaId(categoriaId) {
    return await TarefaRepository.getByCategoriaId(categoriaId);
  },
};
