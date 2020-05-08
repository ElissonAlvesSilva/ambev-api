const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
// eslint-disable-next-line max-len
const FeedstockProcessedController = require('../../controllers/feedstock-processed');
// const { authMiddleware } = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

// const joiOptions = {
//   allowUnknown: true,
// };

// const validateMiddleware = (req, res, next) => {
//   const schema = joiSchema;

//   celebrate(schema, joiOptions)(req, res, next);
// };

router.post(
  '/',
  // authMiddleware,
  // validateMiddleware,
  FeedstockProcessedController.handle,
);

module.exports = router;
