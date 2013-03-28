minispade.register('application/Application.js', function() {
window.App = Ember.Application.create();minispade.require('controllers/ApplicationController.js');
});

minispade.register('controllers/ApplicationController.js', function() {
App.ApplicationController = Ember.Controller.extend({
  sampleText: "hey this application controller is sure neat"
});
});
