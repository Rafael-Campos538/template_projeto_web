const CategoriaRepository = require("../repositories/CategoriaRepository");
const Joi = require("joi");

const categoriaSchema = Joi.object({
  nome: Joi.string().required(),
  user_id: Joi.number().integer().required(),
});

// Schema para update (permite campos opcionais)
const categoriaUpdateSchema = Joi.object({
  nome: Joi.string().optional(),
  user_id: Joi.number().integer().optional(),
}).min(1); // Pelo menos um campo deve estar presente

module.exports = {
  async getAllByUser(userId) {
    return await CategoriaRepository.getAllByUser(userId);
  },

  async getById(id) {
    return await CategoriaRepository.getById(id);
  },

  async create(dataCategoria) {
    await categoriaSchema.validateAsync(dataCategoria);
    return await CategoriaRepository.create(dataCategoria);
  },

  async update(id, dataCategoria) {
    // Remove o campo 'id' se existir
    const { id: _, ...dataSemId } = dataCategoria;

    // Valida usando o schema de update
    const validatedData = await categoriaUpdateSchema.validateAsync(dataSemId);

    // Busca a categoria atual para preservar campos não alterados
    const categoriaAtual = await CategoriaRepository.getById(id);
    if (!categoriaAtual) {
      throw new Error("Categoria não encontrada");
    }

    // Merge dos dados atuais com os novos dados
    const dadosCompletos = {
      nome: validatedData.nome || categoriaAtual.nome,
      user_id: validatedData.user_id || categoriaAtual.user_id,
    };

    return await CategoriaRepository.update(id, dadosCompletos);
  },

  async delete(id) {
    // Verifica se a categoria existe antes de deletar
    const categoria = await CategoriaRepository.getById(id);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }

    return await CategoriaRepository.delete(id);
  },
};
