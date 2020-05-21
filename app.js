const express = require('express');

const errorHandler = require('./middlewares/error-handler');
const { applyMiddlewares } = require('./middlewares/index');
const {
  versionRoute,
  cbzRoute,
  cbzPlanRoute,
  productsRoute,
  materialsRoute,
  feedstockRoute,
  feedstockProcessedRoute,
  feedstockResultsRoute,
  feedstockResultsDataRoute,
  contentRoute,
  contentProcessedRoute,
  contentResultsRoute,
  contentResultsDataRoute,
  kernelsRoute,
  costCentersRoute,
  usersRoute,
} = require('./routes');


const app = express();
applyMiddlewares(app);

app.use('/version', versionRoute);

app.use('/ambevapi/materials', materialsRoute);

app.use('/ambevapi/cbz', cbzRoute);

app.use('/ambevapi/cbz-plan', cbzPlanRoute);

app.use('/ambevapi/products', productsRoute);

app.use('/ambevapi/kernels', kernelsRoute);

app.use('/ambevapi/cost-centers', costCentersRoute);

app.use('/ambevapi/users', usersRoute);

app.use('/ambevapi/feedstock', feedstockRoute);

app.use('/ambevapi/feedstock-processed', feedstockProcessedRoute);

app.use('/ambevapi/feedstock-results', feedstockResultsRoute);

app.use('/ambevapi/feedstock-results-data', feedstockResultsDataRoute);

app.use('/ambevapi/content', contentRoute);

app.use('/ambevapi/content-processed', contentProcessedRoute);

app.use('/ambevapi/content-results', contentResultsRoute);

app.use('/ambevapi/content-results-data', contentResultsDataRoute);


app.use(errorHandler);

module.exports = app;
