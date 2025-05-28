class HomeController {
  mostrarHome(req, res) {
    console.log("[HomeController] - mostrarHome acionado");
    res.render("index");
  }
}

module.exports = HomeController;
