const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderFactory = require('./bundle/loaders');
module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, './src/index.tsx')
    },
    output: {
        filename: 'js/[name].[hash:5].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules:[
            ...new LoaderFactory().getLoaders()
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/", "index.html")
        })
    ]
}
