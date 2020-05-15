
const ContentResultsService = require('../../services/content-results');

const ContentResultsDataBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    // eslint-disable-next-line camelcase
    const { kpi_name } = req.params;
    const { query } = req;
    response = await ContentResultsService.get(kpi_name, query);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to find content results',
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

module.exports = ContentResultsDataBusinesses;
