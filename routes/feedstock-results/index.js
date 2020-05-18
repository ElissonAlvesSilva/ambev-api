const { Router } = require('express');
const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
// eslint-disable-next-line max-len
const FeedstockResultsController = require('../../controllers/feedstock-results');
// const { authMiddleware } = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

const validateMiddleware = (req, res, next) => {
  const schema = joiSchema;

  celebrate(schema, joiOptions)(req, res, next);
};

router.post(
  '/:kpi_name/:date',
  // authMiddleware,
  validateMiddleware,
  FeedstockResultsController.handle,
);

module.exports = router;
