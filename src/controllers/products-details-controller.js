const knex = require("../database/knex/index");

class ProductsDetailsController{
  async create(request, response) {
    const { product_id, details } = request.body;

    const detailsInsert = details.map(detail => {
      return {
        product_id,
        detail
      }
    });

    await knex("products_details").insert(detailsInsert);

    return response.json(detailsInsert);
  }

  async index(request, response) {
    const { product_id } = request.query;

    const details = await knex("products_details").where({ product_id });

    return response.json(details);
  }

  async delete(request, response) {
    const { product_id } = request.query;

    await knex("products_details").delete().where({ product_id });

    return response.json();
  }
}

module.exports = ProductsDetailsController;