// src/models/User.js
class User {
  constructor(id, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

module.exports = User;
