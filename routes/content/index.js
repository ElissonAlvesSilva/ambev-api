const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
const ContentController = require('../../controllers/content');
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
  ContentController.handle,
);

module.exports = router;
