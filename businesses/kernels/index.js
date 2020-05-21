
const KernelsService = require('../../services/kernels');

const KernelsBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { key } = req.params;
    response = await KernelsService.handle(key);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get kernel',
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
    response = await KernelsService.create(body);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create kernel',
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

module.exports = KernelsBusinesses;
