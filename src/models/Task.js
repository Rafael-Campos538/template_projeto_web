// src/models/Task.js
class Task {
  constructor(id, titulo, descricao, categoria_id, usuario_id) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.categoria_id = categoria_id;
    this.usuario_id = usuario_id;
  }
}

module.exports = Task;
