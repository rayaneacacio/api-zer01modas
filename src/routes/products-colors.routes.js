const { Router } = require("express");

const ProductsColorsController = require("../controllers/products-colors-controller");
const productsColorsController = new ProductsColorsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsColorsRoutes = Router();

productsColorsRoutes.use(EnsureAuthenticated);
productsColorsRoutes.post("/", productsColorsController.create);
productsColorsRoutes.get("/index_colors", productsColorsController.indexColors);
productsColorsRoutes.get("/index_products", productsColorsController.indexProducts);
productsColorsRoutes.post("/delete", productsColorsController.delete);

module.exports = productsColorsRoutes;