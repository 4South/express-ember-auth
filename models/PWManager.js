var bcrypt = require('bcrypt');

//manager that wraps some bcrypt functionality and 
//provides utilities for handling encrypted pws
var PWManager = {

  saltWorkFactor : 10,

  PWChanged : function(user) {
    return !user.isModified('password') ? true : false;
  },

  comparePW : function(candidatePW, storedPW, callback) {
    bcrypt.compare(candidatePW, storedPW, 
    function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  },

  //takes password, salt, callback
  hashPW : bcrypt.hash,

  //takes factor, callback
  generateSalt : bcrypt.genSalt,

};

//TEST
//verify salt generation/hash creation functioning
PWManager.generateSalt(10, function(err, salt) {
  console.log('from PWMANAGER TEST', salt);
  PWManager.hashPW('kingkong', salt, function(err, hash) {
    console.log('fromt PWMANAGER TEST', hash);
  });
});

module.exports = PWManager 
