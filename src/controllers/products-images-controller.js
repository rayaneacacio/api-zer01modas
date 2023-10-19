const knex = require("../database/knex/index");
const DiskStorage = require("../providers/DiskStorage");

class ProductsImagesController {
  async create(request, response) {
    const { product_id, color_id } = request.query;
    const imgsFilename = request.files;
    const diskStorage = new DiskStorage();

    for(const img of imgsFilename) {
      const filename = await diskStorage.saveFile(img.filename);
      await knex("products_images").insert({ product_id, color_id, image: filename });
    };

    return response.json();
  }

  async index(request, response) {
    const { product_id, color_id } = request.query;

    const array = await knex("products_images").where({ product_id, color_id });
    const images = array.map(n => n.image);

    return response.json(images);
  }

  async delete(request, response) {
    const { product_id, color_id } = request.query;
    const diskStorage = new DiskStorage();

    const array = await knex("products_images").where({ product_id, color_id });
    array.map(async (n) => {
      await diskStorage.deleteFile(n.image);
    });

    await knex("products_images").delete().where({ color_id });

    return response.json();
  }
}

module.exports = ProductsImagesController;