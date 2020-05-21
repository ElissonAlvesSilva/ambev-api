
const ProductsService = require('../../services/products');

const ProductsBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { year } = req.params;
    response = await ProductsService.handle(year);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get product',
        error: response.message,
      };
      return {
        httpCode,
        response,
      };
    }

    return {
      httpCode,
      response,
    };
  },
  async create(req) {
    let httpCode = 200;
    let response = '';

    const { body } = req;
    response = await ProductsService.create(body);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create product',
        error: response.message,
      };
      return {
        httpCode,
        response,
      };
    }

    return {
      httpCode,
      response,
    };
  },
};

module.exports = ProductsBusinesses;
