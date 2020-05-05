const database = require('./database');

const initilizer = async () => {
  await database();
};

module.exports = initilizer;
