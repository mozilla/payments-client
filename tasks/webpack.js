'use strict';

var webpackConfig = require('../webpack.config.js');

module.exports = {
  options: webpackConfig,
  dist: {},
  watch: {
    watch: true,
    keepalive: true
  }
};
