/* eslint-disable no-return-await */
/* eslint-disable camelcase */

const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

// eslint-disable-next-line camelcase
const { cost_center } = require('../../models');

const upsert = (values, where) => cost_center
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return cost_center.create(values);
  });

const findOne = async (key) => await cost_center.findOne({ where: { key } });

const findAll = async () => await cost_center.findAll();

const costCenter = async (params) => {
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
      message: 'Error to create a cost center register',
    });
  }
};

const CostCenterService = {
  async handle(key) {
    let costCenterResponse = '';

    try {
      if (key) {
        costCenterResponse = await findOne(key);
      } else {
        costCenterResponse = await findAll(key);
      }
    } catch (error) {
      logger.info(error);
      costCenterResponse = {
        error: true,
        message: error.message,
      };
    }

    return costCenterResponse;
  },
  async create(params) {
    let costCenterResponse = '';

    try {
      costCenterResponse = await costCenter(params);
    } catch (error) {
      logger.info(error);
      costCenterResponse = {
        error: true,
        message: error.message,
      };
    }

    return costCenterResponse;
  },
};

module.exports = CostCenterService;
