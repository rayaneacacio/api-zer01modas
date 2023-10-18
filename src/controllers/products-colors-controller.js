const ProductsColorsRepository = require("../repositories/products-colors-repository");

class ProductsColorsController {
  async create(request, response) {
    const { product_id, colors } = request.body;
    const productsColorsRepository = new ProductsColorsRepository();

    const colorsInsert = colors.map(color => {
      return {
        product_id,
        color
      }
    });

    await productsColorsRepository.create(colorsInsert);

    return response.json();
  }

  async indexColors(request, response) {
    //retorna todas as cores de um produto;
    const { product_id } = request.query;
    const productsColorsRepository = new ProductsColorsRepository();

    const colors = await productsColorsRepository.findByProductId(product_id);

    return response.json(colors);
  }

  async indexProducts(request, response) {
    //retorna todos os produtos da cor solicitada;
    const { color } = request.query;
    const productsColorsRepository = new ProductsColorsRepository();

    const colors = await productsColorsRepository.findByColor(color);

    return response.json(colors);
  }

  async delete(request, response) {
    const { product_id, colors } = request.body;
    const productsColorsRepository = new ProductsColorsRepository();

    for(const color of colors) {
      await productsColorsRepository.delete(product_id, color);
    }

    return response.json();
  }
}

module.exports = ProductsColorsController;