const knex = require("../database/knex/index");

class ProductsFavoritesRepository {
  async create(user_id, product_id, category) {
    await knex("products_favorites").insert({ user_id, product_id, category });
  }

  async findByProduct(user_id, product_id) {
    return await knex("products_favorites").where({ user_id, product_id });
  }

  async allFavorites(user_id) {
    return await knex("products_favorites").where({ user_id });
  }

  async delete(user_id, product_id) {
    await knex("products_favorites").delete().where({ user_id, product_id });
  }
}

module.exports = ProductsFavoritesRepository;