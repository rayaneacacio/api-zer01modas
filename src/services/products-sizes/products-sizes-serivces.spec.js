const ProductsSizesServices = require("./products-sizes-services");
const AppError = require("../../utils/AppError");

describe("ProductsSizesServices", () => {
  it("verifica se existem produtos disponíveis", async() => {
    const productsSizesServices = new ProductsSizesServices();
    const products = [];

    await expect(productsSizesServices.checkProducts(products)).rejects.toEqual(new AppError("Nenhum produto disponível"));
  });
});