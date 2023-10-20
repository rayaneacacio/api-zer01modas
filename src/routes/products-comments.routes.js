const { Router } = require("express");

const ProductsCommentsController = require("../controllers/products-comments-controller");
const productsCommentsController = new ProductsCommentsController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsCommentsRoutes = Router();

productsCommentsRoutes.use(EnsureAuthenticated);

productsCommentsRoutes.post("/", productsCommentsController.create);
productsCommentsRoutes.get("/index_comments_product", productsCommentsController.indexByProducts);
productsCommentsRoutes.get("/index_comments_user", productsCommentsController.indexByUser);
productsCommentsRoutes.patch("/update", productsCommentsController.update);
productsCommentsRoutes.delete("/delete", productsCommentsController.delete);

module.exports = productsCommentsRoutes;