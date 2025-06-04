const { Pool } = require("pg");

let pool;

try {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, // corrigido de DB_NAME para DB_DATABASE
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  // Testa a conexão imediatamente
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Erro ao conectar no banco de dados:", err.stack);
    } else {
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
      release();
    }
  });
} catch (error) {
  console.error("Erro ao criar o pool de conexões:", error);
}

module.exports = pool;
