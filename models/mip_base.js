/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const MipBase = sequelize.define('mip_base', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    doc: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cost_control: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    kernel: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    cost_center: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    user: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    uml: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    qty_amount: {
      type: 'DOUBLE',
      allowNull: false,
    },
    value_obj: {
      type: 'DOUBLE',
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'mip_base',
  });

  return MipBase;
};
