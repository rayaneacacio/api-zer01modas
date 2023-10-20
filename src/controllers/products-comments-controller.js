const ProductsCommentsRepository = require("../repositories/products-comments-repository");
const ProductsCommentsServices = require("../services/products-comments/products_comments-services");

class ProductsCommentsController {
  async create(request, response) {
    const user_id = request.user.id;
    const { product_id, comment, score } = request.body;
    const productsCommentsRepository = new ProductsCommentsRepository();
    const productsCommentsServices = new ProductsCommentsServices(productsCommentsRepository);

    await productsCommentsServices.verifyComments(user_id, product_id);

    await productsCommentsRepository.create(user_id, product_id, comment, score);
    await productsCommentsRepository.calculateAverageScore(product_id);

    return response.json();
  }

  async indexByProducts(request, response) {
    //retorna todos os comentarios de um produto;
    const { product_id } = request.query;
    const productsCommentsRepository = new ProductsCommentsRepository();

    const comments = await productsCommentsRepository.findAllCommentsOfProduct(product_id);

    return response.json(comments);
  }

  async indexByUser(request, response) {
    //retorna todos os comentarios de um usuario;
    const user_id  = request.user.id;
    const productsCommentsRepository = new ProductsCommentsRepository();

    const comments = await productsCommentsRepository.findAllCommentsOfUser(user_id);

    return response.json(comments);
  }

  async update(request, response) {
    const user_id = request.user.id;
    const { product_id, comment, score } = request.body;
    const productsCommentsRepository = new ProductsCommentsRepository();

    await productsCommentsRepository.update(user_id, product_id, comment, score);
    await productsCommentsRepository.calculateAverageScore(product_id);

    return response.json();
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { product_id } = request.query;
    const productsCommentsRepository = new ProductsCommentsRepository();

    await productsCommentsRepository.delete(user_id, product_id);

    return response.json();
  }
}

module.exports = ProductsCommentsController;