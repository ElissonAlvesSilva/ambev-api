/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const md5 = require('md5');
const logger = require('../../utils/logger');

// eslint-disable-next-line camelcase
const { cbz } = require('../../models');

// eslint-disable-next-line max-len
const findOne = async (name_sap) => await cbz.findOne({ where: { name_hash: md5(name_sap) } });

const findAll = async () => await cbz.findAll();

const CBZService = {
  async handle(key) {
    let cbzResponse = '';
    try {
      if (key) {
        cbzResponse = await findOne(key);
      } else {
        cbzResponse = await findAll(key);
      }
    } catch (error) {
      logger.error(error);
      cbzResponse = {
        error: true,
        message: error.message,
      };
    }

    return cbzResponse;
  },
};

module.exports = CBZService;
