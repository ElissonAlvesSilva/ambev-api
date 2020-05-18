const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../utils/error/bad-request');

module.exports = {
  query: Joi.object().keys({
    reprocess: Joi.boolean(),
    dates: Joi.string(),
  }).error((errors) => {
    if (errors[0]) {
      let fields = [];
      if (errors[0].path) {
        fields = errors[0].path;

        // throw bad request with default message
        throwBadRequest({
          fields,
        });
      }
    }
  }),
};
