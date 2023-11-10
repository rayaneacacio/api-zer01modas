const ProductsSizesRepository = require("../repositories/products-sizes-repository");
const ProductsSizesServices = require("../services/products-sizes/products-sizes-services");

class ProductsSizesController {
  async create(request, response) {
    const { product_id, color_id, sizes } = request.body;
    const productsSizesRepository = new ProductsSizesRepository();

    const sizesInsert = sizes.map(size => {
      return {
        product_id,
        color_id,
        size
      }
    });

    await productsSizesRepository.insert(sizesInsert);

    return response.json();
  }

  async indexBySize(request, response) {
    //retorna todos os produtos de um tamanho;
    const { size } = request.query;
    const productsSizesRepository = new ProductsSizesRepository();
    const productsSizesServices = new ProductsSizesServices();

    const products = await productsSizesRepository.findAllBySize(size);

    productsSizesServices.checkProducts(products);

    return response.json(products);
  }

  async index(request, response) {
    //retorna todos os tamanhos do produto;
    const { product_id } = request.query;
    const productsSizesRepository = new ProductsSizesRepository();

    const sizes = await productsSizesRepository.findById(product_id);

    return response.json(sizes);
  }

  async delete(request, response) {
    const { color_id } = request.query;
    const productsSizesRepository = new ProductsSizesRepository();

    await productsSizesRepository.deleteAllByColor(color_id);

    return response.json();
  }
}

module.exports = ProductsSizesController;