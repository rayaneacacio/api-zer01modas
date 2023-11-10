const { Router } = require("express");

const ProductsModelDetailsController = require("../controllers/products-model-details-controller");
const productsModelDetailsController = new ProductsModelDetailsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsModelDetailsRoutes = Router();

productsModelDetailsRoutes.post("/", EnsureAuthenticated, productsModelDetailsController.create);
productsModelDetailsRoutes.get("/index", productsModelDetailsController.index);
productsModelDetailsRoutes.delete("/delete", EnsureAuthenticated, productsModelDetailsController.delete);

module.exports = productsModelDetailsRoutes;