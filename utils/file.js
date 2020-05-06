const fs = require('fs');

const logger = require('./logger');

const deleteFile = (path) => {
  try {
    fs.unlinkSync(path);
    return true;
  } catch (e) {
    logger.info(e);
    return null;
  }
};

module.exports = { deleteFile };
