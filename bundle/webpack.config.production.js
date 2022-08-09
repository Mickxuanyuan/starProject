const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

let webpackConfig = webpackMerge.merge(baseConfig, {
  mode: 'production'
})
module.exports = webpackConfig;
