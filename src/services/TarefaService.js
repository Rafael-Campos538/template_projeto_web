const db = require("../database");

module.exports = {
  async getAll() {
    const { rows } = await db.query("SELECT * FROM tasks");
    return rows;
  },

  async create({ titulo, descricao, status, user_id, category_id }) {
    const { rows } = await db.query(
      `INSERT INTO tasks (titulo, descricao, status, user_id, category_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [titulo, descricao, status || "pendente", user_id, category_id]
    );
    return rows[0];
  },

  async update(id, { titulo, descricao, status }) {
    const { rows } = await db.query(
      `UPDATE tasks SET titulo=$1, descricao=$2, status=$3 WHERE id=$4 RETURNING *`,
      [titulo, descricao, status, id]
    );
    return rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM tasks WHERE id=$1", [id]);
  },
};
