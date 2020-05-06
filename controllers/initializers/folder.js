const fs = require('fs');

const logger = require('../../utils/logger');

const dir = `${process.cwd()}/uploads`;
const mip = '/mip';
const volume = '/volume';

const createFolders = async () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    logger.info(`Folder ${dir} created`);
  }

  if (!fs.existsSync(`${dir}${mip}`)) {
    fs.mkdirSync(`${dir}${mip}`);
    logger.info(`Folder ${dir}${mip} created`);
  }

  if (!fs.existsSync(`${dir}${volume}`)) {
    fs.mkdirSync(`${dir}${volume}`);
    logger.info(`Folder ${dir}${volume} created`);
  }
};

module.exports = createFolders;
