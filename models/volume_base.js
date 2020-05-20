/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const VolumeBase = sequelize.define('volume_base', {
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
    update_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
      allowNull: false,
    },
    um: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    qty_amount: {
      type: 'DOUBLE',
      allowNull: false,
    },
    volume_hl: {
      type: 'DOUBLE',
      allowNull: false,
    },
    resource: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'volume_base',
  });

  return VolumeBase;
};
