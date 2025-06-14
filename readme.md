
# Gerenciador de Tarefas

### Descrição do Sistema:
Este projeto consiste em uma API RESTful para gerenciar usuários, categorias e tarefas. Utiliza Node.js, Express, PostgreSQL e segue o padrão de arquitetura MVC. Os usuários podem cadastrar atividades, marcar como concluídas ou não e relacionar cada tarefa a uma categoria específica. Este é um vídeo explicativo sobre o modelo final do meu projeto [Explicação gerenciador de tarefas](assets/Explicacao_gerenciador-tarefas.mp4).

### Estrutura de Pastas:
 ```bash
template_projeto_web/
├── assets/
│ └── ... (imagens, etc.)
├── documentos/
│ └── ... (documentos de apoio, relatórios, etc.)
├── rest.http
├── src/
│ ├── controllers/
│ │ ├── CategoriaController.js
│ │ ├── TaskController.js
│ │ └── UserController.js
│ │
│ ├── migrations/
│ │ └── init.sql
│ │ └── runMigrations.js
│ │
│ ├── models/
│ │ ├── Categoria.js
│ │ ├── Task.js
│ │ └── User.js
│ │
│ ├── repositories/
│ │ ├── CategoriaRepository.js
│ │ ├── TaskRepository.js
│ │ └── UserRepository.js
│ │
│ ├── routes/
│ │ ├── categoriaRoutes.js
│ │ ├── taskRoutes.js
│ │ └── userRoutes.js
│ │
│ ├── services/
│ │ ├── CategoriaService.js
│ │ ├── TaskService.js
│ │ └── UserService.js
│ │
│ ├── tests/
│ │ ├── categoria.test.js
│ │ ├── task.test.js
│ │ └── user.test.js
│ │
│ ├── views/
│ │ ├── pages/
│ │   ├──cadastro.ejs
│ │   ├──login.ejs
│ │   └──tasks.ejs
│ │ └── partials/
│ │   ├──footer.ejs
│ │   └──header.ejs
│ │
│ ├── database.js
│ ├── server.js
│ ├── .env
│ └── package.json
``` 

### Como executar o projeto localmente:

- Pré-requisitos

    - [Node.js](https://nodejs.org/) instalado (versão recomendada: 18.x ou superior).
    - [PostgreSQL](https://www.postgresql.org/) instalado e em execução.
    - Git instalado.

1. Clone o repositório:
    - Abra o terminal e execute:
    ```bash
     git clone https://github.com/MauriKorn18/projeto-web.git
     cd projeto-web
     ```

2. Instale as dependências do projeto:
     - Certifique-se de que o Node.js está instalado.
     - Execute o comando:
     ```bash
     npm install
     ```

3. Configure o ambiente:
     - Copie o arquivo de exemplo de variáveis de ambiente:
     ```bash
     cp .env.example .env
     ```
     - Edite o `.env` com as informações corretas do Supabase (banco de dados, porta, etc.).

4. Configure o banco de dados:
    - Certifique-se que o PostgreSQL está configurado e rodando e depois execute esse comando:
     ```bash
     node migrations/runSQLScript.js
     ```
   - Isso criará as tabelas `usuarios`, `salas` e `reservas`.

5. Inicie o servidor:
    - Com o banco configurado e o `.env` preenchido:
     ```bash
     npm start
     ```
   - O sistema será iniciado em `http://localhost:3000` (ou na porta especificada).

