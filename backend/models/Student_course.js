const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/config");

const Course = require("../models/course");
const Student = require("../models/student");

const Student_course = sequelize.define("student_courses", {
  //   CName: {
  //     type: DataTypes.STRING,
  //     references: {
  //       model: Course,
  //       key: "name",
  //     },
  //   },
  //   SName: {
  //     type: DataTypes.STRING,
  //     references: {
  //       model: Student,
  //       key: "name",
  //     },
  //   },
});

module.exports = Student_course;
