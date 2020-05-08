require('dotenv').config();
const conf = require('./utils/config');

const port = conf.get('port');
const host = conf.get('host');
const environment = conf.get('environment');

const initialize = require('./controllers/initializers');
const logger = require('./utils/logger');


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.TZ = conf.get('timezone');

initialize().then(() => {
  // eslint-disable-next-line global-require
  const app = require('./app');
  app.listen(port, host, (err) => {
    if (err) {
      logger.error({ error: err });
      return;
    }

    if (process.send) {
      process.send({ status: 'listening' });
    }

    logger.info(`AmBev API (${environment}) listening at ${port}`);
  });
});
