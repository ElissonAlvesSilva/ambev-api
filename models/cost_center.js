/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cost_center', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    kernel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kernel',
        key: 'id'
      }
    },
    key: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'cost_center'
  });
};
