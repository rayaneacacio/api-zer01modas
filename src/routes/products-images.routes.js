const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const ProductsImagesController = require("../controllers/products-images-controller");
const productsImagesController = new ProductsImagesController();

const productsImagesRoutes = Router();

productsImagesRoutes.post("/", upload.array("images"), productsImagesController.create);
productsImagesRoutes.get("/index_by_color", productsImagesController.indexByColor);
productsImagesRoutes.get("/index", productsImagesController.index);
productsImagesRoutes.post("/delete", productsImagesController.delete);

module.exports = productsImagesRoutes;