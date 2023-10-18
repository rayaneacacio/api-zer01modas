const knex = require("../database/knex/index");

class ProductsColorsRepository {
  async create(colors) {
    await knex("products_colors").insert(colors);
  }

  async findByProductId(product_id) {
    return await knex("products_colors").where({ product_id });
  }

  async findByColor(color) {
    return await knex("products_colors").where({ color });
  }

  async delete(product_id, color) {
    await knex("products_colors").delete().where({ product_id, color });
  }
}

module.exports = ProductsColorsRepository;