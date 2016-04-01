var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './src',
    hot: true
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      }
    ]
  },
  postcss: function(){
    return [
      require('autoprefixer')
    ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
