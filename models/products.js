/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'products',
  });
};
