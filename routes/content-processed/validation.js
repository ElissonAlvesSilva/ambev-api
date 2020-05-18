const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../utils/error/bad-request');

module.exports = {
  query: Joi.object().keys({
    startDate: Joi.date(),
    endDate: Joi.date(),
    page: Joi.number(),
    pageSize: Joi.number(),
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
