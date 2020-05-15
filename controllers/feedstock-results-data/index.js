const feedstock = require('../../businesses/feedstock-results-data');
const logger = require('../../utils/logger');

const FeedstockResultsDataController = {
  async handle(req, res, next) {
    try {
      const data = await feedstock.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Feedstock Results Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = FeedstockResultsDataController;
