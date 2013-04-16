//main application module
var express = require('express');

//mongodb interface module
var mongoose = require('mongoose');

//user auth/session tracking module
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LocalAuth = require('./app/authsystem/AuthSystem.js').authStrat;

//model object (based on mongoose/mongodb)
var UserModel = require('./app/models/UserModel.js');

//helper object for user management
var UserManager = require('./app/models/UserManager.js');


//AUTHORIZATION SETUP
//setup auth middleware for api endpoint authentication
passport.use(LocalAuth);

passport.serializeUser(function(user, done) {
  console.log(user, 'is the user');
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err, user) {
    done(err, user);
  });
});


//DATABASE SETUP
//connect to locally running mongodb
var dbString = "mongodb://localhost:27017/authapp";

mongoose.connect(dbString, 
function(err) {
  if (err) throw err;
  console.log ('Successfully connected to' , dbString);  
});


//APPLICATION SETUP
//start express app
var app = express();

//configuration for default env, could be changed for diff deployments
app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
    secret: '42',
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(app.router);
});


//ROUTES
app.get('/', function(req, res) {
  res.sendfile(__dirname + "/index.html");
});

app.post( '/user/login', 
          passport.authenticate('local'), 
function(req, res) {
  console.log(req.session);
  res.json( { id: req.user.id, username: req.user.username } ); 
});

app.post( '/user/create',
function(req, res) {
  UserManager.checkIfExists({username: req.body.username},
                            UserModel,
                            UserModel.findOne,
  function(err, doesNotExist, user) {
    var data = {};
    if (err) throw err;
    
    if (!doesNotExist) {
      console.log('User already exists!');
      res.status(400).send('User already exists');
    } else {
      data.username = req.body.username;
      data.password = req.body.password;
      UserManager.createNewUser(data,
                                UserModel,
                                UserModel.create,
      function(err, user) {
        if (err) throw err;
        
        console.log(user.username, 'created!');
        res.json(formatDbResponse(user)); 
      }); 
    }
  });
});

app.get( '/user/logout',
function(req, res) {
  req.logout();
  res.json({responseText: 'successful logout'});
});

var enforceAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) { return next() };
  res.status(400).send('User is not logged in');  
};


app.get( '/user/sample',
          enforceAuthentication,
function(req, res) {
  res.json({message: 'you are logged in grats on that!'});
});


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
