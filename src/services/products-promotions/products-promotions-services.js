const AppError = require("../../utils/AppError");

class ProductsPromotionsServices {
  async checkCategory(products) {
    if(products.length < 1) {
      throw new AppError("Parece que não temos promoções disponíveis na categoria que você escolheu. Que tal dar uma olhada em nossas outras categorias?");
    }
  }
}

module.exports = ProductsPromotionsServices;