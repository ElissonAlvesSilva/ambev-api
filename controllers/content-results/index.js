const content = require('../../businesses/content-results');
const logger = require('../../utils/logger');

const ContentResultsController = {
  async handle(req, res, next) {
    try {
      const data = await content.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Content Results Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ContentResultsController;
