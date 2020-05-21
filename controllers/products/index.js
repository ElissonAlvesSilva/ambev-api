const products = require('../../businesses/products');
const logger = require('../../utils/logger');

const ProductsController = {
  async handle(req, res, next) {
    try {
      const data = await products.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Products Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
  async create(req, res, next) {
    try {
      const data = await products.create(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Products Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ProductsController;
