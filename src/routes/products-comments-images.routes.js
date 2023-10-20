const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const ProductsCommentsImagesController = require("../controllers/products-comments-images-controller");
const productsCommentsImagesController = new ProductsCommentsImagesController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsCommentsImagesRoutes = Router();

productsCommentsImagesRoutes.use(EnsureAuthenticated);

productsCommentsImagesRoutes.post("/", upload.array("images", 3), productsCommentsImagesController.create);
productsCommentsImagesRoutes.get("/index", productsCommentsImagesController.index);
productsCommentsImagesRoutes.delete("/delete", productsCommentsImagesController.delete);

module.exports = productsCommentsImagesRoutes;