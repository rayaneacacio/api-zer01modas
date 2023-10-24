const ProductsPromotionsServices = require("./products-promotions-services");
const AppError = require("../../utils/AppError");

describe("ProductsPromotionsServices", () => {
  it("verifica se existem produtos em promoçao disponíveis na categoria", async() => {
    const productsPromotionsServices = new ProductsPromotionsServices();
    const products = [];

    await expect(productsPromotionsServices.checkCategory(products)).rejects.toEqual(new AppError("Parece que não temos promoções disponíveis na categoria que você escolheu. Que tal dar uma olhada em nossas outras categorias?"));
  });
});