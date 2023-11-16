const ProductsRepository = require("../repositories/products-repository");

class ProductsController {
  async create(request, response) {
    const { name, category, price, description } = request.body;
    const productsRepository = new ProductsRepository();

    let real = parseFloat(price.replace(",", "."));
    real = Number(real).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const product_id = await productsRepository.create(name, category, real, description);

    return response.json(product_id);
  }

  async index(request, response) {
    const { category } = request.query;
    const productsRepository = new ProductsRepository();
    let products = null;

    if(category) {
      products = await productsRepository.findByCategory(category);
    } else {
      products = await productsRepository.allProducts();
    }
    
    return response.json(products);
  }

  async show(request, response) {
    const { name, id } = request.body;
    const productsRepository = new ProductsRepository();
    let productsList = [];

    if(name) {
      productsList = await productsRepository.findByTitle(name);

    } else {
      const product = await productsRepository.findById(id);
      productsList.push(product);
    }
      
    return response.json(productsList);
  }

  async update(request, response) {
    const { id } = request.query;
    const { name, category, price, description } = request.body;
    const productsRepository = new ProductsRepository();

    const product = await productsRepository.findById(id);
    await productsRepository.update(product, name, category, price, description);

    return response.json();
  }

  async delete(request, response) {
    const { products } = request.body;
    const productsRepository = new ProductsRepository();

    for(let id of products) {
      await productsRepository.deleteById(id);
    }

    return response.json();
  }
}

module.exports = ProductsController;