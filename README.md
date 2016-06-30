# Webpack-Avalon #
基于webpack搭建纯静态页面型前端工程解决方案模板

- 按需加载模块，按需进行懒加载，在实际用到某些模块的时候再增量更新
- 静态资源自动注入html代码块，并可自动加上hash值
- 支持代码检查、打包、压缩混淆、图片转base64等
- 支持根据开发/测试环境和生产环境进行不同配置的打包
- 支持自动部署打包发布远程服务器

## 环境 ##

- Node.js

## 拷贝项目模板 ##

    $ git clone https://github.com/ifengkou/webpack-avalon.git

## 安装依赖 ##

    $ cd webpack-avalon
	$ npm install

## 开发要求 ##

约定/src/*.html为应用的入口文件，在/src/js/ 一级目录下需有一个同名的js文件作为该文件的入口。

## 编译（测试/dev环境） ##

    $ npm run build

## 编译（生产环境） ##

生产环境会对js混淆压缩，对css、html进行压缩，字符替换等处理

    $ npm run buildP

## 部署发布 ##

在gulpfile.js 中配置好localServer和remoteServer，编译后将dist目录发布到服务端

发布到localServer

    $ npm run deploy

发布到remoteServer

    $ npm run deployP

## 本地调试 ##

    $ npm run server
    # 或者 下面两种模式
    $ webpack-dev-server
    $ webpack-dev-server --inline

## Jenkins 持续集成 ##

    需要nodejs
    $ npm run buildP
    $ npm run deployP




