const ProductsRepository = require("../repositories/products-repository");
const ProductsServices = require("../services/products/products-services");

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

  // async show(request, response) {
  //   const { id } = request.query;
  //   const productsRepository = new ProductsRepository();

  //   const product = await productsRepository.findById(id);
    
  //   return response.json(product);
  // }

  async show(request, response) {
    const { name, id } = request.body;
    const productsRepository = new ProductsRepository();
    const productsServices = new ProductsServices(productsRepository);
    let productsList = [];

    try {
      if(name) {
        productsList = await productsRepository.findByTitle(name);

        if(productsList.length == 0) {
          await productsServices.checkIfProductListIsEmpty(productsList);
        }

      } else {
        productsList = await productsRepository.findById(id);
      }
      
      return response.json(productsList);

    } catch(error) {
      console.log(error);

      return response.status(500).json(error);
    }
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