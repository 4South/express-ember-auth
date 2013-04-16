App.UserController = Ember.ObjectController.extend({
  loginUsername: "",
  loginPassword: "",
  login: function() {
    return Ember.$.ajax({
      url: '/user/login',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      context: this,
      data: JSON.stringify(this.get('data')),
      success: function(data) {
        return Ember.run(this, function() {
          this.set('loggedIn', true);
          return this.set('loggedName', data.username);
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          console.log(xhr);
          this.set('loggedIn', false);
          return this.set('responseText', xhr.responseText);
        });
      }
    });
  }
});
