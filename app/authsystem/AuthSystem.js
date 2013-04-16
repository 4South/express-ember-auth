var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var UserManager = require('./../models/UserManager.js');
var UserModel = require('./../models/UserModel.js');

var authStrat = new LocalStrategy(
  function(username, password, done) {
      
    /*
    check if the user is in the database
    here we are using the UserModel object and its findOne method
    that method is swappable if desired
    */
    UserManager.checkIfExists({username: username}, 
                              UserModel, 
                              UserModel.findOne, 
    function(err, doesNotExist, user) {
      if (err) throw err;

      //if this user does not exist, fail auth 
      if (doesNotExist) {
        return done(null, false, { message: 'no user by that name' });

      } else {
        //check if the password found matches the one provided 
        UserManager.comparePW(password, 
                              user.password,
        function(err, isMatch) {
          if (err) throw err; 
    
          if (isMatch) { 
          //if match, return user formatted user model
            return done(null, user);
          } else {
          //if not match, fail auth 
            return done(null, false, { message: 'incorrect password'});
          } 
        });
      }
    });
  }
);

module.exports = {'authStrat': authStrat};
