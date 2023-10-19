const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");

class ProductsSizesController {
  async create(request, response) {
    const { product_id, color_id, sizes } = request.body;

    const sizesInsert = sizes.map(size => {
      return {
        product_id,
        color_id,
        size
      }
    });

    await knex("products_sizes").insert(sizesInsert);

    return response.json();
  }

  async indexBySize(request, response) {
    //retorna todos os produtos de um tamanho;
    const { size } = request.query;

    const list = await knex("products_sizes").where({ size });
    
    const products = [];
    for(const item of list) {
      let product = await knex("products").where({ id: item.product_id }).first();

      if(!products.some(p => p.id == product.id)) {
        products.push(product);
      }
    };

    if(products.length < 1) {
      throw new AppError("Nenhum produto disponível");
    }

    return response.json(products);
  }

  async indexByColor(request, response) {
    //retorna todos os tamanhos de uma cor do produto;
    const { product_id, color_id } = request.query;

    const sizes = await knex("products_sizes").where({ product_id, color_id });

    return response.json(sizes);
  }

  async delete(request, response) {
    const { color_id } = request.query;

    await knex("products_sizes").delete().where({ color_id });

    return response.json();
  }
}

module.exports = ProductsSizesController;