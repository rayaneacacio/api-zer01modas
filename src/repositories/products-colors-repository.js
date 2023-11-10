const knex = require("../database/knex/index");

class ProductsColorsRepository {
  async create({ product_id, name, hex }) {
    const [ id ] = await knex("products_colors").insert({ product_id, name, hex });
    return id;
  }

  async findByProductId(product_id) {
    return await knex("products_colors").where({ product_id });
  }

  async findByColor(color) {
    return await knex("products_colors").where({ color });
  }

  async delete({ product_id, name, hex }) {
    await knex("products_colors").delete().where({ product_id, name, hex });
  }
}

module.exports = ProductsColorsRepository;