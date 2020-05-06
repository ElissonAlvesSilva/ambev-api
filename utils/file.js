const fs = require('fs');
const xlsx = require('xlsx');


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

const parserFile = (path) => {
  let parseResponse = '';

  try {
    const workbook = xlsx.readFile(path, { raw: true });
    const sheetList = workbook.SheetNames;
    const result = xlsx.utils.sheet_to_json(workbook.Sheets[sheetList[0]]);
    parseResponse = result;
  } catch (error) {
    logger(error);
    parseResponse = {
      error: true,
      message: error,
    };
  }

  return parseResponse;
};

module.exports = {
  deleteFile,
  parserFile,
};
