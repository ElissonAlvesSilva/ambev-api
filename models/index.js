/* eslint-disable global-require */

const Models = (sequelize, Sequelize) => {
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.cost_center = require('./cost_center')(sequelize, Sequelize);
  db.kernel = require('./kernel')(sequelize, Sequelize);
  db.materials = require('./materials')(sequelize, Sequelize);
  db.mip = require('./mip')(sequelize, Sequelize);
  db.products = require('./products')(sequelize, Sequelize);
  db.users = require('./users')(sequelize, Sequelize);
  db.volume = require('./volume')(sequelize, Sequelize);

  db.kernel.hasMany(db.mip, { as: 'kernel' });
  db.kernel.hasMany(db.cost_center, { as: 'kernel' });
  db.kernel.hasMany(db.volume, { as: 'kernel' });
  db.materials.hasMany(db.mip, { as: 'material' });
  db.users.hasMany(db.mip, { as: 'user' });
  db.products.hasMany(db.volume, { as: 'product' });

  return db;
};

module.exports = Models;
