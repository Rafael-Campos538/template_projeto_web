const db = require("../database");

module.exports = {
  async getAll() {
    const result = await db.query("SELECT * FROM tasks");
    return result.rows;
  },

  async findById(id) {
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(data) {
    const {
      titulo,
      descricao,
      status,
      data: dataTarefa,
      user_id,
      categoria_id,
    } = data;
    const result = await db.query(
      `INSERT INTO tasks (titulo, descricao, status, data, user_id, categoria_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [titulo, descricao, status, dataTarefa, user_id, categoria_id]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const {
      titulo,
      descricao,
      status,
      data: dataTarefa,
      user_id,
      categoria_id,
    } = data;
    const result = await db.query(
      `UPDATE tasks SET titulo = $1, descricao = $2, status = $3, data = $4, user_id = $5, categoria_id = $6 
       WHERE id = $7 RETURNING *`,
      [titulo, descricao, status, dataTarefa, user_id, categoria_id, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },

  // MÉTODO FALTANTE - Adicionar este método
  async getByCategoriaId(categoriaId) {
    const result = await db.query(
      "SELECT * FROM tasks WHERE categoria_id = $1",
      [categoriaId]
    );
    return result.rows;
  },
};
