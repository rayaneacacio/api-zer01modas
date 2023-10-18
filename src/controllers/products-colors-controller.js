const knex = require("../database/knex/index");

class ProductsColorsController {
  async create(request, response) {
    const { product_id, color } = request.body;

    await knex("products_colors").insert({ product_id, color });

    return response.json();
  }

  async indexByProduct_id(request, response) {
    //retorna todas as cores de um produto;
    const { product_id } = request.query;

    const colors = await knex("products_colors").where({ product_id });

    return response.json(colors);
  }

  async indexByColor(request, response) {
    //retorna todos os produtos da cor solicitada;
    const { color } = request.query;

    const colors = await knex("products_colors").where({ color });

    return response.json(colors);
  }

  async delete(request, response) {
    const { id } = request.query;

    await knex("products_colors").delete().where({ id });

    return response.json();
  }
}

module.exports = ProductsColorsController;