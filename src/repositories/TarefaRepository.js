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
    // Constrói a query dinamicamente baseada nos campos fornecidos
    const campos = [];
    const valores = [];
    let paramIndex = 1;

    if (data.titulo !== undefined) {
      campos.push(`titulo = $${paramIndex}`);
      valores.push(data.titulo);
      paramIndex++;
    }

    if (data.descricao !== undefined) {
      campos.push(`descricao = $${paramIndex}`);
      valores.push(data.descricao);
      paramIndex++;
    }

    if (data.status !== undefined) {
      campos.push(`status = $${paramIndex}`);
      valores.push(data.status);
      paramIndex++;
    }

    if (data.data !== undefined) {
      campos.push(`data = $${paramIndex}`);
      valores.push(data.data);
      paramIndex++;
    }

    if (data.user_id !== undefined) {
      campos.push(`user_id = $${paramIndex}`);
      valores.push(data.user_id);
      paramIndex++;
    }

    if (data.categoria_id !== undefined) {
      campos.push(`categoria_id = $${paramIndex}`);
      valores.push(data.categoria_id);
      paramIndex++;
    }

    if (campos.length === 0) {
      throw new Error("Nenhum campo para atualizar");
    }

    // Adiciona o ID como último parâmetro
    valores.push(id);

    const query = `UPDATE tasks SET ${campos.join(
      ", "
    )} WHERE id = $${paramIndex} RETURNING *`;

    const result = await db.query(query, valores);
    return result.rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },

  async getByCategoriaId(categoriaId) {
    const result = await db.query(
      "SELECT * FROM tasks WHERE categoria_id = $1",
      [categoriaId]
    );
    return result.rows;
  },
};
