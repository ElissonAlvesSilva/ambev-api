const { Sequelize } = require('sequelize');
const logger = require('../../utils/logger');
const conf = require('../../utils/config');
const { MAX_RETRY_DATABASE } = require('../../utils/constants');

const host = conf.get('db:host');
const dialect = conf.get('db:dialect');
const port = conf.get('db:port');
const database = conf.get('db:database');
const username = conf.get('db:auth:user');
const password = conf.get('db:auth:password');


const connected = async (sequelize, _retry) => {
  let retry = _retry;
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    return true;
  } catch (error) {
    logger.info('Unable to connect to the database:', error);
    if (retry < MAX_RETRY_DATABASE) {
      logger.info(`Retrying to connect to database. Retry count: ${retry}`);
      retry += 1;
      setTimeout(() => connected(sequelize, retry), 20000);
    }
    return false;
  }
};

const initDb = async () => {
  const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    port,
  });

  await connected(sequelize, 0);
};

module.exports = initDb;
