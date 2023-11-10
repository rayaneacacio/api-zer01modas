const knex = require("../database/knex/index");
const DiskStorage = require("../providers/DiskStorage");

class ProductsImagesRepository {
  async saveInDiskStorage(filename) {
    const diskStorage = new DiskStorage();

    return await diskStorage.saveFile(filename);
  }

  async saveInDatabase(product_id, color_id, image) {
    await knex("products_images").insert({ product_id, color_id, image });
  }

  async findByColor(product_id, color_id) {
    return await knex("products_images").where({ product_id, color_id });
  }

  async allImgsOfProduct(product_id) {
    return await knex("products_images").where({ product_id });
  }

  async deleteInDiskStorage(filename) {
    const diskStorage = new DiskStorage();

    await diskStorage.deleteFile(filename);
  }

  async deleteInDatabase(color_id) {
    await knex("products_images").delete().where({ color_id });
  }
}

module.exports = ProductsImagesRepository;