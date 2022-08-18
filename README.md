## 第一阶段

> 目标：包含 react18 + typescript + webpack + swc + react-router6 + pnpm 并能正常运行

##### 核心

- 使用 swc 作为编译 ts 的编译器（速度快的飞起）
- 封装 router，便于后期维护
- 全新的 jsx 转化 [官方介绍](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

该阶段的全部代码可以从[仓库链接](https://github.com/Mickxuanyuan/starProject/tree/step1) （阶段一代码）中获取

## 第二阶段

> 目标 less css-module image antd 在 ts 环境下能正常运行

##### 核心

- antd 的引入
- css module 在 ts 环境下生成.d.ts
- less 全局变量以及 antd theme 的订制化
- image 静态资源的引入

该阶段的全部代码可以从[仓库代码](https://github.com/Mickxuanyuan/starProject/tree/step2)（阶段二代码）中获取
如果想看阶段一和阶段二的 Diff 可以点击[该链接](https://github.com/Mickxuanyuan/starProject/pull/1/files)

## 第三阶段

> 目标 dev 和 pro 环境区分 根据 tsconfig 配置获取 alias HRM 配置成功

##### 核心

- 引入 dotenv-webpack 区分环境变量
- 加入 getAlias 方法根据 tsconfig 获取 alias
- 使用@pmmmwh/react-refresh-webpack-plugin 实现 react 环境下的 HRM

该阶段的全部代码可以从[仓库代码](https://github.com/Mickxuanyuan/starProject/tree/step3)（阶段三代码）中获取
如果想看阶段二和阶段三的 Diff 可以点击[该链接](https://github.com/Mickxuanyuan/starProject/pull/2)

## 第四阶段

> 目标 构建速度优化 构建包的大小 优化项目访问速度

##### 核心 1 构建速度（前几个阶段也有部分是优化）

- 使用 speed-measure-webpack-plugin 进行构建速度分析
- 添加 cache

##### 核心 2 构建体积

- 使用 webpack-bundle-analyzer 进行构建速度分析
- 引入 MiniCssExtractPlugin
- css-minimizer-webpack-plugin 压缩 css
- terser-webpack-plugin 压缩 js
- 代码分割

该阶段的全部代码可以从[仓库代码](https://github.com/Mickxuanyuan/starProject/tree/step4)（阶段四代码）中获取
如果想看阶段三和阶段四的 Diff 可以点击[该链接](https://github.com/Mickxuanyuan/starProject/pull/3/files)

## 第五阶段

> 目标完善项目的规范

##### 核心

- 添加 eslint stylelint
- 添加 husky lint-stage prettier commitlint

该阶段的全部代码可以从[仓库代码](https://github.com/Mickxuanyuan/starProject/tree/step5)（阶段四代码）中获取
如果想看阶段三和阶段四的 Diff 可以点击[该链接](https://github.com/Mickxuanyuan/starProject/pull/4/files)

这里就暂时告一段落 后面就是项目目录书写比如状态管理工具，请求方式和一些规范的制定了。
