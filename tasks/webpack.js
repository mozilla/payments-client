'use strict';

var defaults = require('lodash.defaults');
var webpackConfig = require('../webpack.config.js');

var defWebpackConfig = defaults({
  stats: {
    // Configure the console output
    colors: true,
    modules: true,
    reasons: true,
  },
  failOnError: true,
}, webpackConfig);


module.exports = {
  dist: defWebpackConfig,
  watch: defaults({
    watch: true,
    keepalive: true,
  }, defWebpackConfig),
};
