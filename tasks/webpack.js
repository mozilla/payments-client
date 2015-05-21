'use strict';

var webpackConfig = require('../webpack.config.js');

module.exports = {
  options: webpackConfig,
  // Target
  dist: {
    stats: {
      // Configure the console output
      colors: true,
      modules: true,
      reasons: true,
    },
    failOnError: true,
  },
};
