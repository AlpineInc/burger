var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        var table =  "burger";
        try{
	        orm.all(table, function(res) {
	            cb(res);
	        });
    	} catch(err){
    		console.log(err);
    		cb({});
    	}
    },
    find: function(id, cb) {
        var table =  "burger";
        var where = "id=" + id;

        try{
	        orm.findOne(table, where, function(res) {
	            cb(res);
	        });
    	} catch(err){
    		console.log(err);
    		cb({});
    	}
    },
    create: function(burger, cb) {
        var table =  "burger";
        var cols = ["burger_name"];
        var vals = [burger.burger_name];
        try{
	        orm.create(table, cols, vals, function(res) {
	            cb(res);
	        });
    	} catch(err){
    		console.log(err);
    		cb(null);
    	} 
    },
    update: function(burger, cb) {
        var table =  "burger";
        var cols = ["burger_name", "devoured"];
        var vals = [burger.burger_name, burger.devoured];
        var where = "id=" + burger.id;
        try{
	        orm.update(table, cols, vals, where, function(res) {
	        	if(res.changedRows === 0){
	        		console.log("No records updated");
	        		cb(null);
	        	} else{
	        		cb(res);	
	        	}
	        });
    	} catch(err){
    		console.log(err);
    		cb(null);
    	} 
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
