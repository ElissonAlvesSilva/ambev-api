const versionRoute = require('./version');
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
