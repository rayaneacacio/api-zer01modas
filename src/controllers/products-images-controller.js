const ProductsImagesRepository = require("../repositories/products-images-repository");

class ProductsImagesController {
  async create(request, response) {
    const { product_id, color_id } = request.query;
    const imgsFilename = request.files;
    const productsImagesRepository = new ProductsImagesRepository();

    for(const img of imgsFilename) {
      const filename = await productsImagesRepository.saveInDiskStorage(img.filename);
      await productsImagesRepository.saveInDatabase(product_id, color_id, filename);
    };

    return response.json();
  }

  async index(request, response) {
    const { product_id, color_id } = request.query;
    const productsImagesRepository = new ProductsImagesRepository();

    const array = await productsImagesRepository.findByColor(product_id, color_id);
    const images = array.map(n => n.image);

    return response.json(images);
  }

  async delete(request, response) {
    const { product_id, color_id } = request.query;
    const productsImagesRepository = new ProductsImagesRepository();

    const array = await productsImagesRepository.findByColor(product_id, color_id);
    array.map(async (n) => {
      await productsImagesRepository.deleteInDiskStorage(n.image);
    });

    await productsImagesRepository.deleteInDatabase(color_id);

    return response.json();
  }
}

module.exports = ProductsImagesController;