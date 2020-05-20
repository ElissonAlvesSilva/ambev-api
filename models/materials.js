/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Materials = sequelize.define('materials', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    uml: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    uml_sap: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    qty_amount: {
      type: 'DOUBLE',
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'materials',
  });

  return Materials;
};
