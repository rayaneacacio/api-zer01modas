const AppError = require("../../utils/AppError");

class ProductsCommentsServices {
  constructor(productsCommentsRepository) {
    this.productsCommentsRepository = productsCommentsRepository;
  }

  async verifyComments(user_id, product_id) {
    const comments = await this.productsCommentsRepository.findAllCommentsOfProduct(product_id);

    comments.map(comment => {
      if(comment.user_id == user_id) {
        throw new AppError("Você já comentou sobre este produto.");
      }
    });
  }
}

module.exports = ProductsCommentsServices;