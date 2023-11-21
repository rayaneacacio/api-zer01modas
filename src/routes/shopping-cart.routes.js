const { Router } = require("express");

const ShoppingCartController = require("../controllers/shopping-cart-controller");
const shoppingCartController = new ShoppingCartController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const shoppingCartRoutes = Router();

shoppingCartRoutes.post("/", EnsureAuthenticated, shoppingCartController.create);
shoppingCartRoutes.get("/index", EnsureAuthenticated, shoppingCartController.index);
shoppingCartRoutes.delete("/delete", EnsureAuthenticated, shoppingCartController.delete);

module.exports = shoppingCartRoutes;