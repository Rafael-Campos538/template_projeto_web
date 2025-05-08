 -- Criaçao da tabela de autores
 CREATE TABLE autor(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50),
  data_nascimento DATE
 );