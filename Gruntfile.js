'use strict';

module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'tasks/*.js',
    },
  });

  // Conditionally run saucelabs tests if we have the
  // secure vars or a normal test run if not.
  grunt.registerTask('test-ci', function() {
    if (process.env.TRAVIS_SECURE_ENV_VARS === 'true') {
      grunt.log.writeln('Running full SauceLabs test suite');
      grunt.task.run('test-sauce');
    } else {
      grunt.log.writeln('Running limited test suite');
      grunt.task.run('test');
    }
  });

  grunt.initConfig(configs);
  grunt.registerTask('build', ['webpack:dist']);
  grunt.registerTask('start', ['webpack:watch']);
  grunt.registerTask('serve', ['webpack-dev-server']);
  grunt.registerTask('test', ['webpack:dist', 'karma:run', 'eslint']);
  grunt.registerTask('test-sauce', ['webpack:dist', 'karma:sauce', 'eslint']);
};
