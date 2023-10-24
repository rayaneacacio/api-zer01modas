class ProductsCommentsRepositoryInMemory {
  comments = [
    {
      id: 1,
      product_id: 1,
      user_id: 1,
      comment: "comment test",
      score: 1
    }
  ]

  async findAllCommentsOfProduct(product_id) {
    return this.comments;
  }
}

module.exports = ProductsCommentsRepositoryInMemory;