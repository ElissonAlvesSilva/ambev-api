/* eslint-disable camelcase */
const logger = require('../../utils/logger');

const { cbz_plan } = require('../../models');
const ResponseError = require('../../utils/error/response-error');

const upsert = (values, where) => cbz_plan
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return cbz_plan.create(values);
  });

const cbzPlan = async (params) => {
  const {
    year,
    month,
    um,
    cbz_id,
    qty_plan,
    price_plan,
    year_plan,
  } = params;

  const where = {
    year,
    month,
    cbz_id,
  };

  const data = {
    year,
    month,
    um,
    qty_plan,
    price_plan,
    year_plan,
    cbz_id,
  };

  try {
    const response = await upsert(data, where);
    return response;
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a cbz plan register',
    });
  }
};

const CBZPlanService = {
  async handle(year) {
    let cbzPlanResponse = '';
    try {
      cbzPlanResponse = await cbz_plan.findAll({ where: { year } });
    } catch (error) {
      logger.error(error);
      cbzPlanResponse = {
        error: true,
        message: error.message,
      };
    }

    return cbzPlanResponse;
  },
  async create(params) {
    let cbzPlanResponse = '';
    try {
      cbzPlanResponse = await cbzPlan(params);
    } catch (error) {
      logger.error(error);
      cbzPlanResponse = {
        error: true,
        message: error.message,
      };
    }

    return cbzPlanResponse;
  },
};

module.exports = CBZPlanService;
