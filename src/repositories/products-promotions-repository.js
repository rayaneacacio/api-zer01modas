const knex = require("../database/knex/index");

class ProductsPromotionsRepository {
  calculateValue(product_price, percentage) {
    let new_price = (product_price).replace(/[^0-9,]/g, ""); //remove tudo exceto números e vírgulas;
    new_price = parseFloat(new_price.replace(",", ".")); //substitui a vírgula por um ponto;
    new_price = (new_price - (new_price * percentage)/100).toFixed(2); //calcula o desconto;
    new_price = Number(new_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); //formata o número como uma string de moeda brasileira (Real);

    return new_price;
  }

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

  async findByProduct(product_id) {
    return await knex("products_promotions").where({ product_id }).first();
  }

  async update(product_id, percentage, new_price) {
    await knex("products_promotions").update({ percentage, new_price }).where({ product_id });
  }

  async removeDiscount(product_id) {
    await knex("products_promotions").delete().where({ product_id });
  }
}

module.exports = ProductsPromotionsRepository;