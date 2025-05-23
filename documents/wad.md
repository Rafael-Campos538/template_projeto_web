
# Web Application Document (WAD)

## Introdução

Este projeto é uma aplicação web que utiliza Node.js e PostgreSQL como tecnologias principais. A estrutura do sistema foi organizada com a separação clara de responsabilidades entre controladores, modelos, serviços e migrações. Trata de um sistema voltado especialmente para iniciantes e atividades acadêmicas, oferecendo uma base prática para o desenvolvimento backend com banco de dados relacional.

## Diagrama do Banco de Dados

O banco de dados foi estruturado a partir de um modelo simples, incluindo, por exemplo, uma tabela de usuários. As migrações responsáveis pela criação das tabelas encontram-se no diretório `/migrations/scripts` e são organizadas em ordem cronológica de execução, conforme o timestamp presente no nome de cada arquivo.

> O modelo relacional do banco de dados está representado na imagem abaixo:

![Modelo Relacional](../assets/modelo-banco.png)

> O modelo físico do banco de dados está representado abaixo:

``` 
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR (70),
  data_nascimento DATE
);

CREATE TABLE IF NOT EXISTS tarefa (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descricao VARCHAR(500) NOT NULL,
  data_criacao DATE,
  data_entrega DATE,
  concluido BOOLEAN NOT NULL,
  usuarios_id UUID,
  FOREIGN KEY (usuarios_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS categoria (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  data_criacao DATE,
  tarefa_id INTEGER,
  FOREIGN KEY (tarefa_id) REFERENCES tarefa(id)
);
```