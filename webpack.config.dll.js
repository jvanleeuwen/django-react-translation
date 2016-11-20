const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    vendor: [
      'classnames',
      'react',
      'react-dom',
    ],
  },

  output: {
    filename: '[name].dll.js',
    library: '[name]',
    path: path.resolve(__dirname, 'static'),
  },

  plugins: [
    new webpack.DllPlugin({
      name: 'vendor',
      path: path.resolve(__dirname, 'static', '[name].json'),
    }),
  ],

};
