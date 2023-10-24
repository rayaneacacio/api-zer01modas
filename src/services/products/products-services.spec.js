const ProductsServices = require("./products-services");
const AppError = require("../../utils/AppError");

describe("ProductsServices", () => {
  it("verifica se o produto pesquisado existe", async() => {
    const productsServices = new ProductsServices();
    const products = [];

    await expect(productsServices.checkIfProductListIsEmpty(products)).rejects.toEqual(new AppError("Oops! Produto não encontrado. Explore mais opções em nossa loja!"));
  });
});