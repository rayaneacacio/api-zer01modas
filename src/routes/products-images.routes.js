const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

const ProductsImagesController = require("../controllers/products-images-controller");
const productsImagesController = new ProductsImagesController();

const productsImagesRoutes = Router();

productsImagesRoutes.post("/", upload.array("images"), productsImagesController.create);
productsImagesRoutes.get("/show", productsImagesController.show);
productsImagesRoutes.get("/index", productsImagesController.index);
productsImagesRoutes.post("/delete", productsImagesController.delete);

module.exports = productsImagesRoutes;