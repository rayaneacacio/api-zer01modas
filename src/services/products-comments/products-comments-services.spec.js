const ProductsCommentsRepositoryInMemory = require("../../repositoriesInMemory/products-comments-repositoryInMemory");
const ProductsCommentsServices = require("./products_comments-services");
const AppError = require("../../utils/AppError");

describe("ProductsCommentsServices", () => {
  let productsCommentsRepositoryInMemory = null;
  let productsCommentsServices = null;

  beforeEach(() => {
    productsCommentsRepositoryInMemory = new ProductsCommentsRepositoryInMemory();
    productsCommentsServices = new ProductsCommentsServices(productsCommentsRepositoryInMemory);
  });

  it("verifica se o usuário já fez um comentário sobre o produto", async() => {
    const user_id = 1;
    const product_id = 1;

    console.log(user_id)

    await expect(productsCommentsServices.verifyComments(user_id, product_id)).rejects.toEqual(new AppError("Você já comentou sobre este produto."));
  });
});