const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../utils/error/bad-request');

module.exports = {
  body: Joi.object().keys({
    data: Joi.object().required(),
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
  params: Joi.object().keys({
    kpi_name: Joi.string().required(),
    date: Joi.date().required(),
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
