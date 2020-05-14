/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const MipResult = sequelize.define('mip_result', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    doc: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    cost_control: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
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
      allowNull: true,
    },
    qty_amount: {
      type: 'DOUBLE',
      allowNull: true,
    },
    value_obj: {
      type: 'DOUBLE',
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total: {
      type: 'DOUBLE',
      allowNull: true,
    },
  }, {
    tableName: 'mip_result',
  });

  return MipResult;
};
