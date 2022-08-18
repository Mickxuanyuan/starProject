const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const Optimize = require('./optimization');
let webpackConfig = webpackMerge.merge(baseConfig, {
  mode: 'production',
  optimization: Optimize
})

if(process.env.SPEEDANA) {
  const smp = new SpeedMeasurePlugin();
  webpackConfig = smp.wrap(
    webpackConfig
  )
}

module.exports = webpackConfig;
