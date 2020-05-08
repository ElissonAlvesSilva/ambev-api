const feedstock = require('../../businesses/feedstock-processed');
const logger = require('../../utils/logger');

const FeedstockProcessedController = {
  async handle(req, res, next) {
    try {
      const data = await feedstock.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Feedstock Processed Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = FeedstockProcessedController;
