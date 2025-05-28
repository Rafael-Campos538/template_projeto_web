const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const controller = new HomeController();

router.get("/", controller.mostrarHome.bind(controller));

module.exports = router;
