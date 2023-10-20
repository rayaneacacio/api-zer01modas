const ProductsDetailsRepository = require("../repositories/products-details-repository");

class ProductsModelDetailsController {
  async create(request, response) {
    const { product_id, model_details } = request.body;
    const productsDetailsRepository = new ProductsDetailsRepository();

    const detailsInsert = model_details.map(model_detail => {
      return {
        product_id,
        model_detail
      }
    });

    await productsDetailsRepository.insert("products_model_details", detailsInsert);

    return response.json(detailsInsert);
  }

  async index(request, response) {
    const { product_id } = request.query;
    const productsDetailsRepository = new ProductsDetailsRepository();

    const details = await productsDetailsRepository.findByProductId("products_model_details", product_id);

    return response.json(details);
  }

  async delete(request, response) {
    const { product_id } = request.query;
    const productsDetailsRepository = new ProductsDetailsRepository();

    await productsDetailsRepository.delete("products_model_details", product_id);

    return response.json();
  }
}

module.exports = ProductsModelDetailsController;