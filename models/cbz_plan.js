/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const CBZPlan = sequelize.define('cbz_plan', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    month: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    qty_plan: {
      type: 'DOUBLE',
      allowNull: true,
    },
    um: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    price_plan: {
      type: 'DOUBLE',
      allowNull: true,
    },
    year_plan: {
      type: 'DOUBLE',
      allowNull: true,
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
    tableName: 'cbz_plan',
  });

  return CBZPlan;
};
