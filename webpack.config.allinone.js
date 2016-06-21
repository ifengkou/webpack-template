/*
 * @Author:sloong
 * @Date: 2016-06-14
 */
'use strict';

var webpack = require("webpack");
var path = require("path");
var glob = require('glob')

//路径定义
var srcDir = path.resolve(process.cwd(), 'src');
var distDir = path.resolve(process.cwd(), 'dist');
var nodeModPath = path.resolve(__dirname, './node_modules');
var pathMap = require('./src/pathmap.json');
var publicPath = '/';
//插件定义
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

//入口文件定义
var entries = function () {
    var jsDir = path.resolve(srcDir, 'js')
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}
//html_webpack_plugins 定义
var html_plugins = function () {
    var entryHtml = glob.sync(srcDir + '/*.html')
    var r = []
    var entriesFiles = entries()
    for (var i = 0; i < entryHtml.length; i++) {
        var filePath = entryHtml[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var conf = {
            template: 'html!' + filePath,
            filename: filename + '.html'
        }
        //如果和入口js文件同名
        if (filename in entriesFiles) {
            conf.inject = 'body'
            conf.chunks = ['vendor', filename]
        }
        //跨页面引用，如pageA,pageB 共同引用了common-a-b.js，那么可以在这单独处理
        //if(pageA|pageB.test(filename)) conf.chunks.splice(1,0,'common-a-b')
        r.push(new HtmlWebpackPlugin(conf))
    }
    return r
}

module.exports = function(options){
    options = options || {}
    var debug = options.debug !==undefined ? options.debug :true;

    var plugins = [];

    var extractCSS;
    var cssLoader;
    var sassLoader;

    plugins.push(new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
    }));

    if(debug){
        extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
        cssLoader = extractCSS.extract(['css'])
        sassLoader = extractCSS.extract(['css', 'sass'])

        plugins.push(extractCSS)
    }else{
        extractCSS = new ExtractTextPlugin('css/[contenthash:8].[name].min.css', {
            // 当allChunks指定为false时，css loader必须指定怎么处理
            allChunks: false
        })
        cssLoader = extractCSS.extract(['css?minimize'])
        sassLoader = extractCSS.extract(['css?minimize', 'sass'])

        plugins.push(
            extractCSS,
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                mangle: {
                    except: ['$', 'exports', 'require','avalon']
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.NoErrorsPlugin()
        )
    }

    //config
    var config = {
        entry: Object.assign(entries(), {
            // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包
            'vendor': ['jquery', 'avalon']
        }),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "js/[name].js",
            chunkFilename: '[chunkhash:8].chunk.js',
            publicPath: publicPath
        },
        module: {
            loaders: [
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    loaders: [
                        //小于10KB的图片会自动转成dataUrl，
                        'url?limit=10000&name=img/[hash:8].[name].[ext]',
                        'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
                    ]
                },
                {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                    loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
                },
                {test: /\.(tpl|ejs)$/, loader: 'ejs'},
                {test: /\.css$/, loader: cssLoader},
                {test: /\.scss$/, loader: sassLoader}
            ]
        },
        resolve: {
            extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg'],
            root: [srcDir, nodeModPath],
            alias: pathMap,
            publicPath: '/'
        },
        plugins: plugins.concat(html_plugins())
    }

    return config;
}


