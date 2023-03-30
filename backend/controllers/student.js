const Student = require("../models/student");
const Student_course = require("../models/Student_course");
const Course = require("../models/course");

// Create and Save a new student
exports.create = (req, res) => {
  // console.log("\n\nHELLOOOO\n\n");
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let courses = req.body.courses;

  console.log("\n\nCOURSES: ", courses);

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
  Student.findAll()
    .then((data) => {
      const tempFunc = async (data) => {
        let final_data_to_send = [];

        for (let i = 0; i < data.length; i = i + 1) {
          let student_courses = [];
          await Student_course.findAll({
            where: {
              studentName: data[i].name,
            },
          }).then((ret) => {
            console.log(ret);
            for (let j = 0; j < ret.length; j = j + 1) {
              student_courses.push(ret[j].courseName);
            }
            console.log(student_courses);
            final_data_to_send.push({
              name: data[i].name,
              email: data[i].email,
              age: data[i].age,
              cell_number: data[i].cell_number,
              address: data[i].address,
              courses: student_courses,
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

// Find a single student with a name
exports.findOne = (req, res) => {
  const student_name = req.params.name;
  console.log("\n\n\n\n\n\nSTUDENT NAME IS:", student_name);

  Student.findByPk(student_name)
    .then((data) => {
      const tempFunc = async (data) => {
        let final_data_to_send = [];

        let student_courses = [];
        await Student_course.findAll({
          where: {
            studentName: data.name,
          },
        }).then((ret) => {
          console.log(ret);
          for (let j = 0; j < ret.length; j = j + 1) {
            student_courses.push(ret[j].courseName);
          }
          console.log(student_courses);
          final_data_to_send.push({
            name: data.name,
            email: data.email,
            age: data.age,
            cell_number: data.cell_number,
            address: data.address,
            courses: student_courses,
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

// Update a student by the name in the request
exports.update = (req, res) => {
  const new_params = req.body;

  let new_courses = req.body.courses;

  const student_name = req.params.name;
  Student.update(new_params, { where: { name: student_name } })
    .then(async (changes) => {
      await Student_course.destroy({ where: { studentName: student_name } });
      for (let i = 0; i < new_courses.length; i = i + 1) {
        await Student_course.create({
          courseName: new_courses[i],
          studentName: student_name,
        });
      }
      return changes;
    })
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

// Delete a student with the specified name in the request
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
