/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
const externals = ['Waypoint', '$'];

const libraryName = 'TwoStep';

const config = {
  entry: {
    'two-step': __dirname + '/src/index.js',
    'two-step.min': __dirname + '/src/index.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  externals
};

module.exports = config;