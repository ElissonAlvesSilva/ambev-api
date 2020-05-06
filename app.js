const express = require('express');

const errorHandler = require('./middlewares/error-handler');
const { applyMiddlewares } = require('./middlewares/index');
const {
  versionRoute,
  uploadRoute,
} = require('./routes');


const app = express();
applyMiddlewares(app);

app.use('/version', versionRoute);

app.use('/ambevapi/upload', uploadRoute);

app.use(errorHandler);

module.exports = app;
