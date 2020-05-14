/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const VolumeResult = sequelize.define('volume_result', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    line: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    kernel: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    product: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    volume_pc: {
      type: 'DOUBLE',
      allowNull: true,
    },
    um: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    qty_amount: {
      type: 'DOUBLE',
      allowNull: true,
    },
    volume_hl: {
      type: 'DOUBLE',
      allowNull: true,
    },
    resource: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    total_pc: {
      type: 'DOUBLE',
      allowNull: true,
    },
    total_qty: {
      type: 'DOUBLE',
      allowNull: true,
    },
    total_hl: {
      type: 'DOUBLE',
      allowNull: true,
    },
  }, {
    tableName: 'volume_result',
  });
  return VolumeResult;
};
