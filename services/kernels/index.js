/* eslint-disable no-return-await */
/* eslint-disable camelcase */

const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

// eslint-disable-next-line camelcase
const { kernel } = require('../../models');

const upsert = (values, where) => kernel
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return kernel.create(values);
  });

const findOne = async (key) => await kernel.findOne({ where: { key } });

const findAll = async () => await kernel.findAll();

const kernels = async (params) => {
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
      message: 'Error to create a kernel register',
    });
  }
};

const KernelsService = {
  async handle(key) {
    let kernelResponse = '';

    try {
      if (key) {
        kernelResponse = await findOne(key);
      } else {
        kernelResponse = await findAll(key);
      }
    } catch (error) {
      logger.info(error);
      kernelResponse = {
        error: true,
        message: error.message,
      };
    }

    return kernelResponse;
  },
  async create(params) {
    let kernelResponse = '';

    try {
      kernelResponse = await kernels(params);
    } catch (error) {
      logger.info(error);
      kernelResponse = {
        error: true,
        message: error.message,
      };
    }

    return kernelResponse;
  },
};

module.exports = KernelsService;
