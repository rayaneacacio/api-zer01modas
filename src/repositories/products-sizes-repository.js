const knex = require("../database/knex/index");

class ProductsSizesRepository {
  async insert(sizes) {
    await knex("products_sizes").insert(sizes);
  }

  async findAllBySize(size) {
    const list = await knex("products_sizes").where({ size });
    const products = [];

    for(const item of list) {
      let product = await knex("products").where({ id: item.product_id }).first();

      if(!products.some(p => p.id == product.id)) {
        products.push(product);
      }
    };

    return products;
  }

  async findByColor(product_id, color_id) {
    return await knex("products_sizes").where({ product_id, color_id });
  }

  async deleteAllByColor(color_id) {
    await knex("products_sizes").delete().where({ color_id });
  }
}

module.exports = ProductsSizesRepository;