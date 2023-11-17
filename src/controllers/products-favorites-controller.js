const ProductsFavoritesRepository = require("../repositories/products-favorites-repository");

class ProductsFavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id, category } = request.query;
    const productsFavoritesRepository = new ProductsFavoritesRepository();

    await productsFavoritesRepository.create(user_id, product_id, category);

    return response.json();
  }

  async show(request, response) {
    //retorna se o produto está na lista de favoritos;
    const user_id = request.user.id;
    const { product_id } = request.query;
    const productsFavoritesRepository = new ProductsFavoritesRepository();

    const isFav = await productsFavoritesRepository.findByProduct(user_id, product_id);

    if(isFav.length > 0) {
      return response.json(true);
    } else {
      return response.json(false);
    }
  }

  async index(request, response) {
    // retorna toda a lista de favoritos de um usuário;
    const user_id = request.user.id;
    const productsFavoritesRepository = new ProductsFavoritesRepository();

    const products = await productsFavoritesRepository.allFavorites(user_id);

    return response.json(products);
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;
    const productsFavoritesRepository = new ProductsFavoritesRepository();
    
    await productsFavoritesRepository.delete(user_id, product_id);

    return response.json();
  }
}

module.exports = ProductsFavoritesController;