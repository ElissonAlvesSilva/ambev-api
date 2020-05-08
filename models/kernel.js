/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Kernels = sequelize.define('kernel', {
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

  Kernels.associate = (models) => {
    Kernels.hasMany(models.volume, {
      foreign_key: 'kernel_id',
    });
  };

  return Kernels;
};
