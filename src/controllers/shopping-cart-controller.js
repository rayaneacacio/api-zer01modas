const knex = require("../database/knex/index");
const ShoppingCartRepository = require("../repositories/shopping-cart-repository");

class ShoppingCartController {
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id, size, color_name, color_hex } = request.body;
    const shoppingCartRepository = new ShoppingCartRepository();

    await shoppingCartRepository.create({ user_id, product_id, size, color_name, color_hex });

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;
    const shoppingCartRepository = new ShoppingCartRepository();

    const products = await shoppingCartRepository.findAllProducts(user_id);

    return response.json(products);
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;
    const shoppingCartRepository = new ShoppingCartRepository();

    await shoppingCartRepository.delete(user_id, product_id);

    return response.json();
  }
}

module.exports = ShoppingCartController;