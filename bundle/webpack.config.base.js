const path = require('path');
const LoaderFactory = require('./loaders');
const PluginFactory = require('./plugins');
const getAlias = require('./alias');

module.exports = {
  entry:{
    main: path.resolve(__dirname,'../src/index.tsx')
  },
  output:{
    filename:'js/[name].[fullhash:5].js',
    path: path.resolve(__dirname,'../dist')
  },
  module:{
    rules:[
      ...new LoaderFactory().getLoaders()
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      ...getAlias()
    },
  },
  plugins:[
    ...new PluginFactory().getPlugins()
  ]
}