Date.prototype.format = function (format) {
   var args = {
	   "M+": this.getMonth() + 1,
	   "d+": this.getDate(),
	   "h+": this.getHours(),
	   "m+": this.getMinutes(),
	   "s+": this.getSeconds(),
	   "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
	   "S": this.getMilliseconds()
   };
   if (/(y+)/.test(format))
	   format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   for (var i in args) {
	   var n = args[i];
	   if (new RegExp("(" + i + ")").test(format))
		   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
   }
   return format;
};
function getBrowser(){
    var userAgent = navigator.userAgent;
    if(userAgent.indexOf("Trident")>-1){
        return "IE";
    }else if(userAgent.indexOf("Chrome")>-1){
        return "Chrome";
    }else if(userAgent.indexOf("Firefox")>-1){
        return "Firefox";
    }else{
        return "IE";
    }
}
//判断是否是ie且给出ie版本号
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器 
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器 
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }  
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11 
    }else{
        return -1;//不是ie浏览器
    }
}
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
 //用于生成uuid
function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function getRandomNumber(length) {
   if (length > 0) {
       var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
       var nums = "";
       for (var i = 0; i < length; i++) {
           var r = parseInt(Math.random() * 10);
           nums += data[r];
       }
       return nums;
   } else {
       return false;
   }
}
function virtualFormPost(url, params, type) {
    if (document.querySelector("#temp_ifm")) {
        try{
            document.querySelector("#temp_form").remove();
        }catch (e) {
            console.log(e);
            //ie不支持remove方法，用removeNode
            console.log(e);
            //ie不支持remove方法，用removeNode
            var curform = document.querySelector("#temp_form");
            var childs = curform.childNodes;
            for (var i = 0; i < childs.length; i++) {
                curform.removeChild(childs[i])
            }
            document.querySelector("#temp_form").removeNode();
        }
    }

    // 创建form元素
    var temp_form = document.createElement("form");
    // 设置form属性
    temp_form.id = 'temp_form';
    temp_form.action = url;
    temp_form.target = type == null ? '_self' : type;
    temp_form.method = "post";
    temp_form.style.display = "none";
    // 处理需要传递的参数
    for (var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = encodeURIComponent(params[x]);
        temp_form.appendChild(opt);
    }
    document.body.appendChild(temp_form);
    // 提交表单
    temp_form.submit();
}

function virtualIframePost(url, params) {
    if (document.querySelector("#temp_ifm")) {
        try{
            document.querySelector("#temp_ifm").remove();
            document.querySelector("#temp_form").remove();
        }catch (e) {
            console.log(e);
            //ie不支持remove方法，用removeNode
            var curform = document.querySelector("#temp_form");
            var childs = curform.childNodes;
            for (var i = 0; i < childs.length; i++) {
                curform.removeChild(childs[i])
            }
            document.querySelector("#temp_form").removeNode();
            document.querySelector("#temp_ifm").removeNode();
        }
    }

    // 创建form元素
    var temp_ifm = document.createElement("iframe");
    temp_ifm.id = "temp_ifm";
    temp_ifm.name = "target1";
    temp_ifm.style.display = "none";

    var temp_form = document.createElement("form");
    document.body.appendChild(temp_form);
    document.body.appendChild(temp_ifm);
    // 设置form属性
    temp_form.id = 'temp_form';
    temp_form.style.display = 'none';
    temp_form.target = 'target1';
    temp_form.action = url;
    temp_form.method = "post";
    // 处理需要传递的参数
    for (var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = encodeURIComponent(params[x]);
        temp_form.appendChild(opt);
    }

    // 提交表单
    temp_form.submit();
}
var DynamciLoadUtil = {
    // 动态加载外部js文件，并执行回调
    loadJS: function(url, callback){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        if(typeof callback == 'function'){
            script.onload = script.onreadystatechange = function(){
                if(!this.readyState || this.readyState == 'loaded'
                    || this.readyState == 'complete'){
                    callback();
                    script.onload = script.onreadystatechange = null;
                }
            }
        }
        document.body.appendChild(script);
        //document.getElementsByTagName('body')[0].appendChild(script);
    },
    // 行内方式动态加载js代码
    loadJSText: function(jsText){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        try {
            // Firefox,Safari,Chrome,Opera支持
            script.appendChild(document.createTextNode(jsText));
        } catch(ex){
            // IE早期的浏览器，需要使用script的text属性来指定js代码
            script.text = jsText;
        }
        document.body.appendChild(script);
    },
    // 动态加载外部CSS文件
    loadCSS:function(url){
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    // 使用<style>标签包含嵌入式CSS
    loadCSSText: function(cssText){
        var style = document.createElement('style');
        style.type = 'text/css';
        try{
            // Firefox,Safari,Chrome,Opera支持
            style.appendChild(document.createTextNode(cssText));
        } catch(ex){
            // IE早期浏览器，需要使用style元素的styleSheet属性的cssText属性
            style.styleSheet.cssText = cssText;
        }
    }
}