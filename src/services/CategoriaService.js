const CategoriaRepository = require("../repositories/CategoriaRepository");
const Joi = require("joi");

const categoriaSchema = Joi.object({
  nome: Joi.string().required(),
  user_id: Joi.number().integer().required(), // adicionamos validação do user_id
});

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
    await categoriaSchema.validateAsync(dataCategoria);
    return await CategoriaRepository.update(id, dataCategoria);
  },

  async delete(id) {
    return await CategoriaRepository.delete(id);
  },
};
