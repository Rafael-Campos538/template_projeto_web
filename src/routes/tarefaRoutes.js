const express = require("express");
const router = express.Router();
const TarefaController = require("../controllers/TarefaController");

router.get("/", TarefaController.index);
router.post("/", TarefaController.store);
router.put("/:id", TarefaController.update);
router.delete("/:id", TarefaController.delete);

module.exports = router;
