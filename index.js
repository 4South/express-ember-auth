var express = require('express')
  , passport = require('passport')
  , pass = require('./app/config/PassPort.js')
  , app = express()
  , userRoutes = require('./app/routes/UserRoutes.js')
  , apiRoutes = require('./app/routes/APIRoutes.js')
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

app.post('/user/login', passport.authenticate('local'), userRoutes.postlogin);
app.post('/user/create', userRoutes.postcreate);
app.get('/user/logout', userRoutes.getlogout);
app.get('/user/sample', pass.verifyAuth, userRoutes.getsample);

//set server to listen on port
app.listen(1234);
