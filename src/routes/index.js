const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const productsRoutes = require("./products.routes");
const productsPromotionsRoutes = require("./products-promotions-.routes");
const productsColorsRoutes = require("./products-colors.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/products", productsRoutes);
routes.use("/products_promotions", productsPromotionsRoutes);
routes.use("/products_colors", productsColorsRoutes);

module.exports = routes;