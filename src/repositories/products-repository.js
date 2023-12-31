const knex = require("../database/knex/index");

class ProductsRepository {
  async create(name, category, price, description) {
    const [ product_id ] = await knex("products").insert({ name, category, price, description });
    return product_id;
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

  async findByTitle(name) {
    return await knex("products").whereLike("name", `%${name}%`);
  }

  async update(product, name, category, price, description) {
    const newName = name ?? product.name;
    const newCategory = category ?? product.category;
    let newPrice = product.price;
    const newDescription = description ?? product.description;

    if(price) {
      newPrice = price.replace(",", ".");
      newPrice = Number(newPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    await knex("products").update({ name: newName, category: newCategory, price: newPrice, description: newDescription }).where({ id: product.id });
  }

  async deleteById(id) {
    await knex("products").delete().where({ id });
  }
}

module.exports = ProductsRepository;