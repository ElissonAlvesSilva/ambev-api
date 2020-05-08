/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Mip = sequelize.define('mip', {
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

  Mip.associate = (models) => {
    Mip.belongsTo(models.kernel, {
      foreign_key: 'kernel_id',
    });
    Mip.belongsTo(models.materials, {
      foreign_key: 'material_id',
    });
    Mip.belongsTo(models.users, {
      foreign_key: 'user_id',
    });
    Mip.belongsTo(models.cost_center, {
      foreign_key: 'cost_center_id',
    });
  };

  return Mip;
};
