
const UsersService = require('../../services/users');

const UsersBusinesses = {
  async handle(req) {
    let httpCode = 200;
    let response = '';

    const { year } = req.params;
    response = await UsersService.handle(year);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to get user',
        error: response.message,
      };
      return {
        httpCode,
        response,
      };
    }

    return {
      httpCode,
      response,
    };
  },
  async create(req) {
    let httpCode = 200;
    let response = '';

    const { body } = req;
    response = await UsersService.create(body);
    if (response.error) {
      httpCode = 500;
      response = {
        message: 'Error to create user',
        error: response.message,
      };
      return {
        httpCode,
        response,
      };
    }

    return {
      httpCode,
      response,
    };
  },
};

module.exports = UsersBusinesses;
