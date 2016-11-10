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

  output: {
    path: __dirname,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new webpack.DefinePlugin({ MARK_TRANSLATIONS: false }),
  ],

};
