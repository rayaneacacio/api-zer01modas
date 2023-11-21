const knex = require("../database/knex/index");

class ShoppingCartRepository {
  async create({ user_id, product_id, size, color_name, color_hex }) {
    await knex("shopping_cart").insert({ user_id, product_id, size, color_name, color_hex });
  }

  async findAllProducts(user_id) {
    return await knex("shopping_cart").where({ user_id });
  }

  async delete(user_id, product_id) {
    await knex("shopping_cart").delete().where({ user_id, product_id });
  }
}

module.exports = ShoppingCartRepository;