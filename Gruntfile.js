'use strict';

module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'tasks/*.js',
    },
  });

  grunt.initConfig(configs);
  grunt.registerTask('build', ['webpack:dist']);
  grunt.registerTask('watch', ['webpack:watch']);
  grunt.registerTask('test', ['webpack:dist', 'karma:run', 'eslint']);
};
