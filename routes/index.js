const versionRoute = require('./version');
const feedstockRoute = require('./feedstock');
const contentRoute = require('./content');
const contentProcessedRoute = require('./content-processed');
const feedstockProcessedRoute = require('./feedstock-processed');

const routes = {
  versionRoute,
  feedstockRoute,
  contentRoute,
  contentProcessedRoute,
  feedstockProcessedRoute,
};

module.exports = routes;
