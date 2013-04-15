var bcrypt = require('bcrypt');

var UserManager = {

  /*
  These methods are used to handle password operations.
  Overriding these is designed to be easy to allow the 
  database to be swapped out or replaced based on 
  Environment.
  */

  //Factor used to determine salt iterations for bcrypt
  saltWorkFactor : 10,

  //params: saltWorkFactor, callback
  generateSalt : bcrypt.genSalt,

  //params: password, salt, callback
  hashPW : bcrypt.hash,

  //params: candidatePW, storedPW, callback
  comparePW : bcrypt.compare,

  //synchronous boolean check to see if pw has been changed
  PWChanged : function(user) {
    return user.isModified('password') ? true : false;
  },


  
  /*
  User methods (mostly async)
  */
 
  /* 
  check if an account w/ the input username already exists
  
  this method is written in this slightly esoteric way to allow the
  user to specify lookup methods via their database/model layer of choice
  this keeps the separation between implementation and layout enforced

  params: search params configured for lookupFunction (may vary)
  params: lookupFunction's context object
  params: lookupFunction to be used
  params: callback to invoke (passes err, and boolean doesNotExist)
  */
  checkIfExists : function(userParams, functionContext, 
  lookupFunction, callback) {
   
    //execute the lookupfunction provided with appropriate context
    lookupFunction.call(functionContext, userParams, function(err, user) {
      var doesNotExist = (null === user || undefined === user); 
      callback(err, doesNotExist, user);
    }); 
  },
};

module.exports = UserManager;
