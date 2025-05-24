const db = require("../database");

module.exports = {
  async getAll() {
    const { rows } = await db.query("SELECT * FROM tasks");
    return rows;
  },

  async getById(id) {
    const { rows } = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return rows[0];
  },

  async create(data) {
    const {
      titulo,
      descricao,
      status,
      data: dataEntrega,
      user_id,
      categoria_id,
    } = data;
    const query =
      "INSERT INTO tasks (titulo, descricao, status, data, user_id, categoria_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      titulo,
      descricao,
      status,
      dataEntrega,
      user_id,
      categoria_id,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async update(id, data) {
    const {
      titulo,
      descricao,
      status,
      data: dataEntrega,
      user_id,
      categoria_id,
    } = data;
    const query =
      "UPDATE tasks SET titulo = $1, descricao = $2, status = $3, data = $4, user_id = $5, categoria_id = $6 WHERE id = $7 RETURNING *";
    const values = [
      titulo,
      descricao,
      status,
      dataEntrega,
      user_id,
      categoria_id,
      id,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },
};
