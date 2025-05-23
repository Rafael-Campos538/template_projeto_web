const pool = require("../database");

module.exports = {
  async getAll() {
    const result = await pool.query("SELECT * FROM categorias");
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async create(data) {
    const { nome } = data;
    const result = await pool.query(
      "INSERT INTO categorias (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const { nome } = data;
    const result = await pool.query(
      "UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *",
      [nome, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
  },
};
