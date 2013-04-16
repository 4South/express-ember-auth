var express = require('express')
  , passport = require('passport')
  , pass = require('./app/config/PassPort.js')
  , app = express()
  , db = require('./app/DB/DB.js');

//configuration for default env, could be changed for diff deployments
app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: '42',
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + "/public"));
  app.use(express.static(__dirname));
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
  db.UserModel.findOne({username: req.body.username},
  function(err, user) {
    var data = {};
    if (err) throw err;
    
    if (user) {
      console.log('User already exists!');
      res.status(400).send('User already exists');
    } else {
      data.username = req.body.username;
      data.password = req.body.password;
      data.email = req.body.email;
      db.UserModel.create(data,
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
          pass.verifyAuth,
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
