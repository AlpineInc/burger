//require mysql

//create a config object containing the connection paramaters to the DB

//connect to database

//export connection

var mysql = require("mysql");

var dbConfig = {
  port: 3306,
  host: "localhost",
  user: "root",
  password: "admin",
  database: "burger_db"
};

var dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect(function(err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + dbConnection.threadId);
});

module.exports = dbConnection;