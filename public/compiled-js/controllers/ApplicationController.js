App.ApplicationController = Ember.Controller.extend({
  username: '',
  password: '',
  loggedIn: false,
  responseText: '',
  data: (function() {
    return {
      username: this.get('username'),
      password: this.get('password')
    };
  }).property('username', 'password'),
  login: function() {
    return Ember.$.ajax({
      url: '/login',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      context: this,
      data: JSON.stringify(this.get('data')),
      success: function(data) {
        return Ember.run(this, function() {
          return this.set('loggedIn', true);
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
