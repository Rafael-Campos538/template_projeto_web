class Categoria {
  constructor({ id = null, nome, descricao }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }
}

module.exports = Categoria;
