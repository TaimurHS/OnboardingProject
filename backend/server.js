const Sequelize = require("sequelize");
const sequelize = require("./config/config");
const Course = require("./models/course");
const Student = require("./models/student");
const Student_course = require("./models/Student_course");

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Course.belongsToMany(Student, { through: Student_course });
Student.belongsToMany(Course, { through: Student_course });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create tables : ", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to onboarding application." });
});

require("./routes/courses_routes")(app);
require("./routes/students_routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
