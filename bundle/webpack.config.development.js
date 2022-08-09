const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
let webpackConfig = webpackMerge.merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  output: {
    filename:'js/[name].js',
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
  },
  devServer: {
    hot: true
  }
})

module.exports = webpackConfig;
