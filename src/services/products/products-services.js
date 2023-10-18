const AppError = require("../../utils/AppError");

class ProductsServices {
  constructor(productsRepositorys) {
    this.productsRepositorys = productsRepositorys;
  }

  checkIfProductListIsEmpty(productsList) {
    if(productsList.length < 1) {
      throw new AppError("Oops! Produto não encontrado. Explore mais opções em nossa loja!");
    }
  }
}

module.exports = ProductsServices;