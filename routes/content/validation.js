const Joi = require('joi');
const { throwBadRequest } = require('../../utils/error/bad-request');

module.exports = {
  mip: Joi.object({
    filename: Joi.string().required(),
  }).error((errors) => {
    if (errors[0]) {
      let fields = [];
      if (errors[0].path) {
        fields = errors[0].path;
      }

      // throw bad request with default message
      throwBadRequest({
        fields,
      });
    }
  }),
};
