const users = require('../../businesses/users');
const logger = require('../../utils/logger');

const UsersController = {
  async handle(req, res, next) {
    try {
      const data = await users.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Users Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
  async create(req, res, next) {
    try {
      const data = await users.create(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Users Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = UsersController;
