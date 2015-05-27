'use strict';

module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['Firefox'],
    colors: true,
    singleRun: true,
    frameworks: [
      'mocha',
      'chai',
    ],
    files: [
      'tests/test-loader.js',
    ],
    preprocessors: {
      'tests/test-loader.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'],
    webpack: {
     resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['dist', 'src', 'tests', 'node_modules'],
      },
    },
    webpackServer: {
      noInfo: true,
    },
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-firefox-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
  });
};
