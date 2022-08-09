const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
        loader: 'swc-loader',
        options: {
            jsc: {
                parser: {
                    tsx: true,
                    syntax: "typescript",
                    decorators: true,
                },
                target: "es5",
                transform: {
                  react: {
                    // swc-loader will check whether webpack mode is 'development'
                    // and set this automatically starting from 0.1.13. You could also set it yourself.
                    // swc won't enable fast refresh when development is false
                    runtime: 'automatic'
                  }
                }
            }
        }
    },
};
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
        rules: [tsLoader],
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
