
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const fileUpload = require('express-fileupload');
const logger = require('../utils/logger');

const expressPino = expressPinoLogger({ logger });

const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(expressPino);
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.json());
  app.use(fileUpload());
};

module.exports = { applyMiddlewares };
