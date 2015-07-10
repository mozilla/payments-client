'use strict';

module.exports = {
  basePath: '',
  browsers: ['Firefox'],
  colors: true,
  frameworks: [
    'mocha',
    'chai',
    'sinon',
  ],
  files: [
    'tests/test-loader.js',
  ],
  preprocessors: {
    'tests/test-loader.js': ['webpack', 'sourcemap'],
  },
  reporters: ['mocha'],
  singleRun: true,
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
    'karma-sinon',
    'karma-sourcemap-loader',
    'karma-webpack',
  ],
};
