'use strict';

var grunt = require('grunt');
var webpackConfig = require('../webpack.config.js');

module.exports = {
  local: {
    port: grunt.option('port') || 8080,
    webpack: webpackConfig,
    contentBase: 'dist',
    keepalive: true,
    hot: true,
    inline: true,
  }
};
