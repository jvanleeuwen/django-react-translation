const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    home: './home/react/index.js',
    news: './news/react/index.js',
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: path.resolve(__dirname, 'static/'),
    publicPath: '/static/',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },

  externals: {
    django: 'django',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.DefinePlugin({ MARK_TRANSLATIONS: false }),
  ],

};
