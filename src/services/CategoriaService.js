const CategoriaRepository = require("../repositories/CategoriaRepository");
const Joi = require("joi");

const categoriaSchema = Joi.object({
  nome: Joi.string().required(),
});

module.exports = {
  async getAll() {
    return await CategoriaRepository.getAll();
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
