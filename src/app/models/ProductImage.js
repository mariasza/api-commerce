/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ProductImage",
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
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      productId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: {
            tableName: "Product",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "ProductImage",
      timestamps: false,
    }
  );
};
