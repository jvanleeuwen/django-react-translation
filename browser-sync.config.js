const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.dev.js');

const bundler = webpack(webpackConfig);

module.exports = {
  open: false,

  proxy: 'localhost:8000',

  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        assets: true,
        chunkModules: false,
        chunks: false,
      },
    }),
    webpackHotMiddleware(bundler),
  ],

};
