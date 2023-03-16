const Student = require("../models/student");

exports.getStudents = (req, res, next) => {
  Course.findAll()
    .then((students) => {
      console.log("\nSTUDENTS ARE:\n", students);
    })
    .catch((err) => {
      console.log("ERROR:\n", err);
    });
};
