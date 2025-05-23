const db = require("../database");
const Categoria = require("../models/Categoria");

class CategoriaRepository {
  async findAll() {
    const result = await db.query("SELECT id FROM categorias");
    return result.rows.map((row) => new Categoria(row));
  }

  async findById(id) {
    const result = await db.query("SELECT id, nome, descricao FROM categorias WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) return null;
    return new Categoria(result.rows[0]);
  }

  async create(categoria) {
    const { nome, descricao } = categoria;
    const result = await db.query(
      "INSERT INTO categorias (nome, descricao) VALUES ($1, $2) RETURNING *",
      [nome, descricao]
    );
    return new Categoria(result.rows[0]);
  }

  async update(id, categoria) {
    const { nome, descricao } = categoria;
    const result = await db.query(
      "UPDATE categorias SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *",
      [nome, descricao, id]
    );
    return new Categoria(result.rows[0]);
  }

  async delete(id) {
    await db.query("DELETE FROM categorias WHERE id = $1", [id]);
  }
}

module.exports = new CategoriaRepository();
