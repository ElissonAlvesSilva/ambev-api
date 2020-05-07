/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('mip', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    doc: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    cost_control: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    kernel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kernel',
        key: 'id',
      },
    },
    cost_center_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'cost_center',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    material_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'materials',
        key: 'id',
      },
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
    updated_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'mip',
  });
};
