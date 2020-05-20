/* eslint-disable camelcase */

const logger = require('../../utils/logger');
const { deleteFile } = require('../../utils/file');
const ResponseError = require('../../utils/error/response-error');
const { MaterialsFormatter } = require('../../formatters/materials');

// eslint-disable-next-line camelcase
const { materials } = require('../../models');

const upsert = (values, where) => materials
  .findOne({ where })
  // eslint-disable-next-line consistent-return
  .then(async (obj) => {
    if (obj) { // update
      const update = await obj.update(values);
      return update;
    }
  });

const save = (data) => {
  data.forEach(async (material) => {
    try {
      const key = material.key.toString();
      const where = {
        key,
      };
      await materials.findOrCreate({ where, defaults: material });
    } catch (error) {
      logger.error(error);
      throw new ResponseError({
        code: 0,
        message: 'Error to create a material register',
      });
    }
  });
};

const MaterialsService = {
  async create(parsedData, path) {
    let materialResponse = '';

    try {
      const data = MaterialsFormatter(parsedData);
      materialResponse = data;
      save(data);
      deleteFile(path);
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
