const knex = require("../database/knex/index");

class ProductsCommentsImagesRepository {
  async insert(user_id, product_id, image) {
    await knex("products_comments_images").insert({ product_id, user_id, image });
  }

  async findImgs(user_id, product_id) {
    return await knex("products_comments_images").where({ user_id, product_id });
  }

  async findById(id) {
    return await knex("products_comments_images").where({ id }).first();
  }

  async delete(id) {
    await knex("products_comments_images").delete().where({ id });
  }
}

module.exports = ProductsCommentsImagesRepository;