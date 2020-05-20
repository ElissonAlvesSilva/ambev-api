const cbz = require('../../businesses/cbz');
const logger = require('../../utils/logger');

const CBZController = {
  async handle(req, res, next) {
    try {
      const data = await cbz.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('CBZ Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = CBZController;
