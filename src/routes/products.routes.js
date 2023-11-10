const { Router } = require("express");

const ProductsController = require("../controllers/products-controller");
const productsController = new ProductsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsRoutes = Router();

productsRoutes.post("/", EnsureAuthenticated, productsController.create);
productsRoutes.get("/index", productsController.index);
productsRoutes.get("/show", productsController.show);
productsRoutes.patch("/", EnsureAuthenticated, productsController.update);
productsRoutes.post("/delete", EnsureAuthenticated, productsController.delete);

module.exports = productsRoutes;