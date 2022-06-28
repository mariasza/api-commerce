/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: "User",
          },
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: "Category",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Product",
      timestamps: false,
    }
  );
};
