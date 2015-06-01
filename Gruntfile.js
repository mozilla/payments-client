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

  grunt.registerTask('publish-release', function() {
    // Require the build
    this.requires(['build']);

    if (process.env.TRAVIS === 'true' &&
        process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
        process.env.TRAVIS_PULL_REQUEST === 'false') {
      grunt.log.writeln('Pushing branch for release');
      grunt.task.run('gh-pages:release');
    } else {
      grunt.log.writeln('Skipped release publication');
    }
  });

  grunt.registerTask('build', ['webpack:dist']);
  grunt.registerTask('test', ['webpack:dist', 'karma:run', 'eslint']);
};
