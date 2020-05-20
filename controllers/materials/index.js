const materials = require('../../businesses/materials');
const logger = require('../../utils/logger');

const MaterialsController = {
  async handle(req, res, next) {
    try {
      const data = await materials.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Materials Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = MaterialsController;
