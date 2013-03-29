##Why is this useful?##
Ember will "just work" out of the box and is backed up by a robust toolset for managing .coffee .js .handlebars .css .sass and much more!

This package provides a organizational base for your code that will allow you to write manageable and large javascript applications
in Ember.js without wanting to pull your hair out.

Watch tasks and browser livereload will greatly improve the speed of prototyping, styling, and debugging.  These are amazing improvements!

##Key features:##

**coffeescript compilation** (optional and changeable)<br />
**handlebars compilation** (uses ember-specific JST wrapping)<br />
**sass compilation** (optional and changeable)<br />
**minispade module system** (excellent lightweight module loading system built by Yehuda Katz)<br />
**file watching** (watch changes in coffee,handlebars,js,and sass files)<br />
**browser livereload** (anytime a watched file changes, your browser will reload automatically after re-compilation)<br />

##Get started##
###Setup for SASS (optional)###
1. Install ruby by whatever means you prefer and install sass compiler
http://ruby-lang.org<br/>
http://sass-lang.com
###Setup for node (not optional)###
1. Install node, npm, and grunt
http://nodejs.org<br />
http://npmjs.org<br />
2. Install grunt: sudo npm install -g grunt
###Install project###
1. Clone this repo
2. Run "npm install" in the project directory.  This will use the list of dependencies found in package.json to install the required
packages from npm.
3. Open a terminal window and type: node index.js to start the server (change port if desired in index.js)
3. Open a second terminal and type: grunt 4south (this uses coffeescript and sass) or grunt vanilla (css and js) 
4. Open localhost:1234 (or any port you changed to in index.js) in the browser and be happy

###Testing file watching, recompilation, and livereload###
To test these features, open any coffeescript file found in public/coffee and make some changes (or just save) and then save them.  You 
should see your browser window refresh itself and if you have made changes that are visible you will see them reflected in the browser in near-
realtime.<br />

The easiest file to change to see immediate changes is the application.handlebars file found in public/handlebars.
##I don't want to use some of these dependencies##
###Using Javascript over Coffeescript###
Open the Gruntfile and change your regarde task to watch .js files found in your public/js folder.  Remove the call to the "coffee" task from the tasks list under regarde.coffee.<br />
Change your minispade task to target public/js/ instead of public/compiled-js/.
###Using CSS over SASS###
Open the Gruntfile and change your regarde task to watch .css files found in your public/css folder.  Remove the call to the "sass" task from the tasks list under regarde.sass<br />
