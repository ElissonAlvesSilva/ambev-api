const content = require('../../businesses/content');
const logger = require('../../utils/logger');

const ContentController = {
  async handle(req, res, next) {
    try {
      const data = await content.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Content Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ContentController;
