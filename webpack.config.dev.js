const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    home: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './home/react/index.js',
    ],
    news: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './news/react/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  devtool: 'source-map',

  output: {
    publicPath: '/static/',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'home'),
          path.resolve(__dirname, 'news'),
        ],
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },

  externals: {
    django: 'django',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.DefinePlugin({ MARK_TRANSLATIONS: false }),
  ],

};
