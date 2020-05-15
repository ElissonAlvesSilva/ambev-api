const FeedstockResultsService = require('../../services/feedstock-results');

const FeedstockResultsBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { data } = req.body;
    // eslint-disable-next-line camelcase
    const { date, kpi_name } = req.params;
    response = await FeedstockResultsService.create(data, kpi_name, date);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create feedstock results',
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

module.exports = FeedstockResultsBusinesses;
