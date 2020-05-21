const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
const CBZPlanController = require('../../controllers/cbz-plan');
// const { authMiddleware } = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

// const joiOptions = {
// allowUnknown: true,
// };
//
// const validateMiddleware = (req, res, next) => {
// const schema = joiSchema;
//
// celebrate(schema, joiOptions)(req, res, next);
// };

router.get(
  '/:year',
  // authMiddleware,
  // validateMiddleware,
  CBZPlanController.handle,
);

router.post(
  '/',
  // authMiddleware,
  // validateMiddleware,
  CBZPlanController.create,
);

module.exports = router;
