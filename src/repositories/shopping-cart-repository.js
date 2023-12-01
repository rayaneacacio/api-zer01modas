const knex = require("../database/knex/index");

class ShoppingCartRepository {
  async create({ user_id, product_id, size, color_name, color_hex }) {
    const quantity = 1;
    await knex("shopping_cart").insert({ user_id, product_id, size, color_name, color_hex, quantity });
  }

  async findProduct({ user_id, size, color_name, color_hex }) {
    return await knex("shopping_cart").where({ user_id, size, color_name, color_hex }).first();
  }

  async findAllProducts(user_id) {
    return await knex("shopping_cart").where({ user_id });
  }

  async incrementQuantity(user_id, product) {
    await knex("shopping_cart").update({ quantity: product.quantity + 1 }).where({ user_id, product_id: product.product_id, size: product.size, color_name: product.color_name, color_hex: product.color_hex });
  }

  async decrementQuantity(user_id, product) {
    await knex("shopping_cart").update({ quantity: product.quantity - 1 }).where({ user_id, product_id: product.product_id, size: product.size, color_name: product.color_name, color_hex: product.color_hex });
  }

  async delete(user_id, product_id, size, color_name, color_hex) {
    await knex("shopping_cart").delete().where({ user_id, product_id, size, color_name, color_hex });
  }
}

module.exports = ShoppingCartRepository;