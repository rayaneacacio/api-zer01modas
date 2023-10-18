const knex = require("../database/knex/index");

class ProductsPromotionsRepository {
  async createDiscount(product_id, percentage, new_price) {
    await knex("products_promotions").insert({ product_id, percentage, new_price });
  }

  async allPromotions() {
    return await knex("products_promotions");
  }

  async promotionsProductsList(promotionsList) {
    //para criar a lista de produtos em promocao;
    let products = [];

    for(const promotion of promotionsList) {
      let product = await knex("products").where({ id: promotion.product_id }).first();
      products.push(product);
    }

    return products;
  }

  async update(product_id, percentage, new_price) {
    await knex("products_promotions").update({ percentage, new_price }).where({ product_id });
  }

  async removeDiscount(product_id) {
    await knex("products_promotions").delete().where({ product_id });
  }
}

module.exports = ProductsPromotionsRepository;