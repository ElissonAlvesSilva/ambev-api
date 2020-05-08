/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const moment = require('moment');

const logger = require('../../utils/logger');

const ResponseError = require('../../utils/error/response-error');
const { deleteFile } = require('../../utils/file');
const { getConnection } = require('../../utils/connection-models');
const { replaceCurrency } = require('../../utils/strings');
const { FeedstockFormatter } = require('../../formatters/feedstock');
const {
  kernel: kernels,
  materials,
  users,
  mip,
  cost_center: costCenters,
} = require('../../models');


const processConstCenter = async (key, kernel_id) => {
  if (!key) {
    return key;
  }

  // eslint-disable-next-line no-unused-vars
  const costCenter = await costCenters.findOne({
    raw: true,
    nest: true,
    where: {
      key,
      kernel_id,
    },
  });

  if (!costCenter) {
    return null;
  }

  const { id } = costCenter;
  return id;
};


const processKernel = async (key) => {
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

const processUser = async (key) => {
  if (!key) {
    return key;
  }

  // eslint-disable-next-line no-unused-vars
  const user = await users.findOne({
    raw: true,
    nest: true,
    where: {
      key,
    },
  });

  if (!user) {
    return null;
  }

  const { id } = user;
  return id;
};

const processMaterial = async (key) => {
  if (!key) {
    return key;
  }

  // eslint-disable-next-line no-unused-vars
  const material = await materials.findOne({
    raw: true,
    nest: true,
    where: {
      key,
    },
  });

  if (!material) {
    return null;
  }

  const { id } = material;
  return id;
};

const buildFeedstock = async ({
  doc,
  cost_control,
  kernel,
  cost_center,
  material,
  created_at,
  user,
  uml,
  value_obj,
  qty_amount,
}) => {
  let materialId = '';
  let kernelId = '';
  let userId = '';
  let costCenterId = '';
  let createdAt = '';
  const valueObj = parseFloat(replaceCurrency(value_obj));
  const qtyAmount = parseFloat(replaceCurrency(qty_amount));

  if (created_at) {
    createdAt = moment(created_at, 'DD/MM/YYYY');
    createdAt = createdAt.format('YYYY-MM-DD');
  } else {
    createdAt = moment(new Date(), 'DD/MM/YYYY');
    createdAt = createdAt.format('YYYY-MM-DD');
  }

  if (material) {
    materialId = await processMaterial(material);
  }

  try {
    userId = await processUser(user);
    kernelId = await processKernel(kernel);
    costCenterId = await processConstCenter(cost_center, kernelId);

    if (!userId || !kernelId || !costCenterId) return;
  } catch (error) {
    logger.error(error);
  }

  try {
    const mipRequest = {
      doc,
      cost_control,
      cost_center_id: costCenterId,
      kernel_id: kernelId,
      created_at: createdAt,
      user_id: userId,
      uml,
      value_obj: valueObj,
      qty_amount: qtyAmount,
    };

    if (materialId) {
      mipRequest.material_id = materialId;
    }

    mip.create(mipRequest);
  } catch (error) {
    logger.error(error);
    throw new ResponseError({
      code: 0,
      message: 'Error to create a mip register',
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
    buildFeedstock(item);
  });
};

const reprocess = async (data, dates) => {
  const mips = getConnection('mip');

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
  const response = await mips.destroy({ where: { created_at: removedDates } });
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

const FeedstockService = {
  async process(formattedData, path) {
    let feedstockResponse = '';

    try {
      const data = FeedstockFormatter(formattedData);
      feedstockResponse = data;
      save(data);
      deleteFile(path);
    } catch (error) {
      logger.info(error);
      feedstockResponse = {
        error: true,
        message: error.message,
      };
    }

    return feedstockResponse;
  },
  async reProcess(formattedData, path, dates) {
    let feedstockResponse = '';

    try {
      const data = FeedstockFormatter(formattedData);
      feedstockResponse = await reprocess(data, dates);
      deleteFile(path);
    } catch (error) {
      logger.info(error);
      feedstockResponse = {
        error: true,
        message: error.message,
      };
    }

    return feedstockResponse;
  },
  async processed() {
    let feedstockResponse = '';

    try {
      feedstockResponse = await mip.findAll({
        include: [
          { model: kernels },
          { model: materials },
          { model: users },
          { model: costCenters },
        ],
      });
    } catch (error) {
      logger.info(error);
      feedstockResponse = {
        error: true,
        message: error.message,
      };
    }

    return feedstockResponse;
  },
};

module.exports = FeedstockService;
