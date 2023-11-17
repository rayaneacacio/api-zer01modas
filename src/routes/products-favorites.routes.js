const { Router } = require("express");

const ProductsFavoritesController = require("../controllers/products-favorites-controller");
const productsFavoritesController = new ProductsFavoritesController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");
const productsFavoritesRoutes = Router();

productsFavoritesRoutes.use(EnsureAuthenticated);

productsFavoritesRoutes.post("/", productsFavoritesController.create);
productsFavoritesRoutes.get("/show", productsFavoritesController.show);
productsFavoritesRoutes.get("/index", productsFavoritesController.index);
productsFavoritesRoutes.delete("/delete", productsFavoritesController.delete);

module.exports = productsFavoritesRoutes;