var bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  , SALT_WORK_FACTOR = 10;

exports.mongoose = mongoose;

//DATABASE SETUP
//connect to locally running mongodb
var dbString = "mongodb://localhost:27017/authapp";
mongoose.connect(dbString, 
function(err) {
  if (err) throw err;
  console.log ('Successfully connected to' , dbString);  
});


//User model used by mongoose
var UserSchema = new mongoose.Schema({

  username: { type: String,
              required: true,
              index: { unique: true } },
  password: { type: String,
              require: true },
  email: { type: String,
           require: true,
           unique: true }
}); 


UserSchema.pre('save', function(next) {
  var user = this;

  //only perform hash op if password is new or changed
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, 
  function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, 
                salt, 
    function(err, hash) {
      if (err) return next(err);
      //if no error, set the password to the hash value
      user.password = hash;
      next();
    });
  });
});


var UserModel = mongoose.model('User', UserSchema);

exports.UserModel = UserModel;
