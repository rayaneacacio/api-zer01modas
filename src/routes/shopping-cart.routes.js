const { Router } = require("express");

const ShoppingCartController = require("../controllers/shopping-cart-controller");
const shoppingCartController = new ShoppingCartController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const shoppingCartRoutes = Router();

shoppingCartRoutes.use(EnsureAuthenticated);

shoppingCartRoutes.post("/", shoppingCartController.create);
shoppingCartRoutes.post("/show", shoppingCartController.show);
shoppingCartRoutes.get("/index", shoppingCartController.index);
shoppingCartRoutes.patch("/patch", shoppingCartController.update);
shoppingCartRoutes.post("/delete", shoppingCartController.delete);

module.exports = shoppingCartRoutes;