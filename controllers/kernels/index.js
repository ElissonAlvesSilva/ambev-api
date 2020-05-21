const kernels = require('../../businesses/kernels');
const logger = require('../../utils/logger');

const KernelsController = {
  async handle(req, res, next) {
    try {
      const data = await kernels.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Kernels Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
  async create(req, res, next) {
    try {
      const data = await kernels.create(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Kernels Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = KernelsController;
