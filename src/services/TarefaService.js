const TarefaRepository = require("../repositories/TarefaRepository");
const Joi = require("joi");

// Schema de validação para criação de tarefas
const tarefaSchema = Joi.object({
  titulo: Joi.string().required(),
  descricao: Joi.string().allow(null, ""),
  status: Joi.string().required(),
  data: Joi.date().required(),
  user_id: Joi.number().integer().required(),
  categoria_id: Joi.number().integer().required(),
});

// Schema para update (todos os campos opcionais)
const tarefaUpdateSchema = Joi.object({
  titulo: Joi.string().optional(),
  descricao: Joi.string().allow(null, "").optional(),
  status: Joi.string().optional(),
  data: Joi.date().optional(),
  user_id: Joi.number().integer().optional(),
  categoria_id: Joi.number().integer().optional(),
}).min(1); // Pelo menos um campo deve estar presente

module.exports = {
  async getAll() {
    return await TarefaRepository.getAll();
  },

  async findById(id) {
    return await TarefaRepository.findById(id);
  },

  async create(data) {
    // Validação completa para criação
    await tarefaSchema.validateAsync(data);
    return await TarefaRepository.create(data);
  },

  async update(id, data) {
    // Remove o campo 'id' para evitar erro na validação
    const { id: _, ...dataSemId } = data;

    // Valida usando o schema de update
    const validatedData = await tarefaUpdateSchema.validateAsync(dataSemId);

    // Verifica se a tarefa existe antes de tentar atualizar
    const tarefaExistente = await TarefaRepository.findById(id);
    if (!tarefaExistente) {
      throw new Error("Tarefa não encontrada");
    }

    // Chama o repository passando o id e os dados validados
    return await TarefaRepository.update(id, validatedData);
  },

  async delete(id) {
    // Verifica se a tarefa existe antes de deletar
    const tarefa = await TarefaRepository.findById(id);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    }

    return await TarefaRepository.delete(id);
  },

  async getByCategoriaId(categoriaId) {
    return await TarefaRepository.getByCategoriaId(categoriaId);
  },
};
