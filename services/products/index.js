/* eslint-disable no-return-await */
/* eslint-disable camelcase */

const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

// eslint-disable-next-line camelcase
const { products } = require('../../models');

const upsert = (values, where) => products
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return products.create(values);
  });

const findOne = async (key) => await products.findOne({ where: { key } });

const findAll = async () => await products.findAll();

const material = async (params) => {
  const {
    key,
  } = params;

  const where = {
    key,
  };

  try {
    const response = await upsert(params, where);
    return response;
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a product register',
    });
  }
};

const ProductsService = {
  async handle(key) {
    let productResponse = '';

    try {
      if (key) {
        productResponse = await findOne(key);
      } else {
        productResponse = await findAll(key);
      }
    } catch (error) {
      logger.info(error);
      productResponse = {
        error: true,
        message: error.message,
      };
    }

    return productResponse;
  },
  async create(params) {
    let productResponse = '';

    try {
      productResponse = await material(params);
    } catch (error) {
      logger.info(error);
      productResponse = {
        error: true,
        message: error.message,
      };
    }

    return productResponse;
  },
};

module.exports = ProductsService;
