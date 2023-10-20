const knex = require("../database/knex/index");
const ProductsImagesRepository = require("../repositories/products-images-repository");

class ProductsCommentsImagesController{
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;
    const imgsFilename = request.files;
    const productsImagesRepository = new ProductsImagesRepository();

    for(const img of imgsFilename) {
      const filename = await productsImagesRepository.saveInDiskStorage(img.filename);
      await knex("products_comments_images").insert({ product_id, user_id, image: filename });
    };
    
    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;

    const images = await knex("products_comments_images").where({ user_id, product_id });

    return response.json(images);
  }

  async delete(request, response) {
    const { id } = request.query;
    const productsImagesRepository = new ProductsImagesRepository();

    const { image } = await knex("products_comments_images").where({ id }).first();

    await productsImagesRepository.deleteInDiskStorage(image);
    await knex("products_comments_images").delete().where({ id });

    return response.json();
  }
}

module.exports = ProductsCommentsImagesController;