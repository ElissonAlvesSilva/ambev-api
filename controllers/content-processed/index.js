const content = require('../../businesses/content-processed');
const logger = require('../../utils/logger');

const ContentProcessedController = {
  async handle(req, res, next) {
    try {
      const data = await content.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Content Processed Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ContentProcessedController;
