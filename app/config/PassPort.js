var passport = require('passport')
  , LocalStrat = require('passport-local').Strategy
  , DB = require('../DB/DB.js')
  , bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  DB.UserModel.findById(id, function(err, user) {
    done(err, user); 
  });
});

var authStrat = new LocalStrat(
  function(username, password, done) {
      
    /*
    check if the user is in the database
    here we are using the UserModel object and its findOne method
    that method is swappable if desired
    */
    DB.UserModel.findOne({username: username}, 
    function(err, user) {
      if (err) throw err;

      //if this user does not exist, fail auth 
      if (!user) {
        return done(null, false, { message: 'no user by that name' });

      } else {
        //check if the password found matches the one provided 
        bcrypt.compare( password, 
                        user.password,
        function(err, isMatch) {
          if (err) throw err; 
    
          if (isMatch) { 
            return done(null, user);
          } else {
            return done(null, false, { message: 'incorrect password'});
          } 
        });
      }
    });
  }
);

passport.use(authStrat);

exports.verifyAuth = function verifyAuth (req, res, next ){
  if (req.isAuthenticated()) { return next(); }  
  res.status(400).send({message: 'no user logged in'});
};
