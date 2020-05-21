const costCenter = require('../../businesses/cost-centers');
const logger = require('../../utils/logger');

const CostCenterController = {
  async handle(req, res, next) {
    try {
      const data = await costCenter.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('costCenter Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
  async create(req, res, next) {
    try {
      const data = await costCenter.create(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('costCenter Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = CostCenterController;
