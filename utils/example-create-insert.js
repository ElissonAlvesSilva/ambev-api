/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const md5 = require('md5');
const { QueryTypes } = require('sequelize');
const { parserFile } = require('../../utils/file');
const fs  = require('fs');
const logger = require('../../utils/logger');

// eslint-disable-next-line camelcase
const { cbz, materials, sequelize } = require('../../models');

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

const processCBZ = async (name_sap) => {
  if (!name_sap) {
    return name_sap;
  }

  // eslint-disable-next-line no-unused-vars
  const result = await cbz.findOne({
    raw: true,
    nest: true,
    where: {
      name_hash: md5(name_sap),
    },
  });

  if (!result) {
    return null;
  }

  const { id } = result;
  return id;
};

const findOne = async (key) => await cbz.findOne({ where: { key } });

const findAll = async () => await cbz.findAll();

const CBZService = {
  async handle(key) {
    let cbzResponse = '';
    try {
      // if (key) {
      //   cbzResponse = await findOne(key);
      // } else {
      //   cbzResponse = await findAll(key);
      // }
      const queries = [];
      const parsedFile = parserFile(`${process.cwd()}/cbz_materials.xls`);
      parsedFile.map(async (item) => {
        const { CBZ, SAP } = item;
        const idcbz = await processCBZ(CBZ);
        const idmaterial = await processMaterial(SAP);
        if (idcbz && idmaterial) {
          const insert = `INSERT INTO \`material_cbz\` (\`material_id\`, \`cbz_id\`) VALUES(${idmaterial},${idcbz});\n`;
          fs.appendFileSync('result.txt', insert);
          queries.push(insert);
        }
      });
      // fs.writeFileSync('result.json', JSON.stringify(parsedFile));
      console.log(queries);
      cbzResponse = queries;
    } catch (error) {
      console.log(error);
      cbzResponse = {
        error: true,
        message: error.message,
      };
    }

    return cbzResponse;
  },
};

module.exports = CBZService;
