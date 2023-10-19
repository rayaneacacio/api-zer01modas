const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const ProductsImagesController = require("../controllers/products-images-controller");
const productsImagesController = new ProductsImagesController();

const EnsureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsImagesRoutes = Router();

productsImagesRoutes.use(EnsureAuthenticated);

productsImagesRoutes.post("/", upload.array("images"), productsImagesController.create);
productsImagesRoutes.get("/index", productsImagesController.index);
productsImagesRoutes.delete("/delete", productsImagesController.delete);

module.exports = productsImagesRoutes;