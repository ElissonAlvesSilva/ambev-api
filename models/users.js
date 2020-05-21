/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
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
    kernel_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'kernel',
        key: 'id',
      },
    },
    cost_center_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cost_center',
        key: 'id',
      },
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.belongsTo(models.kernel, {
      foreign_key: 'kernel_id',
    });
    Users.belongsTo(models.cost_center, {
      foreign_key: 'cost_center_id',
    });
  };

  return Users;
};
