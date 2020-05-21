
const CBZService = require('../../services/cbz');

const CBZBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { key } = req.params;
    response = await CBZService.handle(key);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get cbz',
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
    response = await CBZService.create(body);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create cbz',
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

module.exports = CBZBusinesses;
