const ProductsRepository = require("../repositories/products-repository");
const ProductsPromotionsRepository = require("../repositories/products-promotions-repository");
const ProductsPromotionsServices = require("../services/products-promotions/products-promotions-services");

class ProductsPromotionsController {
  async create(request, response) {
    const { product_id, percentage } = request.body;
    const productsRepository = new ProductsRepository;
    const productsPromotionsRepository = new ProductsPromotionsRepository;

    const product = await productsRepository.findById(product_id);

    let new_price = productsPromotionsRepository.calculateValue(product.price, percentage);
    productsPromotionsRepository.createDiscount(product_id, percentage, new_price);

    return response.json(new_price);
  }

  async index(request, response) {
    const productsPromotionsRepository = new ProductsPromotionsRepository;

    const promotionsList = await productsPromotionsRepository.allPromotions();
    const products = await productsPromotionsRepository.promotionsProductsList(promotionsList);

    return response.json(products);
  }

   async show(request, response) {
    const { category } = request.query;
    const productsPromotionsRepository = new ProductsPromotionsRepository();
    const productsPromotionsServices = new ProductsPromotionsServices(productsPromotionsRepository);

    const promotionsList = await productsPromotionsRepository.allPromotions();
    let products = await productsPromotionsRepository.promotionsProductsList(promotionsList);

    products = products.filter(promotion => promotion.category == category);

    productsPromotionsServices.checkCategory(products);

    return response.json(products);
  }

  async update(request, response) {
    const { product_id, percentage } = request.body;
    const productsRepository = new ProductsRepository();
    const productsPromotionsRepository = new ProductsPromotionsRepository();

    const product = await productsRepository.findById(product_id);

    let new_price = productsPromotionsRepository.calculateValue(product.price, percentage);

    productsPromotionsRepository.update(product_id, percentage, new_price);

    return response.json(new_price);
  }

  async delete(request, response) {
    const { product_id } = request.body;
    const productsPromotionsRepository = new ProductsPromotionsRepository();

    await productsPromotionsRepository.removeDiscount(product_id);

    return response.json();
  }
}

module.exports = ProductsPromotionsController;