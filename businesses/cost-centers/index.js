
const CostCenterService = require('../../services/cost-centers');

const CostCenterBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { key } = req.params;
    response = await CostCenterService.handle(key);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get cost center',
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
    response = await CostCenterService.create(body);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to cost center kernel',
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

module.exports = CostCenterBusinesses;
