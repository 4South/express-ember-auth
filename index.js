var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var UserModel = require('./models/UserModel.js');
var UserManager = require('./models/UserManager.js');


//connect to locally running mongodb
var dbString = "mongodb://localhost:27017/authapp";
mongoose.connect(dbString, function(err) {
  if (err) throw err;
  console.log ('Successfully connected to MongoDB using ', dbString);  
});


//start express app
var app = express();

//configuration for default env, could be changed for diff deployments
app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname));
  app.use(express.bodyParser());
});


//ROUTES
app.get('/', function(req, res) {
  res.sendfile(__dirname + "/index.html");
});

app.post('/login', function(req, res) {
  
  //check if the user is in the database
  UserManager.checkIfExists({username: req.body.username}, UserModel, 
  UserModel.findOne, function(err, doesNotExist, user) {
    if (err) throw err;

    //if this user does not exist, return a 400 w/ message
    if (doesNotExist) {
      res.status(400).send('not a valid user');
    } else {
      //check if the password found matches the one provided 
      UserManager.comparePW(req.body.password, user.password,
      function(err, isMatch) {
        if (err) throw err; 
  
        if (isMatch) { 
        //if match, return user formatted user model
          res.send(formatDbResponse(user));  
        } else {
        //if not match, return 400 w/ message
          res.status(400).send('incorrect password');
        } 
      });
    }

  });
});

app.post('/login/create', function(req, res) {

  var newUser = new UserModel({
    username: req.body.username,
    password: req.body.password,
  });
  
  newUser.save(function(err) {
    if (err) throw err; 
    
    //retrieve the newly saved user and send it in response
    UserModel.findOne( {username: req.body.username} , 
    function(err, user) {
      if (err) throw err; 
      
      //compare password to see if valid
      UserManager.comparePW(req.body.password, user.password, 
      function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          res.send('success!');
        } else {
          res.send('failure!');
        }
      });
    });
  });
});

/*
//TEST
var newUser = new UserModel({
  username: 'biff',
  password: '1234',
});

//same test as above w/ UserManager
UserManager.checkIfExists({username: newUser.username}, UserModel, 
UserModel.findOne, function(err, doesNotExist, user) {

  if (err) throw err;

  if (doesNotExist) {
    console.log('no user exists by this name');
    newUser.save(function(err, user) {
      if (err) throw err;
      
      console.log(formatDbResponse(user), 'created!');
    });
  } else {
    console.log(formatDbResponse(user), 'already exists in the db');
  }
});
*/

//helper to format response to Ember conventions
formatDbResponse = function(model) {
  var formattedModel = model.toObject();
  formattedModel.id = formattedModel._id;
  delete formattedModel.password
  delete formattedModel._id;
  delete formattedModel.__v; 
  return formattedModel;
};

//set server to listen on port
app.listen(1234);
