const { Router } = require("express");

const ProductsPromotionsController = require("../controllers/products-promotions-controller");
const productsPromotionsController = new ProductsPromotionsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsPromotionsRoutes = Router();

productsPromotionsRoutes.use(EnsureAuthenticated);

productsPromotionsRoutes.post("/", productsPromotionsController.create);
productsPromotionsRoutes.get("/index", productsPromotionsController.index);
productsPromotionsRoutes.get("/show", productsPromotionsController.show);
productsPromotionsRoutes.patch("/", productsPromotionsController.update);
productsPromotionsRoutes.post("/delete", productsPromotionsController.delete);

module.exports = productsPromotionsRoutes;