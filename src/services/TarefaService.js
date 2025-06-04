const TarefaRepository = require("../repositories/TarefaRepository");

module.exports = {
  async getAll() {
    return await TarefaRepository.getAll();
  },

  async findById(id) {
    return await TarefaRepository.findById(id);
  },

  async create(data) {
    // 'data' pode conter campo 'data' (data da tarefa)
    return await TarefaRepository.create(data);
  },

  async update(id, data) {
    return await TarefaRepository.update(id, data);
  },

  async delete(id) {
    await TarefaRepository.delete(id);
  },
};
