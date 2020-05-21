
const CBZPlanService = require('../../services/cbz-plan');

const CBZPlanBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { year } = req.params;
    response = await CBZPlanService.handle(year);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get cbz plan',
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
    response = await CBZPlanService.create(body);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create cbz plan',
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

module.exports = CBZPlanBusinesses;
