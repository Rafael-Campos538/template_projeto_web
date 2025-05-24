const db = require("../database");

module.exports = {
  async getAll() {
    const result = await db.query("SELECT * FROM users");
    return result.rows;
  },

  async create(data) {
    const { nome, email, senha } = data;
    const result = await db.query(
      "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );
    return result.rows[0];
  },
};
