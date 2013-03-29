Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var hashTypes;
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  }

  data.buffer.push("<div class=\"row-fluid\">\n  <div class=\"page-header offset2 span8\">\n    <h1>4South-Ember Accelerates Local Development</h1>\n  </div>\n</div>\n<div class=\"container-fluid\">\n  <div class=\"row-fluid\">\n    <div class=\"offset2 span8\">\n      <h3>Template Information</h3>\n      <ul style=\"list-style-type:none\">\n        <li>This default application.handlebars is found in <strong>public/handlebars/</strong>.</li>\n        <li>Delete this file to have Ember autogenerate one for you.</li>\n        <li>Be sure your application.handlebars <strong>contains an outlet</strong> so Ember has \n            a target to render your application into!</li>\n      </ul>\n      <h3>Application Information</h3> \n      <table class=\"table\">\n        <tr>\n          <th>Namespace</th>\n          <td>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller.namespace", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          <td></td>\n        </tr>\n          <th>Controller</th>\n          <td>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller._debugContainerKey", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          <td>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "controller", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n        <tr>\n          <th>View</th>\n          <td>\n            ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "view.renderedName", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n          </td>\n          <td>\n            ");
  hashTypes = {};
  stack1 = helpers['with'].call(depth0, "view", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n          </td>\n        </tr>\n        <tr>\n          <th>Route</th>\n          <td>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "currentPath", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</td>\n          <td></td>\n        </tr>\n      </table>\n      <h3>\n      <p class=\"lead text-error\"><strong>Outlet is here</strong></p>\n      ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n  </div>\n</div>\n");
  return buffer;
  
});