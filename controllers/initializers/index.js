const database = require('./database');
const createFolders = require('./folder');

const initilizer = async () => {
  // initialize database
  await database();

  // create folder if not exists
  await createFolders();
};

module.exports = initilizer;
