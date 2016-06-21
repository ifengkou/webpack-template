# Webpack-Avalon #
基于webpack搭建纯静态页面型前端工程解决方案模板

## 环境 ##

- Node.js

## 拷贝项目模板 ##

    $ git clone https://github.com/ifengkou/webpack-avalon.git

## 安装依赖 ##

    $ cd webpack-avalon
	$ npm install

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

## 开发要求 ##

约定/src/*.html为应用的入口文件，在/src/js/ 一级目录下需要一个同名的js文件作为该文件的入口。

