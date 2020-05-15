const ContentResultsService = require('../../services/content-results');

const ContentResultsBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { data } = req.body;
    // eslint-disable-next-line camelcase
    const { date, kpi_name } = req.params;
    response = await ContentResultsService.create(data, kpi_name, date);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create content results',
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

module.exports = ContentResultsBusinesses;
