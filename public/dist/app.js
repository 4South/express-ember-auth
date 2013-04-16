minispade.register('application/Application.js', function() {
window.App = Ember.Application.create();minispade.require('controllers/ApplicationController.js');
});

minispade.register('controllers/ApplicationController.js', function() {
App.ApplicationController = Ember.Controller.extend({
  username: '',
  password: '',
  loggedIn: false,
  loggedName: "",
  responseText: '',
  data: (function() {
    return {
      username: this.get('username'),
      password: this.get('password')
    };
  }).property('username', 'password'),
  tester: function() {
    return Ember.$.ajax({
      url: '/user/sample',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      context: this,
      success: function(data) {
        return console.log(data.message);
      },
      error: function(xhr) {
        return console.log(xhr.responseText);
      }
    });
  },
  create: function() {
    Ember.$.ajax({
      url: '/user/create',
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
    this.set('username', '');
    return this.set('password', '');
  },
  login: function() {
    Ember.$.ajax({
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
    this.set('username', '');
    return this.set('password', '');
  },
  logout: function() {
    return Ember.$.ajax({
      url: '/user/logout',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      context: this,
      success: function(data) {
        return Ember.run(this, function() {
          this.set('loggedIn', false);
          return this.set('loggedName', '');
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          console.log(xhr);
          this.set('loggedIn', true);
          return this.set('responseText', xhr.responseText);
        });
      }
    });
  }
});
});

minispade.register('controllers/UserController.js', function() {
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
});
