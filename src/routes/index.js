const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const productsRoutes = require("./products.routes");
const productsPromotionsRoutes = require("./products-promotions-.routes");
const productsColorsRoutes = require("./products-colors.routes");
const productsSizesRoutes = require("./products-sizes.routes");
const productsImagesRoutes = require("./products-images.routes");
const productsDetailsRoutes = require("./products-details.routes");
const productsModelDetailsRoutes = require("./products-model-details.routes");
const productsCommentsRoutes = require("./products-comments.routes");
const productsCommentsImagesRoutes = require("./products-comments-images.routes");
const addressRoutes = require("./address.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/products", productsRoutes);
routes.use("/products_promotions", productsPromotionsRoutes);
routes.use("/products_colors", productsColorsRoutes);
routes.use("/products_sizes", productsSizesRoutes);
routes.use("/products_images", productsImagesRoutes);
routes.use("/products_details", productsDetailsRoutes);
routes.use("/products_model_details", productsModelDetailsRoutes);
routes.use("/products_comments", productsCommentsRoutes);
routes.use("/products_comments_images", productsCommentsImagesRoutes);
routes.use("/address", addressRoutes);

module.exports = routes;