const knex = require("../database/knex/index");

class ProductsModelDetailsController {
  async create(request, response) {
    const { product_id, model_details } = request.body;

    const detailsInsert = model_details.map(model_detail => {
      return {
        product_id,
        model_detail
      }
    });

    await knex("products_model_details").insert(detailsInsert);

    return response.json(detailsInsert);
  }

  async index(request, response) {
    const { product_id } = request.query;

    const details = await knex("products_model_details").where({ product_id });

    return response.json(details);
  }

  async delete(request, response) {
    const { product_id } = request.query;

    await knex("products_model_details").delete().where({ product_id });

    return response.json();
  }
}

module.exports = ProductsModelDetailsController;