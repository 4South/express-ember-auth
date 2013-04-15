'use strict'
path = require('path')

folderMount = (connect, point) ->
  connect.static(path.resolve(point))

module.exports = (grunt) ->
  
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
  
    clean:
      src: ['public/compiled-js/']

    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: 'public/compiled-js/'
      files:
        src: ['public/compiled-js/**/*.js']
        dest: 'public/dist/app.js'

    coffee:
      options:
        bare: true
      glob_to_multiple:
        expand: true
        cwd: 'public/coffee/'
        src: ['**/*.coffee']
        dest: 'public/compiled-js'
        ext: '.js'

    concat:
      css:
        src: "public/css/**/*.css"
        dest: "public/dist/appcss.css"

    sass:
      dist:
        options:
          trace: true
          style: 'expanded'
        files:
          'public/dist/appsass.css': 'public/sass/app.sass'

    ember_templates:
      compile:
        options:
          templateName: (sourceFile) ->
            return sourceFile.replace(/public\/handlebars\//,'')
        files:
          "public/dist/apptemplates.js": "public/handlebars/**/*.handlebars"
    
    regarde:
      coffee:
        files: 'public/coffee/**/*.coffee'
        tasks: ['clean', 'coffee', 'minispade', 'livereload', 'regarde']
      handlebars:
        files: 'public/handlebars/**/*.handlebars'
        tasks: ['ember_templates', 'livereload', 'regarde']
      sass:
        files: 'public/sass/**/*.sass'
        tasks: ['sass', 'livereload', 'regarde']
        

  grunt.loadNpmTasks('grunt-contrib-livereload')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-ember-templates')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-minispade')

  grunt.registerTask('vanilla', [
                                        'livereload-start',
                                        'ember_templates',
                                        'concat:css',
                                        'minispade'
                                        'regarde'             ])
  
  grunt.registerTask('4south', [
                                        'livereload-start',
                                        'ember_templates',
                                        'clean',
                                        'sass',
                                        'coffee',
                                        'minispade'
                                        'regarde'             ])

  grunt.registerTask('noreload', [
                                        'ember_templates',
                                        'clean',
                                        'sass',
                                        'coffee',
                                        'minispade'           ])
