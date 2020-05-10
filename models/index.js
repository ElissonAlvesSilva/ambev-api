const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const conf = require('../utils/config');

const host = conf.get('db:host');
const dialect = conf.get('db:dialect');
const port = conf.get('db:port');
const database = conf.get('db:database');
const username = conf.get('db:auth:user');
const password = conf.get('db:auth:password');

const db = {};
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  define: {
    underscored: true,
  },
});

fs
  .readdirSync(__dirname)
  // eslint-disable-next-line max-len
  .filter((file) => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
