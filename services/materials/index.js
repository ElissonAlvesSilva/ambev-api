/* eslint-disable no-return-await */
/* eslint-disable camelcase */

const logger = require('../../utils/logger');

// eslint-disable-next-line camelcase
const { materials } = require('../../models');

const findOne = async (key) => await materials.findOne({ where: { key } });

const findAll = async () => await materials.findAll();

const MaterialsService = {
  async handle(key) {
    let materialResponse = '';

    try {
      if (key) {
        materialResponse = await findOne(key);
      } else {
        materialResponse = await findAll(key);
      }
    } catch (error) {
      logger.info(error);
      materialResponse = {
        error: true,
        message: error.message,
      };
    }

    return materialResponse;
  },
};

module.exports = MaterialsService;
