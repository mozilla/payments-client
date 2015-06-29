'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  failOnError: true,
  output: {
      path: './dist',
      filename: 'payments-client.js',
      libraryTarget: 'umd',
      library: 'PaymentsClient',
  },
  plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
          },
      }),
  ],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['src'],
  },
  stats: {
    // Configure the console output
    colors: true,
    modules: true,
    reasons: true,
  },
};
