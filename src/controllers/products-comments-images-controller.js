const knex = require("../database/knex/index");
const ProductsImagesRepository = require("../repositories/products-images-repository");
const ProductsCommentsImagesRepository = require("../repositories/products-comments-images-repository");

class ProductsCommentsImagesController{
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;
    const imgsFilename = request.files;
    const productsImagesRepository = new ProductsImagesRepository();
    const productsCommentsImagesRepository = new ProductsCommentsImagesRepository();

    for(const img of imgsFilename) {
      const filename = await productsImagesRepository.saveInDiskStorage(img.filename);
      await productsCommentsImagesRepository.insert(user_id, product_id, filename);
    };
    
    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;
    const productsCommentsImagesRepository = new ProductsCommentsImagesRepository();

    const images = await productsCommentsImagesRepository.findImgs(user_id, product_id);

    return response.json(images);
  }

  async delete(request, response) {
    const { id } = request.query;
    const productsImagesRepository = new ProductsImagesRepository();
    const productsCommentsImagesRepository = new ProductsCommentsImagesRepository();

    const { image } = await productsCommentsImagesRepository.findById(id);

    await productsImagesRepository.deleteInDiskStorage(image);
    await productsCommentsImagesRepository.delete(id);

    return response.json();
  }
}

module.exports = ProductsCommentsImagesController;