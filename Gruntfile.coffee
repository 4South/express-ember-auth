'use strict'
path = require('path')
lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet

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

    sass:
      dist:
        options:
          trace: true
          style: 'expanded'
        files:
          'public/css/appcss.css': 'public/sass/app.sass'

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
  grunt.loadNpmTasks('grunt-ember-templates')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-minispade')

  grunt.registerTask('withreload', [
                                        'livereload-start',
                                        'ember_templates',
                                        'clean',
                                        'sass',
                                        'coffee',
                                        'minispade'
                                        'regarde'             ])

  grunt.registerTask('default', [
                                        'ember_templates',
                                        'clean',
                                        'sass',
                                        'coffee',
                                        'minispade'
                                        'rebuild'             ])
