const knex = require("../database/knex/index");

class ProductsDetailsRepository {
  async insert(table, detailsInsert) {
    await knex(table).insert(detailsInsert);
  }

  async findByProductId(table, product_id) {
    return await knex(table).where({ product_id });
  }

  async delete(table, product_id) {
    await knex(table).delete().where({ product_id });
  }
}

module.exports = ProductsDetailsRepository;