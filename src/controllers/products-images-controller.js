const ProductsImagesRepository = require("../repositories/products-images-repository");

class ProductsImagesController {
  async create(request, response) {
    const { product_id, color_id, color_hex } = request.query;
    
    const imgsFilename = request.files;
    const productsImagesRepository = new ProductsImagesRepository();

    for(const img of imgsFilename) {
      const filename = await productsImagesRepository.saveInDiskStorage(img.filename);
      await productsImagesRepository.saveInDatabase(product_id, color_id, color_hex, filename);
    };

    return response.json();
  }

  async index(request, response) {
    //retorna todas as imagens de um produto;
    const { product_id } = request.query;
    const productsImagesRepository = new ProductsImagesRepository();

    const images = await productsImagesRepository.allImgsOfProduct(product_id);

    return response.json(images);
  }

  async indexByColor(request, response) {
    //retorna um array de imagens por cor de um produto;
    const { product_id, color_id } = request.query;
    const productsImagesRepository = new ProductsImagesRepository();

    const array = await productsImagesRepository.findByColor(product_id, color_id);
    const images = array.map(n => n.image);

    return response.json(images);
  }

  async delete(request, response) {
    const { product_id, color_hex } = request.body;
    const productsImagesRepository = new ProductsImagesRepository();

    let array = [];

    if(color_hex) {
      array = await productsImagesRepository.findByColor(product_id, color_hex);
      await productsImagesRepository.deleteInDatabase(product_id, color_hex);
    } else {
      array = await productsImagesRepository.allImgsOfProduct(product_id);
    }

    array.map(async (n) => {
      await productsImagesRepository.deleteInDiskStorage(n.image);
    });

    return response.json();
  }
}

module.exports = ProductsImagesController;