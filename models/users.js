/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    key: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });
};
