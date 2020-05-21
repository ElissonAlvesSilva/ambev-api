/* eslint-disable no-return-await */
/* eslint-disable camelcase */

const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

// eslint-disable-next-line camelcase
const { users } = require('../../models');

const upsert = (values, where) => users
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return users.create(values);
  });

const findOne = async (key) => await users.findOne({ where: { key } });

const findAll = async () => await users.findAll();

const user = async (params) => {
  const {
    key,
  } = params;

  const where = {
    key,
  };

  try {
    const response = await upsert(params, where);
    return response;
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a user register',
    });
  }
};

const UsersService = {
  async handle(key) {
    let userResponse = '';

    try {
      if (key) {
        userResponse = await findOne(key);
      } else {
        userResponse = await findAll(key);
      }
    } catch (error) {
      logger.info(error);
      userResponse = {
        error: true,
        message: error.message,
      };
    }

    return userResponse;
  },
  async create(params) {
    let userResponse = '';

    try {
      userResponse = await user(params);
    } catch (error) {
      logger.info(error);
      userResponse = {
        error: true,
        message: error.message,
      };
    }

    return userResponse;
  },
};

module.exports = UsersService;
