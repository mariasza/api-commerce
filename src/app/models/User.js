const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false
  });

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ code: this.code }, process.env.APP_SECRET);
  }

  return User;
};
