Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\n  <h1>You logged in!!</h1>\n");
  }

function program3(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n  <h1>Not logged in ):</h1>\n  <h3>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "responseText", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h3>\n");
  return buffer;
  }

  data.buffer.push("<div class=\"navbar navbar-inverse\">\n  <p class=\"navbar-text\">username</p>\n  <div class=\"navbar-form\">\n    ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("username")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n  </div>\n  <p class=\"navbar-text\">password</p>\n  <div class=\"navbar-form\">\n    ");
  hashTypes = {'valueBinding': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("password")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(" \n  </div>\n  <button class=\"btn\" ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "login", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Login</button>\n</div>\n\n");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "loggedIn", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  
});