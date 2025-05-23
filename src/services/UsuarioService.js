const db = require("../database");

module.exports = {
  async getAll() {
    const { rows } = await db.query("SELECT * FROM users");
    return rows;
  },

  async create({ nome, email, senha }) {
    const { rows } = await db.query(
      "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senha]
    );
    return rows[0];
  },
};
