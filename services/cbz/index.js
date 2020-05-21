/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const md5 = require('md5');
const logger = require('../../utils/logger');
const ResponseError = require('../../utils/error/response-error');

// eslint-disable-next-line camelcase
const { cbz } = require('../../models');

// eslint-disable-next-line max-len
const findOne = async (name_sap) => await cbz.findOne({ where: { name_hash: md5(name_sap) } });

const findAll = async () => await cbz.findAll();

const upsert = (values, where) => cbz
  .findOne({ where })
  .then((obj) => {
    if (obj) { // update
      return obj.update(values);
    }
    // insert
    return cbz.create(values);
  });


const CBZ = async (params) => {
  const {
    name_sap,
  } = params;

  const where = {};
  if ('id' in params) {
    where.id = params.id;
  }

  where.name_hash = md5(name_sap);

  params.name_hash = md5(name_sap);
  try {
    const response = await upsert(params, where);
    return response;
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a cbz register',
    });
  }
};


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
  async create(params) {
    let cbzResponse = '';
    try {
      cbzResponse = await CBZ(params);
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
