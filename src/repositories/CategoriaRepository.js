const db = require("../database");

module.exports = {
  async getAll() {
    const result = await db.query("SELECT * FROM categories");
    return result.rows;
  },

  async getAllByUser(userId) {
    const result = await db.query(
      "SELECT * FROM categories WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  },

  async getById(id) {
    const result = await db.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async create(dataCategoria) {
    const { nome, user_id } = dataCategoria;
    const result = await db.query(
      "INSERT INTO categories (nome, user_id) VALUES ($1, $2) RETURNING *",
      [nome, user_id]
    );
    return result.rows[0];
  },

  async update(id, dataCategoria) {
    const { nome } = dataCategoria;
    const result = await db.query(
      `UPDATE categories SET nome = $1 WHERE id = $2 RETURNING *`,
      [nome, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM categories WHERE id = $1", [id]);
  },
};
