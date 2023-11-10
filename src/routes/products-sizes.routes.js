const { Router } = require("express");

const ProductsSizesController = require("../controllers/products-sizes-controller");
const productsSizesController = new ProductsSizesController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsSizesRoutes = Router();

productsSizesRoutes.post("/", EnsureAuthenticated, productsSizesController.create);
productsSizesRoutes.get("/index_bysize", productsSizesController.indexBySize);
productsSizesRoutes.get("/index", productsSizesController.index);
productsSizesRoutes.delete("/delete", EnsureAuthenticated, productsSizesController.delete);

module.exports = productsSizesRoutes;