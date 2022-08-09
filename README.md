# React18 + typescript +webpack5 + react-router6 + swc + HRM
<a name="qNMEM"></a>
## 第一阶段
> 目标：包含react18 + typescript + webpack + swc + react-router6 + pnpm 并能正常运行

<a name="LEySa"></a>
##### 核心

- 使用swc作为编译ts的编译器（速度快的飞起）
- 封装router，便于后期维护
- 全新的jsx转化 [官方介绍](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

下面展示部分核心代码，该阶段的全部代码可以从[仓库链接](https://github.com/Mickxuanyuan/starProject/tree/step1) （阶段一代码）中获取
<a name="LG8ex"></a>
##### 当前阶段目录结构
```json
├─package.json
├─pnpm-lock.yaml
├─tsconfig.json
├─webpack.config.js
├─src
|  ├─index.tsx
|  ├─utils
|  |   ├─routes
|  |   |   ├─IRoute.ts
|  |   |   └routes.service.tsx
|  ├─pages
|  |   ├─app.component.tsx
|  |   ├─app.routes.ts
|  |   ├─login
|  |   |   └login.page.tsx
|  ├─components
├─public
|   └index.html
```
<a name="kPSe2"></a>
##### 依赖安装
package.json
```json
{
  "name": "star-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0"
  },
  "devDependencies": {
    "@swc/core": "^1.2.224",
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "html-webpack-plugin": "^5.5.0",
    "swc-loader": "^0.2.3",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3"
  }
}
```
<a name="Ix6SN"></a>
##### 初始化入口
index.tsx
```json
import ReactDOM from 'react-dom/client';
import App from './pages/app.component';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
```
<a name="q7eGr"></a>
##### 封装router
routes.service.tsx
```typescript
import React from 'react';
import { Route, Routes, RouteProps } from 'react-router-dom';
import { IRoute, RouteComponent, RouteComponentPromise } from './IRoute';


function LazyloadLoadingComponent() {
  return <div>Loading</div>
}

export class RoutesService {
  // 渲染路由
  static renderRoutes(routes: IRoute[]) {
    const RoutesArr = routes.map(route => {
      const ReactNode = RoutesService.render(route);
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<ReactNode/>}
        />
      );
    });

    return <Routes>{RoutesArr}</Routes>
  }

  // 路由
  static render(route: IRoute) {
    return (props: RouteProps) => {
      let TargetComponent = route.component as RouteComponent;
        if (route.lazyload) {
          TargetComponent = React.lazy(route.component as RouteComponentPromise);
          return (
            <React.Suspense fallback={<LazyloadLoadingComponent />}>
              <TargetComponent {...props} />
            </React.Suspense>
          );
        }
        return <TargetComponent {...props} />;
    };
  }
}

```
<a name="MNfMc"></a>
##### webpack配置
```javascript
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
            runtime: 'automatic' // 对应react-jsx
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

```
<a name="Teg7h"></a>
## 第二阶段
> 目标 less css-module image antd 在ts环境下能正常运行

<a name="XG6Mq"></a>
##### 核心

- antd的引入
- css module在ts环境下生成.d.ts 
- less 全局变量以及antd theme的订制化
- image静态资源的引入

下面展示部分核心代码，该阶段的全部代码可以从[仓库代码](https://github.com/Mickxuanyuan/starProject/tree/step2)（阶段二代码）中获取
<a name="Qwb4A"></a>
##### 当前目录结构
```json
├─package.json
├─pnpm-lock.yaml
├─tsconfig.json
├─webpack.config.js
├─typings
|    └global.d.ts // 全局处理ts类型比如图片的
├─src
|  ├─index.tsx
|  ├─utils
|  |   ├─routes
|  |   |   ├─IRoute.ts
|  |   |   └routes.service.tsx
|  ├─pages
|  |   ├─app.component.tsx
|  |   ├─app.routes.ts
|  |   ├─login
|  |   |   ├─login.module.less
|  |   |   ├─login.module.less.d.ts
|  |   |   └login.page.tsx
|  ├─components
|  ├─assets      // * 用于存放静态资源
|  |   ├─styles  // * 存放全局样式和全局变量
|  |   |   ├─var.global.json 
|  |   |   └var.modify.less
|  |   ├─images  // * 存放images
|  |   |   └gmail.png
├─public
|   └index.html
├─bundle
|   └loaders.js  // * 封装的loaders
```
<a name="HnDs4"></a>
##### 依赖安装
```json
{
  "name": "star-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "antd": "^4.22.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0"
  },
  "devDependencies": {
    "@swc/core": "^1.2.224",
    "@teamsupercell/typings-for-css-modules-loader": "^2.5.1",
    "@types/react": "^18.0.17",
    "@types/react-dom": "^18.0.6",
    "autoprefixer": "^10.4.8",
    "css-loader": "^6.7.1",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.3",
    "less-loader": "^11.0.0",
    "postcss-loader": "^7.0.1",
    "style-loader": "^3.3.1",
    "swc-loader": "^0.2.3",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3"
  }
}

```
<a name="Wqmb4"></a>
##### 添加less 和css module webpack配置并封装loader
```json
const path = require('path');
class LoaderFactory {
  constructor() {
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
    const loaderConfig = {
      use: [
        {
            loader: require.resolve('style-loader')
        },
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
              localIdentName: '[name]__[local]--[hash:base64:5]',
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

```



