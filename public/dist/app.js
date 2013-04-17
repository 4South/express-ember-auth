minispade.register('application/Application.js', function() {
window.App = Ember.Application.create();minispade.require('controllers/UserController.js');minispade.require('views/UserView.js');minispade.require('controllers/ApplicationController.js');
});

minispade.register('controllers/ApplicationController.js', function() {
App.ApplicationController = Ember.Controller.extend({
  needs: ['user']
});
});

minispade.register('controllers/UserController.js', function() {
App.UserController = Ember.ObjectController.extend({
  formUsername: '',
  formPassword: '',
  formEmail: '',
  errorMessage: '',
  createData: (function() {
    return {
      username: this.get('formUsername'),
      password: this.get('formPassword'),
      email: this.get('formEmail')
    };
  }).property('formUsername', 'formPassword', 'formEmail'),
  loginData: (function() {
    return {
      username: this.get('formUsername'),
      password: this.get('formPassword')
    };
  }).property('formUsername', 'formPassword'),
  loggedIn: (function() {
    if (this.get('content')) {
      return true;
    } else {
      return false;
    }
  }).property('content'),
  resetForm: function() {
    this.set('formUsername', '');
    this.set('formPassword', '');
    return this.set('formEmail', '');
  },
  userAjax: function(url, type, hash) {
    this.set('errorMessage', '');
    hash.url = url;
    hash.type = type;
    hash.dataType = 'json';
    hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;
    if (hash.data && type !== "GET") {
      hash.data = JSON.stringify(hash.data);
    }
    return Ember.$.ajax(hash);
  },
  tester: function() {
    return this.userAjax('/user/sample', 'GET', {
      success: function(data) {
        return console.log(data.message);
      },
      error: function(xhr) {
        return console.log('sample failed');
      },
      complete: function() {
        return console.log('fired the always');
      }
    });
  },
  create: function() {
    return this.userAjax('/user/create', 'POST', {
      data: this.get('createData'),
      success: function(data) {
        return Ember.run(this, function() {
          return this.set('content', Ember.Object.create(data));
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'account creation failed, try again');
        });
      },
      complete: function() {
        return Ember.run(this, function() {
          return this.resetForm();
        });
      }
    });
  },
  login: function() {
    return this.userAjax('/user/login', 'POST', {
      data: this.get('loginData'),
      success: function(data) {
        return Ember.run(this, function() {
          return this.set('content', Ember.Object.create(data));
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'login failed please try again');
        });
      },
      complete: function() {
        return Ember.run(this, function() {
          return this.resetForm();
        });
      }
    });
  },
  logout: function() {
    return this.userAjax('/user/logout', 'GET', {
      success: function(data) {
        return Ember.run(this, function() {
          return this.set('content', null);
        });
      },
      error: function(xhr) {
        return Ember.run(this, function() {
          return this.set('errorMessage', 'logout failed');
        });
      }
    });
  }
});
});

minispade.register('router/Router.js', function() {

});

minispade.register('views/UserView.js', function() {
App.UserView = Ember.View.extend({
  tagName: "div",
  classNames: ['navbar', 'navbar-inverse', 'navbar-fixed-top'],
  templateName: "user"
});
});
