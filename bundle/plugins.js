const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {
  NODE_ENV
} = process.env;
class PluginFactory {
  constructor() {
    this.isProd = NODE_ENV === 'production';
    this.plugins = [];
  }

  getWebpackBarPlugin() {
    this.plugins.push(
      new WebpackBar()
    )
  }

  getHtmlWebpackPlugin() {
    this.plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/", "index.html")
      })
    )
  }

  getDotenv() {
    this.plugins.push(
      new Dotenv({
        path: path.resolve(__dirname, `../enviroment/.env.${NODE_ENV}`)
      })
    );
  }

  getHotModuleReplacementPlugin() {
    this.plugins.push(new ReactRefreshPlugin())
  }

  getPlugins() {
    if (!this.isProd) {
      // 热更新
      this.getHotModuleReplacementPlugin()
    }
    this.getHtmlWebpackPlugin();
    this.getDotenv();

    return this.plugins;
  }
}

module.exports = PluginFactory;