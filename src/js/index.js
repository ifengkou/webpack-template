/**
 * Created by sloong on 2016/6/1.
 */
//在pathmap.json 里面配置了commons.css的alias别名 commonCss
require('commonCss');
require('../css/index.css');
//avalon 测试
var avalon = require('avalon');
avalon.define({
    $id: "avalonCtrl",
    name: "Hello Avalon!"
});

/*
//zepto 测试
require("zepto")

$("<div>这是zepto生成的</div>").appendTo("body")*/

//jquery 测试
var $ = require("jquery");
$("<div>这是jquery生成的</div>").appendTo("body");