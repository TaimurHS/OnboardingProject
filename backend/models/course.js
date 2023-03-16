const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/config");

const Course = sequelize.define("courses", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  field: {
    type: DataTypes.ENUM(["Science", "History", "Arts"]),
    allowNull: false,
  },
  credit_hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Lab: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Course;
