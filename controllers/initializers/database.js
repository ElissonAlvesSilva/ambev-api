const { sequelize } = require('../../models');
const logger = require('../../utils/logger');
const { MAX_RETRY_DATABASE } = require('../../utils/constants');

const initDb = async (_retry = 0) => {
  let retry = _retry;
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    return true;
  } catch (error) {
    logger.info(error);
    logger.info('Unable to connect to the database:', error);
    if (retry < MAX_RETRY_DATABASE) {
      logger.info(`Retrying to connect to database. Retry count: ${retry}`);
      retry += 1;
      setTimeout(() => initDb(sequelize, retry), 20000);
    }
    return false;
  }
};

module.exports = initDb;
