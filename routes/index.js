const versionRoute = require('./version');
const materialsRoute = require('./materials');
const productsRoute = require('./products');
const cbzRoute = require('./cbz');
const cbzPlanRoute = require('./cbz-plan');
const kernelsRoute = require('./kernels');
const costCentersRoute = require('./cost-centers');
const usersRoute = require('./users');

const feedstockRoute = require('./feedstock');
const feedstockProcessedRoute = require('./feedstock-processed');
const feedstockResultsRoute = require('./feedstock-results');
const feedstockResultsDataRoute = require('./feedstock-results-data');
const contentRoute = require('./content');
const contentProcessedRoute = require('./content-processed');
const contentResultsRoute = require('./content-results');
const contentResultsDataRoute = require('./content-results-data');

const routes = {
  versionRoute,
  cbzRoute,
  cbzPlanRoute,
  productsRoute,
  kernelsRoute,
  costCentersRoute,
  usersRoute,
  materialsRoute,
  feedstockRoute,
  contentRoute,
  contentProcessedRoute,
  feedstockProcessedRoute,
  feedstockResultsRoute,
  feedstockResultsDataRoute,
  contentResultsRoute,
  contentResultsDataRoute,
};

module.exports = routes;
