const express = require('express');

const errorHandler = require('./middlewares/error-handler');
const { applyMiddlewares } = require('./middlewares/index');
const {
  versionRoute,
  feedstockRoute,
  contentRoute,
} = require('./routes');


const app = express();
applyMiddlewares(app);

app.use('/version', versionRoute);

app.use('/ambevapi/feedstock', feedstockRoute);

app.use('/ambevapi/content', contentRoute);

app.use(errorHandler);

module.exports = app;
