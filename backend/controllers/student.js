const { where } = require("sequelize");
const Student = require("../models/student");
const Student_course = require("../models/Student_course");
const Course = require("../models/course");

// Create and Save a new student
exports.create = (req, res) => {
  let courses_buffer = [];
  // console.log("\n\nHELLOOOO\n\n");
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

  let courses = req.body.courses;

  // Save student in the database
  Student.create(student)
    .then(async (data) => {
      // data needed in the next .then(), so need to return it from this current .then()

      // // this won't be needed if I make a dropdown menu on the frontend to allow to user
      // // to only chose from available courses
      // for (let i = 0; i < courses.length; i = i + 1) {
      //   let course_record = await Course.findByPk(courses[i].name);
      //   if (course_record) {
      //     courses_buffer.push(course_record);
      //   }
      // }

      for (let i = 0; i < courses.length; i = i + 1) {
        await Student_course.create({
          courseName: courses[i],
          studentName: student.name,
        });
      }
      return data;
    })
    .then((data) => {
      console.log(data);
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
      res.status(500).send({ message: "Error updating the student: ", err });
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
