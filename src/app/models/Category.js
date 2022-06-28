/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Category', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'Category',
    timestamps: false
  });
};
