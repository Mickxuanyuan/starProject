const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const {
  NODE_ENV
} = process.env;
class LoaderFactory {
  constructor() {
    this.isProd = NODE_ENV === 'production';
    this.loaders = [];
  }

  // 读取主题配置
  getModifyVars() {
    const modifyVars = path.resolve(__dirname, '../src/assets/styles/var.modify.less');
    return modifyVars;
  }
  // 读取全局变量配置
  getGlobalVars() {
    const globalVars = require(path.resolve(__dirname, '../src/assets/styles/var.global.json'));
    return globalVars;
  }

  // 生成样式配置
  getStyleLoader(options) {
     // 生产环境提取 CSS
    const styleLoaderPre = this.isProd ? {
      loader: MiniCSSExtractPlugin.loader
    } : {
      loader: 'style-loader'
    }
    const loaderConfig = {
      use: [
        styleLoaderPre,
        {
          loader: require.resolve("@teamsupercell/typings-for-css-modules-loader"), //Webpack 加载器，它从 css 加载器动态生成 CSS 模块的 TypeScript 类型
          options: {
            banner: "//自动生成 请勿修改"
          }
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: options.isModule ? {
              exportLocalsConvention: 'camelCase',
              localIdentName: '[name]__[local]--[contenthash:base64:5]',
            } : false,
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [
                require('autoprefixer'),
              ]
            }
          }
        }
      ]
    }

    const lessLoaderConfig = {
      loader: require.resolve('less-loader'),
      options: {
        // 全局变量
        lessOptions: {
          globalVars: this.getGlobalVars(),
          modifyVars: {
            'hack': `true; @import "${this.getModifyVars()}";`
          },
          javascriptEnabled: true
        }
      }
    }

    // Test module.less 和 less 分开解析 | css 和 less 分开解析
    loaderConfig.test = options.isModule ? RegExp(`\.(module|component)\.${options.style}$`) : RegExp(`\.${options.style}$`)

    // 如果是less 添加less-loader 并添加部分全局变量
    options.style === 'less' && loaderConfig.use.push(lessLoaderConfig);

    // Exclude
    if (!options.isModule) {
      loaderConfig.exclude = RegExp(`\.(module|component)\.${options.style}$`);
    }

    return loaderConfig;
  }

  // 打包TS
  getTsLoader() {
    const tsLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('swc-loader'),
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
                runtime: 'automatic',
              }
            },
          }
        }
      },

    };
    return tsLoader;
  }

  // 打包图片
  getAssetsLoader() {
    const imgLoader = {
      test: /\.(png|jpg|svg|jpeg|gif|eot|ttf|woff|woff2|TFF)$/,
      type: 'asset',
      generator: {
        filename: 'images/[name].[contenthash:5][ext]'
      },
      parser: {
        dataUrlCondition: {
          // webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型。
          maxSize: 4 * 1024 // 4kb
        }
      }
    };
    return imgLoader;
  }

  // 整合css
  getCssLoader() {
    const LessLoader = this.getStyleLoader({  // 对于 .module.less .component.less 的处理
      isModule: true,
      style: 'less'
    });

    const CssLoader = this.getStyleLoader({ // 对于 .module.css .component.css 的处理
      isModule: true,
      style: 'css'
    });

    const LessLoaderGlobal = this.getStyleLoader({ // 对于 .less 的处理
      isModule: false,
      style: 'less'
    });

    const CssLoaderGlobal = this.getStyleLoader({ // 对于 .css 的处理
      isModule: false,
      style: 'css'
    });

    return [LessLoader, LessLoaderGlobal, CssLoader, CssLoaderGlobal]
  }

  // 整合所有打包文件
  getLoaders() {
    const TsLoader = this.getTsLoader();
    const AssetsLoader = this.getAssetsLoader();
    const cssLoaderArr = this.getCssLoader();

    this.loaders.push(
      TsLoader,
      AssetsLoader,
      ...cssLoaderArr
    );

    return this.loaders;
  }
}

module.exports = LoaderFactory;
