module.exports = (grunt) ->
  
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    
    clean: ["public/compiledJS/"]
  
    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: 'compiledJS/'
      files:
        src: ['public/compiledJS/**/*.js']
        dest: 'app.js'

    coffee:
      options:
        bare: true
      compile:
        files:
          'index.js': 'index.coffee'
      glob_to_multiple:
        expand: true
        cwd: 'public/coffee/'
        src: ['*.coffee']
        dest: 'public/compiledJS'
        ext: '.js'

    watch:
      files: ['coffee/*.coffee', 'index.coffee']
      tasks: ['clean', 'coffee', 'minispade']

  grunt.loadNpmTasks('grunt-contrib')
  grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-docco')
  grunt.loadNpmTasks('grunt-minispade')

  grunt.registerTask('default', ['clean', 'coffee', 'minispade'])
