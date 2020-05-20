
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
        message: 'Error to get material',
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
