const express = require('express');

const errorHandler = require('./middlewares/error-handler');
const { applyMiddlewares } = require('./middlewares/index');
const {
  versionRoute,
  feedstockRoute,
  contentRoute,
  contentProcessedRoute,
  feedstockProcessedRoute,
} = require('./routes');


const app = express();
applyMiddlewares(app);

app.use('/version', versionRoute);

app.use('/ambevapi/feedstock', feedstockRoute);

app.use('/ambevapi/content', contentRoute);

app.use('/ambevapi/content-processed', contentProcessedRoute);

app.use('/ambevapi/feedstock-processed', feedstockProcessedRoute);

app.use(errorHandler);

module.exports = app;
