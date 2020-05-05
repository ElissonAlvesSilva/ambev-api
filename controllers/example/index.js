const example = require('../../businesses/businesses-example');
const logger = require('../../utils/logger');

const ExampleController = {
  async handle(req, res, next) {
    try {
      req.query.host = req.headers.host;
      const data = await example.handle(req.query);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Search Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ExampleController;
