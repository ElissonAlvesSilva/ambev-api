/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const moment = require('moment');

const logger = require('../../utils/logger');

const ResponseError = require('../../utils/error/response-error');
const { deleteFile } = require('../../utils/file');
const { getConnection } = require('../../utils/connection-models');
const { replaceCurrency } = require('../../utils/strings');
const { ContentFormatter } = require('../../formatters/content');

const processKernel = async (key) => {
  const kernels = getConnection('kernel');

  if (!key) {
    return key;
  }

  // eslint-disable-next-line no-unused-vars
  const kernel = await kernels.findOne({
    raw: true,
    nest: true,
    where: {
      key,
    },
  });

  if (!kernel) {
    return null;
  }

  const { id } = kernel;
  return id;
};

const processProduct = async (key) => {
  const products = getConnection('products');

  if (!key) {
    return key;
  }

  // eslint-disable-next-line no-unused-vars
  const product = await products.findOne({
    raw: true,
    nest: true,
    where: {
      key,
    },
  });

  if (!product) {
    return null;
  }

  const { id } = product;
  return id;
};

const buildContent = async ({
  kernel,
  line,
  version,
  created_at,
  product,
  volume_pc,
  um,
  qty_amount,
  volume_hl,
  resource,
}) => {
  let createdAt = '';
  let kernelId = '';
  let productId = '';
  const volumePc = parseFloat(replaceCurrency(volume_pc));
  const volumeHl = parseFloat(replaceCurrency(volume_hl));
  const qtyAmount = parseFloat(replaceCurrency(qty_amount));
  const volumes = getConnection('volume');


  if (created_at) {
    createdAt = moment(created_at, 'DD/MM/YYYY');
    createdAt = createdAt.format('YYYY-MM-DD');
  } else {
    createdAt = moment(new Date(), 'DD/MM/YYYY');
    createdAt = createdAt.format('YYYY-MM-DD');
  }

  try {
    kernelId = await processKernel(kernel);
    productId = await processProduct(product);

    if (!kernelId || !productId) return;
  } catch (error) {
    logger.error(error);
  }

  try {
    const volumeRequest = {
      kernel_id: kernelId,
      line,
      version,
      created_at: createdAt,
      product_id: productId,
      volume_pc: volumePc,
      um,
      qty_amount: qtyAmount,
      volume_hl: volumeHl,
      resource,
    };
    volumes.create(volumeRequest);
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a volume register',
    });
  }
};

const save = (data) => {
  if (!data) {
    throw new ResponseError({
      code: 0,
      message: 'Empty data to process',
    });
  }

  data.forEach((item) => {
    buildContent(item);
  });
};

const reprocess = async (data, dates) => {
  const volumes = getConnection('volume');

  if (!dates.length) {
    return null;
  }

  const removedDates = [];
  dates.forEach((date) => {
    let createdAt = '';
    createdAt = moment(date, 'DD/MM/YYYY');
    createdAt = createdAt.format('YYYY-MM-DD');
    removedDates.push(createdAt);
  });
  let filteredData = '';

  // eslint-disable-next-line max-len
  const response = await volumes.destroy({ where: { created_at: removedDates } });

  if (response > 0) {
    filteredData = data.filter((item) => {
      const { created_at } = item;
      let parsedCreateAt = moment(created_at, 'DD/MM/YYYY');
      parsedCreateAt = parsedCreateAt.format('YYYY-MM-DD');

      if (removedDates.includes(parsedCreateAt)) {
        return item;
      }
    });

    await save(filteredData);
  }

  if (response === 0) {
    throw new ResponseError({
      code: 0,
      message: 'Empty data to reprocess',
    });
  }

  return filteredData;
};

const ContentService = {
  async process(formattedData, path) {
    let contentResponse = '';

    try {
      const data = ContentFormatter(formattedData);
      contentResponse = data;
      save(data);
      deleteFile(path);
    } catch (error) {
      logger.info(error);
      contentResponse = {
        error: true,
        message: error.message,
      };
    }

    return contentResponse;
  },
  async reProcess(formattedData, path, dates) {
    let contentResponse = '';

    try {
      const data = ContentFormatter(formattedData);
      contentResponse = await reprocess(data, dates);
      deleteFile(path);
    } catch (error) {
      logger.info(error);
      contentResponse = {
        error: true,
        message: error.message,
      };
    }

    return contentResponse;
  },
  async processed() {
    let contentResponse = '';

    try {
      const volumes = getConnection('volume');
      const products = getConnection('products');
      const Products = products.hasMany(volumes);
      contentResponse = await volumes.findAll({
        include: [
          { model: Products },
        ],
      });
    } catch (error) {
      logger.info(error);
      contentResponse = {
        error: true,
        message: error.message,
      };
    }

    return contentResponse;
  },
};

module.exports = ContentService;
