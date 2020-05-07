/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('kernel', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'kernel',
  });
};
