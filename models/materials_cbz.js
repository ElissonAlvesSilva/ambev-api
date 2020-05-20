/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const MaterialCbz = sequelize.define('materials_cbz', {
    material_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'materials',
        key: 'id',
      },
    },
    cbz_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cbz',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
    tableName: 'materials_cbz',
  });

  return MaterialCbz;
};
