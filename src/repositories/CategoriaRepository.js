const db = require("../database");
const Categoria = require("../models/Categoria");

class CategoriaRepository {
  async findAll() {
    const result = await db.query("SELECT id, nome FROM categorias");
    return result.rows.map((row) => new Categoria(row.id, row.nome));
  }

  async findById(id) {
    const result = await db.query(
      "SELECT id, nome FROM categorias WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return null;
    const { id: catId, nome } = result.rows[0];
    return new Categoria(catId, nome);
  }

  async create(categoria) {
    const { nome } = categoria;
    const result = await db.query(
      "INSERT INTO categorias (nome) VALUES ($1) RETURNING *",
      [nome]
    );
    const { id, nome: nomeRet } = result.rows[0];
    return new Categoria(id, nomeRet);
  }

  async update(id, categoria) {
    const { nome } = categoria;
    const result = await db.query(
      "UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *",
      [nome, id]
    );
    const { id: catId, nome: nomeRet } = result.rows[0];
    return new Categoria(catId, nomeRet);
  }

  async delete(id) {
    await db.query("DELETE FROM categorias WHERE id = $1", [id]);
  }
}

module.exports = new CategoriaRepository();
