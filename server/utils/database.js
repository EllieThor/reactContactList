var mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

module.exports = con.promise();
