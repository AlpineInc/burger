//import connections

//add method to read all burgers

//add method to create a new burger

//add method to update an burger
var dbConnection = require("./connection.js");

var orm = {
    all: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        dbConnection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    findOne: function(table, where, cb){
        var queryString = "SELECT * FROM " + table + " where " + where + ";";
        dbConnection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result[0]);
        });
    },
    create: function(table, cols, vals, cb) {
	    var queryString = "INSERT INTO " + table;
	    queryString += " (";
	    queryString += cols.toString();
	    queryString += ") ";
	    queryString += "VALUES (";
	    queryString += printQuestionMarks(vals.length);
	    queryString += ") ";

        dbConnection.query(queryString, vals.toString(), function(err, result) {
            if (err) {
                throw err;
            };

            orm.findOne(table, "id="+result.insertId, function(burger){
	            cb(burger);
	        });
        });

    },
    update: function(table, cols, vals, where, cb) {
	    var queryString = "UPDATE " + table;
	    queryString += " SET ";
	    queryString += colsValsToSql(cols, vals);
	    queryString += " WHERE ";
	    queryString += where;

        dbConnection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            orm.findOne(table, where, function(burger){
	            cb(burger);
	        });
	    });

    }    
};


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function colsValsToSql(cols, vals) {
  var tableUpdateVals = [];

  for(var i = 0; i < cols.length; i++){
  	if(typeof vals[i] === "string"){
  		tableUpdateVals.push(cols[i] + "='" + vals[i]+"'");	
  	} else {
  		tableUpdateVals.push(cols[i] + "=" + vals[i]);
  	}
  	
  }

  return tableUpdateVals.toString();
}

module.exports = orm;