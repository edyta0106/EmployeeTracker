const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "courses_db",
  },
  console.log(`Connected to the courses_db database.`)
);

module.exports = db;
