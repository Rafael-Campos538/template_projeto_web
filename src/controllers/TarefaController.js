const TarefaService = require("../services/TarefaService");

module.exports = {
  async index(req, res) {
    const tarefas = await TarefaService.getAll();
    res.json(tarefas);
  },

  async show(req, res) {
    const { id } = req.params;
    const tarefa = await TarefaService.getById(id);
    if (!tarefa)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    res.json(tarefa);
  },

  async store(req, res) {
    const nova = await TarefaService.create(req.body);
    res.status(201).json(nova);
  },

  async update(req, res) {
    const { id } = req.params;
    const atualizada = await TarefaService.update(id, req.body);
    res.json(atualizada);
  },

  async delete(req, res) {
    const { id } = req.params;
    await TarefaService.delete(id);
    res.status(204).send();
  },
};
