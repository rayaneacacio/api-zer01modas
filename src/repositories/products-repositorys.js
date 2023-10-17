const knex = require("../database/knex/index");

class ProductsRepository {
  async create(name, category, price, description) {
    const [ product_id ] = await knex("products").insert({ name, category, price, description });
    return product_id;
  }

  async patchScore(id, score) {
    await knex("products").update({ score }).where({ id });
  }

  async allProducts() {
    return await knex("products");
  }

  async findByCategory(category) {
    return await knex("products").where({ category });
  }

  async findById(id) {
    return await knex("products").where({ id }).first();
  }

  async update(product, name, category, price, description, score) {
    const newName = name ?? product.name;
    const newCategory = category ?? product.category;
    const newPrice = price ?? product.price;
    const newDescription = description ?? product.description;
    const newScore = score ?? product.score;

    await knex("products").update({ name: newName, category: newCategory, price: newPrice, description: newDescription, score: newScore }).where({ id: product.id });
  }

  async deleteById(id) {
    await knex("products").delete().where({ id });
  }
}

module.exports = ProductsRepository;