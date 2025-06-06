const TarefaService = require("../services/TarefaService");
const CategoriaService = require("../services/CategoriaService");

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
      const { titulo, descricao, status, data, userId, categoriaId } = req.body;

      const novaTarefa = await TarefaService.create({
        titulo,
        descricao,
        status,
        data,
        user_id: userId,
        categoria_id: categoriaId,
      });

      // redireciona para a página de tarefas após a criação
      res.redirect(`/pages/tasks?usuarioId=${userId}`);
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

  async renderTasksPage(req, res) {
    try {
      const userId = 2;
      if (isNaN(userId)) {
        return res.status(400).send("Usuário inválido");
      }

      // Busca todas as categorias do usuário
      const categorias = await CategoriaService.getAllByUser(userId);

      // Para cada categoria, busca as tarefas vinculadas
      for (const categoria of categorias) {
        const tarefas = await TarefaService.getByCategoriaId(categoria.id);
        categoria.tarefas = tarefas;
      }

      res.render("tasks", { userId, categorias });
    } catch (error) {
      res.status(500).send("Erro ao carregar a página de tarefas");
    }
  },
};
