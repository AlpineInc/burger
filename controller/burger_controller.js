//require model

//add route for get all burgers

//add route for create new burger

//add route for update burger
var express = require("express");
var burger = require("../model/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.all(function(burgers) {
        var hbsObject = {
            burgers: burgers
        };
        res.render("index", hbsObject);
    });
});

router.post("/burger", function(req, res) {
    var burgerObj = {
        burger_name: req.body.burger_name
    };

    burger.create(burgerObj, function(burger) {
        res.redirect("/");
    });
});

router.put("/burger/:id", function(req, res) {
    var burgerObj = {
        id: req.params.id,
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    };

    burger.update(burgerObj, function(burger) {
        res.redirect("/");
    });
});

router.delete("/burger/:id", function(req, res) {
    var burgerObj = {
        id: req.params.id
    };

    burger.delete(burgerObj, function(burger) {
        res.redirect("/");
    });
});


//API routes
//Get app burgers
router.get("/api/burger", function(req, res) {
    burger.all(function(burgers) {
        res.json(burgers);
    });
});

//Get burger by id
router.get("/api/burger/:id", function(req, res) {
    burger.find(req.params.id, function(burgers) {
        res.json(burgers);
    });
});

//Create a new burger
router.post("/api/burger", function(req, res) {
    var burgerObj = {
        burger_name: req.body.burger_name
    };

    burger.create(burgerObj, function(burger) {
        res.json(burger);
    });
});

//Update a burger
router.put("/api/burger/:id", function(req, res) {
    var burgerObj = {
        id: req.params.id,
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    };

    burger.update(burgerObj, function(burger) {
        res.json(burger);
    });
});


module.exports = router;