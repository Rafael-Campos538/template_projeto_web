const fs = require("fs");
const path = require("path");
require("dotenv").config();
const pool = require("../database");

const runSQLScript = async () => {
  const scriptFiles = ["init.sql", "seed.sql"];

  try {
    for (const file of scriptFiles) {
      const filePath = path.join(__dirname, file);
      const sql = fs.readFileSync(filePath, "utf8");
      console.log(`Executando ${file}...`);
      await pool.query(sql);
    }
    console.log("Migrações e dados de exemplo inseridos com sucesso!");
  } catch (err) {
    console.error("Erro ao executar o script SQL:", err);
  } finally {
    await pool.end();
  }
};

runSQLScript();
