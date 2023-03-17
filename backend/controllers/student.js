const { where } = require("sequelize");
const Student = require("../models/student");

// Create and Save a new student
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a student
  const student = {
    name: req.body.name,
    email: req.body.email,
    cell_number: req.body.cell_number,
    age: req.body.age,
    address: req.body.address,
  };

  // Save student in the database
  Student.create(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student.",
      });
    });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
  // Save student in the database
  Student.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student.",
      });
    });
};

// Find a single student with a name
exports.findOne = (req, res) => {
  const student_name = req.params.name;

  Student.findByPk(student_name)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find student with name=${student_name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving student with name=" + student_name,
      });
    });
};

// Update a student by the name in the request
exports.update = (req, res) => {
  const new_params = req.body;
  const student_name = req.params.name;
  Student.update(new_params, { where: { name: student_name } })
    .then((changes) => {
      if (changes[0] > 0) {
        res.send({ message: "student updated successfully!" });
      } else {
        res.send({
          message: "Something went wrong when updating the student: ",
          student_name,
        });
      }
    })
    .catch((err) => {
      message.status(500).send("Error updating the student: ", err);
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
  name_to_del = req.params.name;
  Student.destroy({ where: { name: name_to_del } })
    .then((ret) => {
      if (ret) {
        res.send({ message: "Student deleted successfully!" });
      } else {
        res.send({
          message: "Something went wrong when deleting the student: ",
          name_to_del,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting the student: " + err,
      });
    });
};
