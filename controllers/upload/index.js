const upload = require('../../businesses/upload');
const logger = require('../../utils/logger');

const UploadController = {
  async handle(req, res, next) {
    try {
      const data = await upload.handle(req);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Upload Controller:', e.message);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = UploadController;
