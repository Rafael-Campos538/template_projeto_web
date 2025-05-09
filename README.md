# template_projeto_web

Este é um sistema web básico em Node.js com suporte a banco de dados PostgreSQL, voltado para aplicações CRUD com arquitetura organizada e migrações SQL.

## Minha Estrutura de Pastas:


template_projeto_web-main/
├── assets/ # Recursos estáticos
├── config/ # Configuração do banco de dados
├── controllers/ # Lógica dos controladores 
├── documentos/ # Documentação do projeto 
├── migrations/ # Scripts SQL de migração
│ └── scripts/ # Arquivos .sql nomeados
├── models/ # Representações das entidades do banco
├── services/ # Serviços auxiliares, como validações
├── views/ # Páginas HTML (caso aplicável)
├── server.js # Arquivo principal do servidor Node.js
├── package.json # Configuração do projeto Node.js
└── README.md # Descriçao do programa


## Para executar localmente é necessario que:

**Instale as dependências:**

```bash
npm install 
```

Crie um arquivo .env na raiz (ajuste conforme seu banco de dados):
```bash
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
```

Execute as migrações SQL:
```bash
node migrations/runMigration.js
```

Inicie o servidor:
```bash
node server.js
```
