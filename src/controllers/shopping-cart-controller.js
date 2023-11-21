const ShoppingCartRepository = require("../repositories/shopping-cart-repository");

class ShoppingCartController {
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id, size, color_name, color_hex } = request.body;
    const shoppingCartRepository = new ShoppingCartRepository();

    await shoppingCartRepository.create({ user_id, product_id, size, color_name, color_hex });

    return response.json();
  }

  async show(request, response) {
    const user_id = request.user.id;
    const { size, color_name, color_hex } = request.body;
    const shoppingCartRepository = new ShoppingCartRepository();

    const products = await shoppingCartRepository.findProduct({ user_id, size, color_name, color_hex });

    return response.json(products);
  }

  async index(request, response) {
    const user_id = request.user.id;
    const shoppingCartRepository = new ShoppingCartRepository();

    const products = await shoppingCartRepository.findAllProducts(user_id);

    return response.json(products);
  }

  async update(request, response) {
    //atualiza a quantidade de um produto;
    const user_id = request.user.id;
    const { product, increment, decrement } = request.body;
    const shoppingCartRepository = new ShoppingCartRepository();

    if(increment) {
      await shoppingCartRepository.incrementQuantity(user_id, product);

    } else if(decrement) {
      await shoppingCartRepository.decrementQuantity(user_id, product);
    }

    return response.json();
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { product_id, size, color_name, color_hex } = request.body;
    const shoppingCartRepository = new ShoppingCartRepository();

    await shoppingCartRepository.delete(user_id, product_id, size, color_name, color_hex);

    return response.json();
  }
}

module.exports = ShoppingCartController;