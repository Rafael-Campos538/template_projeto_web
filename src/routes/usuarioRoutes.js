const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.get("/", UsuarioController.index);
router.post("/", UsuarioController.store);

module.exports = router;
