const { Router } = require("express");

const ProductsPromotionsController = require("../controllers/products-promotions-controller");
const productsPromotionsController = new ProductsPromotionsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsPromotionsRoutes = Router();

productsPromotionsRoutes.post("/", EnsureAuthenticated, productsPromotionsController.create);
productsPromotionsRoutes.get("/index", productsPromotionsController.index);
productsPromotionsRoutes.get("/index_by_category", productsPromotionsController.indexByCategory);
productsPromotionsRoutes.get("/show", productsPromotionsController.show);
productsPromotionsRoutes.post("/delete", EnsureAuthenticated, productsPromotionsController.delete);

module.exports = productsPromotionsRoutes;