const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    runtimeChunk: {
        name: "runtime",
    },
    minimize: true,
    minimizer: [
        new TerserPlugin({
            parallel: true,
        }),
        new CssMinimizerPlugin(), // 有多个选项详情看官网
    ],
    splitChunks: {
        chunks: "all",
        minChunks: 2, // 表示被引用次数，默认为1；
        maxAsyncRequests: 5, //所有异步请求不得超过5个
        maxInitialRequests: 4, //初始话并行请求不得超过3个
        cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
            common: {
                test: /src\/(utils|components)/,
                name: "commons",
                priority: 20,
            },
            defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                minChunks: 1,
                priority: -10,
                reuseExistingChunk: true,
            },
            antd: {
                chunks: 'all',
                test: /node_modules\/antd/,
                name: 'antd',
                priority: 10,
                reuseExistingChunk: true,
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        }
    }
}