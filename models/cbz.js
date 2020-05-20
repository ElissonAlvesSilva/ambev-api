/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const CBZ = sequelize.define('cbz', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name_sap: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false,
    tableName: 'cbz',
  });

  return CBZ;
};
