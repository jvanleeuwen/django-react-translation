const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const OfflinePlugin = require('offline-plugin');

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
        loader: 'happypack/loader?id=js',
        include: [
          path.resolve(__dirname, 'home'),
          path.resolve(__dirname, 'news'),
        ],
      },
    ],
  },

  externals: {
    django: 'django',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HappyPack({
      id: 'js',
      loaders: ['babel?cacheDirectory'],
    }),
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/static/',
    }),
  ],

};
