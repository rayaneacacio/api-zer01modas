const knex = require("../database/knex/index");
const DiskStorage = require("../providers/DiskStorage");

class ProductsImagesRepository {
  async saveInDiskStorage(filename) {
    const diskStorage = new DiskStorage();

    return await diskStorage.saveFile(filename);
  }

  async saveInDatabase(product_id, color_id, color_hex, image) {
    await knex("products_images").insert({ product_id, color_id, color_hex: "#"+color_hex, image });
  }

  async findByColor(product_id, color_hex) {
    return await knex("products_images").where({ product_id, color_hex });
  }

  async allImgsOfProduct(product_id) {
    return await knex("products_images").where({ product_id });
  }

  async deleteInDiskStorage(filename) {
    const diskStorage = new DiskStorage();
    await diskStorage.deleteFile(filename);
  }

  async deleteInDatabase(product_id, color_hex) {
    await knex("products_images").delete().where({ product_id, color_hex });
  }
}

module.exports = ProductsImagesRepository;