const Course = require("../models/course");

exports.getCourses = (req, res, next) => {
  Course.findAll()
    .then((courses) => {
      console.log("\nCOURSES ARE:\n", courses);
    })
    .catch((err) => {
      console.log("ERROR:\n", err);
    });
};
