const express = require("express");
const TarefaController = require("../controllers/TarefaController");

const router = express.Router();

router.get("/", TarefaController.getAll);
router.get("/:id", TarefaController.getById);
router.post("/", TarefaController.create);
router.put("/:id", TarefaController.update);
router.delete("/:id", TarefaController.delete);

module.exports = router;
