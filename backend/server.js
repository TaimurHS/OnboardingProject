const Sequelize = require("sequelize");
const sequelize = require("./config/config");
const Course = require("./models/course");
const STudent = require("./models/student");
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create tables : ", error);
  });
