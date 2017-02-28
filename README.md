# webpack-template #
基于webpack搭建纯静态页面型前端工程解决方案模板

- 按需加载模块，按需进行懒加载，在实际用到某些模块的时候再增量更新
- 多入口文件，自动扫描入口。同时支持SPA和多页面型的项目
- 静态资源按需自动注入到html中，并可自动加上hash值
- 支持js、css、scss等代码检查、打包、压缩混淆、图片转base64等
- 公用lib组件抽离打包，生成一个公共的bundle文件
- 功能标识，根据开发/测试环境和生产环境进行不同配置的打包
- 支持自动部署打包发布远程服务器

该项目的拆解共7篇博文，从0开始搭建，详情见: [cnblog-webpack](http://www.cnblogs.com/sloong/tag/webpack/)

## why webpack？ ##

- **它和browserify类似** 但是它可以把你的应用拆分成多个文件。如果你的单页应用里有很多页面，用户只会下载当前访问页面的代码。当他们访问应用中的其他页面时，不再需要加载与之前页面重复的通用代码。
- **它可以替代gulp和grunt** 因为他可以构建打包css、预处理css、编译js和图片等。
- **它支持AMD和CommonJS**，以及其他的模块系统(Angular, ES6)。如果你不太熟悉如何使用，就用CommonJS吧。


## 环境 ##

- Node.js

## 拷贝项目模板 ##

    $ git clone https://github.com/ifengkou/webpack-template.git

## 安装依赖 ##

    $ cd webpack-template
	$ npm install

## 目录结构 ##

``` js
    .
    ├── config.rb                 # compass配置
    ├── gulpfile.js               # gulp任务配置
    ├── mock/                     # 假数据文件
    ├── package.json              # 项目配置
    ├── README.md                 # 项目说明
    ├── src                       # 源码目录
    │   ├── pageA.html                # 入口文件a
    │   ├── pageB.html                # 入口文件b
    │   ├── pageC.html                # 入口文件c
    │   ├── css/                  # css资源
    │   ├── img/                  # 图片资源
    │   ├── js                    # js&jsx资源
    │   │   ├── pageA.js              # a页面入口
    │   │   ├── pageB.js              # b页面入口
    │   │   ├── pageC.js              # c页面入口
    │   │   ├── helpers/          # 业务相关的辅助工具
    │   │   ├── lib/              # 没有存放在npm的第三方库或者下载存放到本地的基础库，如jQuery、Zepto、React等
    │   │   └── utils/            # 业务无关的辅助工具
    │   ├── scss/                 # scss资源
    │   ├── pathmap.json          # 手动配置某些模块的路径，可以加快webpack的编译速度
    ├── webpack.config.allinone.js    # webpack配置
    ├── webpack.config.js         # 正式环境webpack配置入口
    └── webpack-dev.config.js     # 开发环境webpack配置入口
```

## 开发要求 ##

约定/src/*.html为应用的入口文件，在/src/js/ 一级目录下需有一个同名的js文件作为该文件的入口。

## 编译（测试/dev环境） ##

    $ npm run build

## 编译（生产环境） ##

生产环境会对js混淆压缩，对css、html进行压缩，字符替换等处理

    $ npm run build-online

## 部署发布 ##

在gulpfile.js 中配置好localServer和remoteServer，编译后将dist目录发布到服务端

发布到localServer

    $ npm run deploy

发布到remoteServer

    $ npm run deploy-online

## 本地调试 ##

    $ npm run server
    # 或者 下面两种模式
    $ webpack-dev-server
    $ webpack-dev-server --inline

## Jenkins 持续集成 ##

jenkins服务器需要nodejs,配置下面的脚本

    $ npm run build-online
    $ npm run deploy-online





