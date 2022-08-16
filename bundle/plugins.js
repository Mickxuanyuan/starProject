const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const {
  NODE_ENV,
  BUNDLEANA
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

  getMiniCssExtractPlugin() {
      this.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:5].css'
        })
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

  getWebpackBarPlugin() {
    this.plugins.push(
      new WebpackBar()
    )
  }

  getBundleAnalyzerPlugin() {
    BUNDLEANA && this.plugins.push(new BundleAnalyzerPlugin());
  }

  getPlugins() {
    if (!this.isProd) {
      // 热更新
      this.getHotModuleReplacementPlugin();
    } else {
      this.getMiniCssExtractPlugin();
    }
   
    this.getBundleAnalyzerPlugin();
    this.getHtmlWebpackPlugin();
    this.getWebpackBarPlugin();
    this.getDotenv();
    return this.plugins;
  }
}

module.exports = PluginFactory;