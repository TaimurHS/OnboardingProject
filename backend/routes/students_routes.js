module.exports = (app) => {
  const students = require("../controllers/student.js");

  var router = require("express").Router();

  // Create a new course
  router.post("/", students.create);

  // Retrieve all students
  router.get("/", students.findAll);

  // Retrieve a single students with name
  router.get("/:name", students.findOne);

  // Update a students with name
  router.put("/:name", students.update);

  // Delete a students with name
  router.delete("/:name", students.delete);

  // Delete all students
  router.delete("/", students.deleteAll);

  app.use("/api/students", router);
};
