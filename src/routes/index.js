const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const productsRoutes = require("./products.routes");
const productsPromotionsRoutes = require("./products-promotions-.routes");
const productsColorsRoutes = require("./products-colors.routes");
const productsSizesRoutes = require("./products-sizes.routes");
const productsImagesRoutes = require("./products-images.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/products", productsRoutes);
routes.use("/products_promotions", productsPromotionsRoutes);
routes.use("/products_colors", productsColorsRoutes);
routes.use("/products_sizes", productsSizesRoutes);
routes.use("/products_images", productsImagesRoutes);

module.exports = routes;