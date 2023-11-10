const { Router } = require("express");

const ProductsDetailsController = require("../controllers/products-details-controller");
const productsDetailsController = new ProductsDetailsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsDetailsRoutes = Router();

productsDetailsRoutes.post("/", EnsureAuthenticated, productsDetailsController.create);
productsDetailsRoutes.get("/index", productsDetailsController.index);
productsDetailsRoutes.delete("/delete", EnsureAuthenticated, productsDetailsController.delete);

module.exports = productsDetailsRoutes;