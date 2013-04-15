var UserManager = require('./UserManager.js');
var mongoose = require('mongoose');
var User = null;

//User model used by mongoose
var UserSchema = new mongoose.Schema({

  username: { type: String,
              required: true,
              index: { unique: true } },
  password: { type: String,
              require: true }
}); 

UserSchema.pre('save', function(next) {

  var user = this;

  //only perform hash op if password is new or changed
  if (!UserManager.PWChanged(user)) return next();

  UserManager.generateSalt(UserManager.saltWorkFactor, 
  function(err, salt) {
    if (err) return next(err);

    UserManager.hashPW(user.password, salt, 
    function(err, hash) {
      if (err) return next(err);
      //if no error, set the password to the hash value
      user.password = hash;
      next();
    });
  });
});



User = mongoose.model('User', UserSchema);

module.exports = User;
