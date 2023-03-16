module.exports = (app) => {
  const courses = require("../controllers/course.js");

  var router = require("express").Router();

  // Create a new course
  router.post("/", courses.create);

  // Retrieve all courses
  router.get("/", courses.findAll);

  // Retrieve a single courses with name
  router.get("/:name", courses.findOne);

  // Update a courses with name
  router.put("/:name", courses.update);

  // Delete a courses with name
  router.delete("/:name", courses.delete);

  // Delete all courses
  router.delete("/", courses.deleteAll);

  app.use("/api/courses", router);
};
