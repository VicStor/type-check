'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: require.resolve('babel-loader')
      }
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
