const knex = require("../database/knex/index");

class ProductsDetailsRepository {
  async insert(detailsInsert) {
    await knex("products_details").insert(detailsInsert);
  }

  async findByProductId(product_id) {
    return await knex("products_details").where({ product_id });
  }

  async delete(product_id) {
    await knex("products_details").delete().where({ product_id });
  }
}

module.exports = ProductsDetailsRepository;