require('dotenv').config();


var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    Localstrategy = require("passport-local"),
    ajax = require("ajax"),
    //local models
    User     = require("./models/user");
   // User     = require(./models/),

   //mongoose.connect("mongodb://localhost:27017/va_school", {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connect('mongodb+srv://masterrobertv:818513RVrk!mon@gettingstarted-q7gln.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

   app.use(bodyParser.urlencoded({extended: true}));
   app.set("view engine", "ejs");
   app.use(express.static(__dirname +"/public"));
   app.use(express.static(__dirname +"/assets"));
    //passport configure
    app.use(require("express-session")({
        secret: "Not that big",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new Localstrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

//schemas new person

var personSchema = new mongoose.Schema({
    lName: String,
    fName: String,
    email: String,
    mName: String
});

var Person = mongoose.model("Person", personSchema);



var studentSchema = new mongoose.Schema({
    fullName: String,
    parentName: String,
    rank: String,
    enrolled: {type: Date, default: Date.now},
    tuition: Number
});
var Student = mongoose.model("Student", studentSchema);

app.get("/", function(req, res){
    res.redirect("/index");

});

app.get("/index", function(req, res){
res.render("index");
});
app.post("/index", function(req, res){
 res.send(" You are getting the POST route!")

});

app.get("/allstudents", function(req, res){

    Person.find({}, function(err, data){
        if(err){
            alert(err);
        } else {
            res.render("students", {students:data});
        }
    });
});

app.get("/allstudents/:id", function(req, res){
    //find student with matching ID
    Person.findById(req.params.id, function(err, foundStudent){
       if(err){
        res.redirect("studects");
        alert("Sorry, " + foundStudent + " not found.");
    } else {
        res.render("home", {completeStudent: foundStudent});
    }
    });

});

app.get("/allstudents/:id/edit", function(req, res){
});

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){

    Person.create({
            lName: req.body.lName,
            fName: req.body.fName,
            mName: req.body.mName,
            email: req.body.email

    }, function(err, data){
        if(err){
        alert("failed to save");
        } else {
            res.redirect("/allstudents")
        }
    });
});
let port = process.env.PORT || 3000;
   app.listen(port, function(err, up){
       if(err){
           Console.log("Broken")
       } else {
           console.log("The Server is paying attension, and may listen!");
       }
   });


