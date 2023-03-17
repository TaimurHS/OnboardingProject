const { where } = require("sequelize");
const Course = require("../models/course");

// Create and Save a new course
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a course
  const course = {
    name: req.body.name,
    field: req.body.field,
    credit_hours: req.body.credit_hours,
    lab: req.body.lab,
  };

  // Save course in the database
  Course.create(course)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the course.",
      });
    });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
  // Save course in the database
  Course.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the course.",
      });
    });
};

// Find a single course with a name
exports.findOne = (req, res) => {
  const course_name = req.params.name;

  Course.findByPk(course_name)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find course with name=${course_name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving course with name=" + course_name,
      });
    });
};

// Update a course by the name in the request
exports.update = (req, res) => {
  const new_params = req.body;
  const course_name = req.params.name;
  Course.update(new_params, { where: { name: course_name } })
    .then((changes) => {
      if (changes[0] > 0) {
        res.send({ message: "Course updated successfully!" });
      } else {
        res.send({
          message: "Something went wrong when updating the course: ",
          course_name,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the course: " + err,
      });
    });
};

// Delete a course with the specified id in the request
exports.delete = (req, res) => {
  name_to_del = req.params.name;
  Course.destroy({ where: { name: name_to_del } })
    .then((ret) => {
      if (ret) {
        res.send({ message: "Course deleted successfully!" });
      } else {
        res.send({
          message: "Something went wrong when deleting the course: ",
          name_to_del,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting the course: " + err,
      });
    });
};
