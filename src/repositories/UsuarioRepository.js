const db = require("../database");

module.exports = {
  async getAll() {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  },

  async getById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async getByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },

  async create(dataUsuario) {
    const { nome, email, senha } = dataUsuario;
    const result = await db.query(
      "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );
    return result.rows[0];
  },

  async update(id, dataUsuario) {
    const { nome, email, senha } = dataUsuario;
    const result = await db.query(
      `UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *`,
      [nome, email, senha, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
  },
};
