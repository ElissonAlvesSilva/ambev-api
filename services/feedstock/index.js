const logger = require('../../utils/logger');

const { deleteFile } = require('../../utils/file');
const { FeedstockFormatter } = require('../../formatters/feedstock');

const FeedstockService = {
  async process(formattedData, path) {
    let feedstockResponse = '';

    try {
      const data = FeedstockFormatter(formattedData);
      feedstockResponse = data;
      deleteFile(path);
    } catch (error) {
      logger.info(error);
      feedstockResponse = {
        error: true,
        message: error.message,
      };
    }

    return feedstockResponse;
  },
};

module.exports = FeedstockService;
