const ProductsRepository = require("../repositories/products-repository");
const ProductsServices = require("../services/products/products-services");

class ProductsController {
  async create(request, response) {
    const { name, category, price, description, score } = request.body;
    const productsRepository = new ProductsRepository();

    const product_id = await productsRepository.create(name, category, price, description);

    if(score) {
      await productsRepository.patchScore(product_id, score);
    }

    return response.json();
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
    const { name } = request.body;
    const productsRepository = new ProductsRepository();

    const productsList = await productsRepository.findByTitle(name);

    const productsServices = new ProductsServices(productsRepository);
    productsServices.checkIfProductListIsEmpty(productsList);

    return response.json(productsList);
  }

  async update(request, response) {
    const { id } = request.query;
    const { name, category, price, description, score } = request.body;
    const productsRepository = new ProductsRepository();

    const product = await productsRepository.findById(id);
    await productsRepository.update(product, name, category, price, description, score);

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