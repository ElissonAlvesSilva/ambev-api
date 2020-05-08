
const logger = require('../../utils/logger');

const ContentService = require('../../services/content');

const ContentProcessedBusinessess = {
  async handle(req) {
    let response = '';
    let httpCode = 200;


    response = await ContentService.processed();
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to process file',
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

module.exports = ContentProcessedBusinessess;
