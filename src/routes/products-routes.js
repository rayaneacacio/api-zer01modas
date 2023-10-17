const { Router } = require("express");

const ProductsController = require("../controllers/products-controller");
const productsController = new ProductsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsRoutes = Router();

productsRoutes.use(EnsureAuthenticated);

productsRoutes.post("/", productsController.create);
productsRoutes.get("/index", productsController.index);
productsRoutes.get("/show", productsController.show);
productsRoutes.patch("/", productsController.update);
productsRoutes.post("/delete", productsController.delete);

module.exports = productsRoutes;