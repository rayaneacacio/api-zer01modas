const { Router } = require("express");

const ProductsSizesController = require("../controllers/products-sizes-controller");
const productsSizesController = new ProductsSizesController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsSizesRoutes = Router();

productsSizesRoutes.use(EnsureAuthenticated);

productsSizesRoutes.post("/", productsSizesController.create);
productsSizesRoutes.get("/index_bysize", productsSizesController.indexBySize);
productsSizesRoutes.get("/index_bycolor", productsSizesController.indexByColor);
productsSizesRoutes.delete("/delete", productsSizesController.delete);

module.exports = productsSizesRoutes;