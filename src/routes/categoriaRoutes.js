const express = require("express");
const CategoriaController = require("../controllers/CategoriaController");

const router = express.Router();

router.get("/", CategoriaController.getAll);
router.get("/:id", CategoriaController.getById);
router.post("/", CategoriaController.create);
router.put("/:id", CategoriaController.update);
router.delete("/:id", CategoriaController.delete);

//router.get("/pages/tasks", CategoriaController.renderCategoriasPage);
//router.post("/pages/tasks", CategoriaController.createFromForm);

module.exports = router;
