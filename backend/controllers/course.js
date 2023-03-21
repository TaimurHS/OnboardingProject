const { where } = require("sequelize");
const Course = require("../models/course");
const Student_course = require("../models/Student_course");
const Student = require("../models/student");

// Create and Save a new course
exports.create = (req, res) => {
  console.log("\n\n\n");
  console.log(req.body);
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
  Course.findAll()
    .then((data) => {
      const tempFunc = async (data) => {
        let final_data_to_send = [];

        for (let i = 0; i < data.length; i = i + 1) {
          let course_students = [];
          await Student_course.findAll({
            where: {
              courseName: data[i].name,
            },
          }).then((ret) => {
            console.log(ret);
            for (let j = 0; j < ret.length; j = j + 1) {
              course_students.push(ret[j].studentName);
            }
            console.log(course_students);
            final_data_to_send.push({
              name: data[i].name,
              field: data[i].field,
              credit_hours: data[i].credit_hours,
              lab: data[i].lab,
              students: course_students,
            });
          });
        }
        return final_data_to_send;
      };
      let to_send = tempFunc(data);
      to_send.then((tosend) => {
        console.log("\nFINAL DATA TO SEND: ", tosend);
        res.send(tosend);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student.",
      });
    });
};

// Find a single course with a name
exports.findOne = (req, res) => {
  const course_name = req.params.name;

  Course.findByPk(course_name)
    .then((data) => {
      const tempFunc = async (data) => {
        let final_data_to_send = [];

        let course_students = [];
        await Student_course.findAll({
          where: {
            courseName: data.name,
          },
        }).then((ret) => {
          console.log(ret);
          for (let j = 0; j < ret.length; j = j + 1) {
            course_students.push(ret[j].studentName);
          }
          console.log(course_students);
          final_data_to_send.push({
            name: data.name,
            field: data.field,
            credit_hours: data.credit_hours,
            lab: data.lab,
            students: course_students,
          });
        });

        return final_data_to_send;
      };
      let to_send = tempFunc(data);
      to_send.then((tosend) => {
        console.log("\nFINAL DATA TO SEND: ", tosend);
        res.send(tosend);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student.",
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
