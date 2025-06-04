const TarefaService = require("../services/TarefaService");

module.exports = {
  async getAll(req, res) {
    try {
      const tarefas = await TarefaService.getAll();
      res.json(tarefas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await TarefaService.findById(id);
      if (!tarefa)
        return res.status(404).json({ error: "Tarefa não encontrada" });
      res.json(tarefa);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tarefa" });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const novaTarefa = await TarefaService.create(data);
      res.status(201).json(novaTarefa);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tarefa" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const tarefaAtualizada = await TarefaService.update(id, data);
      if (!tarefaAtualizada)
        return res.status(404).json({ error: "Tarefa não encontrada" });
      res.json(tarefaAtualizada);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await TarefaService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar tarefa" });
    }
  },
};
