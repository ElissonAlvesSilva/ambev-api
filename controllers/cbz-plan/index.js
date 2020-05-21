const cbz = require('../../businesses/cbz-plan');
const logger = require('../../utils/logger');

const CBZPlanController = {
  async handle(req, res, next) {
    try {
      const data = await cbz.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('CBZ Plan Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
  async create(req, res, next) {
    try {
      const data = await cbz.create(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('CBZ Plan Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = CBZPlanController;
