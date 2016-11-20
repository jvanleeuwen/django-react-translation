const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const OfflinePlugin = require('offline-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    home: './home/react/index.js',
    news: './news/react/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'static'),
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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: {
            loader: 'css',
            query: {
              module: true,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
        }),
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
    new ExtractTextPlugin('styles.css'),
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
