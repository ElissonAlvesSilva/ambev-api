/* eslint-disable camelcase */
const moment = require('moment');
const logger = require('../../utils/logger');

const ResponseError = require('../../utils/error/response-error');
const { deleteFile } = require('../../utils/file');
const { getConnection } = require('../../utils/connection-models');
const { replaceCurrency } = require('../../utils/strings');
const { FeedstockFormatter } = require('../../formatters/feedstock');


const processConstCenter = async (key, kernel) => {
  const costCenters = getConnection('cost_center');

  if (!key) {
    return key;
  }

  // eslint-disable-next-line no-unused-vars
  const costCenter = await costCenters.findOne({
    raw: true,
    nest: true,
    where: {
      key,
      kernel_id: kernel,
    },
  });

  if (!costCenter) {
    return null;
  }

  const { id } = costCenter;
  return id;
};


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

const processUser = async (key) => {
  const users = getConnection('users');

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
  const materials = getConnection('materials');

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
  const mip = getConnection('mip');

  let materialId = '';
  let kernelId = '';
  let userId = '';
  let costCenterId = '';
  let createdAt = '';
  const valueObj = parseFloat(replaceCurrency(value_obj));
  const qtyAmount = parseFloat(replaceCurrency(qty_amount));

  if (created_at) {
    createdAt = moment(new Date(created_at), 'YYYY-MM-DD');
  } else {
    createdAt = moment(new Date(), 'YYYY-MM-DD');
  }
  console.log(created_at);
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
};

module.exports = FeedstockService;
