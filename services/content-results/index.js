/* eslint-disable camelcase */
const { Op } = require('sequelize');

const logger = require('../../utils/logger');

const ResponseError = require('../../utils/error/response-error');
// eslint-disable-next-line camelcase
const { volume_result } = require('../../models');

const upsert = (values, where) => volume_result
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return volume_result.create(values);
  });

const buildContentResults = async (params, kpi_name, date) => {
  const {
    line,
    kernel,
    product,
  } = params;

  const where = {};

  if (line) {
    where.line = line;
  }

  if (kernel) {
    where.kernel = kernel;
  }

  if (product) {
    where.product = product;
  }

  where.created_at = date;
  where.kpi_name = kpi_name;

  params.kpi_name = kpi_name;

  const response = await upsert(params, where);
  return response;
};

const getResults = async (kpi, startDate, endDate) => {
  let where = {};

  if (startDate && endDate) {
    where = {
      kpi_name: kpi,
      created_at: {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate),
      },
    };
  }

  const response = await volume_result.findAll({ where });
  return response;
};

const ContentResultsService = {
  async create(params, kpi_name, date) {
    let response = '';

    try {
      const data = buildContentResults(params, kpi_name, date);
      response = data;
    } catch (error) {
      logger.info(error);
      response = {
        error: true,
        message: error.message,
      };
    }

    return response;
  },
  async get(kpi, { startDate, endDate }) {
    let response = '';

    try {
      const data = getResults(kpi, startDate, endDate);
      response = data;
    } catch (error) {
      logger.info(error);
      response = {
        error: true,
        message: error.message,
      };
    }

    return response;
  },
};

module.exports = ContentResultsService;
