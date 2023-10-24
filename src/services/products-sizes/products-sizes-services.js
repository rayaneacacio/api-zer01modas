const AppError = require("../../utils/AppError");

class ProductsSizesServices {
  async checkProducts(products) {
    if(products.length < 1) {
      throw new AppError("Nenhum produto disponível");
    }
  }
}

module.exports = ProductsSizesServices;