const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
const KernelsController = require('../../controllers/kernels');
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
  '/',
  // authMiddleware,
  // validateMiddleware,
  KernelsController.handle,
);

router.post(
  '/',
  // authMiddleware,
  // validateMiddleware,
  KernelsController.create,
);

module.exports = router;
