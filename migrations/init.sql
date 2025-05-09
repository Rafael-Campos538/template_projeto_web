--Criaçao da tabela de autores
CREATE TABLE IF NOT EXISTS autor(
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
nacionalidade VARCHAR(50),
data_nascimento DATE
);

CREATE TABLE IF NOT EXISTS livro(
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  ano_publicacao INTEGER NOT NULL, 
  paginas INTEGER NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  autor_id INTEGER NOT NULL, 
  FOREIGN KEY (autor_id) REFERENCES autor(id)
);

CREATE TABLE IF NOT EXISTS categoria(
  id SERIAL PRIMARY KEY,
  NOME varchar(50) NOT NULL,
  descricao TEXT
);

CREATE TABLE IF NOT EXISTS livro_categorias(
  livro_id INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
  PRIMARY KEY (livro_id, categoria_id),
  FOREIGN KEY (livro_id) REFERENCES livro(id),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);
