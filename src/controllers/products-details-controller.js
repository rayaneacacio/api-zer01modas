const ProductsDetailsRepository = require("../repositories/products-details-repository");

class ProductsDetailsController{
  async create(request, response) {
    const { product_id, details } = request.body;
    const productsDetailsRepository = new ProductsDetailsRepository();

    const detailsInsert = details.map(detail => {
      return {
        product_id,
        detail
      }
    });

    await productsDetailsRepository.insert("products_details", detailsInsert);

    return response.json(detailsInsert);
  }

  async index(request, response) {
    const { product_id } = request.query;
    const productsDetailsRepository = new ProductsDetailsRepository();

    const details = await productsDetailsRepository.findByProductId("products_details", product_id);

    return response.json(details);
  }

  async delete(request, response) {
    const { product_id } = request.query;
    const productsDetailsRepository = new ProductsDetailsRepository();

    await productsDetailsRepository.delete("products_details", product_id);

    return response.json();
  }
}

module.exports = ProductsDetailsController;