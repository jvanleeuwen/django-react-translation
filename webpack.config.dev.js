const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');

module.exports = {

  cache: true,

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
      'classnames',
      'react',
      'react-dom',
    ],
  },

  output: {
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
        loader: 'happypack/loader?id=css',
        include: [
          path.resolve(__dirname, 'home'),
          path.resolve(__dirname, 'news'),
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.css'],
  },

  externals: {
    django: 'django',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HappyPack({
      id: 'js',
      loaders: ['babel?cacheDirectory'],
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style!css?module&localIdentName=[local]_[hash:base64:5]'],
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: /vendor/,
    }),
  ],

};
