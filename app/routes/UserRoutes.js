var db = require('./../DB/DB.js');

//helper to format response to Ember conventions
formatDbResponse = function(model) {
  var formattedModel = model.toObject();
  formattedModel.id = formattedModel._id;
  delete formattedModel.password
  delete formattedModel._id;
  delete formattedModel.__v; 
  return formattedModel;
};

exports.postlogin = function(req, res) {
  res.json( { id: req.user.id, username: req.user.username });
};

exports.postcreate = function(req, res) {
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
};

exports.getlogout = function(req, res) {
  req.logout();
  res.json( {responseText: 'succesful logout'} );
};

//TODO: TEST...can be removed
exports.getsample = function (req, res) {
  res.json({message: 'you are logged in grats on that!'});
};
