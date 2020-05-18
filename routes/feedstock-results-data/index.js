const { Router } = require('express');
const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
// eslint-disable-next-line max-len
const FeedstockResultsDataController = require('../../controllers/feedstock-results-data');
// const { authMiddleware } = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

const validateMiddleware = (req, res, next) => {
  const schema = joiSchema;

  celebrate(schema, joiOptions)(req, res, next);
};

router.get(
  '/:kpi_name',
  // authMiddleware,
  validateMiddleware,
  FeedstockResultsDataController.handle,
);

module.exports = router;
