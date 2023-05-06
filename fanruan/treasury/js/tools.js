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
/**
* 获取两个时间月份差
*/
function getMonths(start, end,separater){
       var result = [];
       var starts = start.split('-');
       var ends = end.split('-');
       var staYear = starts[0]*1;
       var staMon = starts[1]*1 < 10? starts[1]:starts[1];
       var endYear = ends[0]*1;
       var endMon = ends[1]*1 < 10? ends[1]:ends[1];;
       result.push(staYear+separater+staMon);
       while (staYear <= endYear) {
               if (staYear === endYear) {
                       while (staMon < endMon) {
                               staMon++;
                               if(staMon < 10){
                                       result.push(staYear+separater+'0'+staMon);
                               }else{
                                       result.push(staYear+separater+staMon);
                               }
                       }
                       staYear++;
               } else {
                       staMon++;
                       if (staMon > 12) {
                               staMon = 1;
                               staYear++;
                       }
                       if(staMon < 10){
                               result.push(staYear+separater+'0'+staMon);
                       }else{
                               result.push(staYear+separater+staMon);
                       }
               }
       }
       return result;
}

/**
* 时间 月份向后推
* @param date
* @param num
*/
function getfMonths(date, num,separater){
       var dates = date.split('-');
       var year = dates[0]*1;
       var month = dates[1]*1;
       var i = 1;
       var result = [];
       result.push(dates[0]+separater+dates[1]);
       while(i < num){
               month++;
               if(month < 10){
                       result.push(year+separater+'0'+month);
               }else{
                       if(month < 13){
                               result.push(year+separater+month);
                       }else{
                               month = 1;
                               year++;
                               result.push(year+separater+'0'+month);
                       }
               }
               i++;
       }
       return result;
}
/**
* 时间 月份向前推
* @param date
* @param num
*/
function getlMonths(date, num, separater){
       var dates = date.split('-');
       var year_ = dates[0]*1;
       var month_ = dates[1]*1;
       var i = num;
       var result = [];
       while(i > 0){
               i--;
               var month = month_;
               var year = year_;
               if(i == 0){
                       result.push(dates[0]+separater+dates[1]);
               }else{
                       if(month_ < num){
                               month += 12;
                               year--;
                               month -= i;
                               if(month < 10){
                                       result.push(year+separater+'0'+month);
                               }else{
                                       if(month == 13){
                                               month = 1;
                                               result.push(year+separater+'0'+month);
                                       }else{
                                               result.push(year+separater+month);
                                       }
                               }
                       }else{
                               month -= i;
                               if(month < 10){
                                       result.push(year+separater+'0'+month);
                               }else{
                                       result.push(year+separater+month);
                               }
                       }
               }
       }
       return result;
}
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
function isIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
  else return false;
}
//判断是否是ie且给出ie版本号
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf("Trident") > -1 &&
    userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
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
};
function observer(){
(function (win) {
   'use strict';
   var listeners = [];
   var doc = win.document;
   var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
   var observer;
   function ready(selector, fn) {
       // 储存选择器和回调函数
       listeners.push({
           selector: selector,
           fn: fn
       });
       if (!observer) {
           // 监听document变化
           observer = new MutationObserver(check);
           observer.observe(doc.documentElement, {
               childList: true,
               subtree: true
           });
       }
       // 检查该节点是否已经在DOM中
       check();
   }
   function check() {
       // 检查是否匹配已储存的节点
       for (var i = 0; i < listeners.length; i++) {
           var listener = listeners[i];
           // 检查指定节点是否有匹配
           var elements = doc.querySelectorAll(listener.selector);
           for (var j = 0; j < elements.length; j++) {
               var element = elements[j];
               // 确保回调函数只会对该元素调用一次
               if (!element.ready) {
                   element.ready = true;
                   // 对该节点调用回调函数
                   listener.fn.call(element, element);
               }
           }
       }
   }
   // 对外暴露ready
   win.ready = ready;
})(window)
}
/* 
jkAction = function (url, token) {
  if (!url) return;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.responseType = "blob"; // 返回类型blob
  if (token) {
    xhr.setRequestHeader("JK-Token", token); //设置请求头
  } else {
    $("#virtualIfm").attr("src", url);
    return;
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      if (xhr.getResponseHeader("RedirectFlag") == "Y") {
        var blob = new Blob([xhr.response]);
        var reader = new FileReader();
        reader.readAsText(blob, "utf-8");
        reader.onload = function (e) {
          console.info(reader.result);
          console.log(JSON.parse(reader.result));
          var final_url = JSON.parse(reader.result).redirectUrl;
          jkAction(final_url, sessionStorage.getItem("token"));
        };
        return;
      }

      var dispoition = xhr.getResponseHeader("Content-Disposition") || "";
      var nameStr = dispoition.split(";")[1] || "";
      var fileName = decodeURIComponent(escape(nameStr.split("=")[1] || ""));
      var blob = new Blob([xhr.response]);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName; //a.download = '历史数据.xlsx'; // 成功
      a.click();
    } else {
      //请求失败处理
    }
  };
  // 发送ajax请求
  xhr.send(JSON.stringify({ foo: "bar" }));
};

var loadModal = function (url, name) {
    var html = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">\n' +
    '                              <div class="modal-dialog" role="document">\n' +
    '                                <div class="modal-content" style="width: 500px;background-color: #fafafa;">\n' +
    '                                  <div class="modal-header">\n' +
    '                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" id="_close">&times;</span></button>\n' +
    '                                    <h5 class="modal-title" id="myModalLabel">加载中……</h5>\n' +
    '                                  </div>\n' +
    '                                  <div class="modal-body" style="padding:0;">\n' +

    '<iframe id = "virtualIfm" src="" frameborder="no" border=0 scrolling="no" height="380" width="500"/>\n' +
    '                                  </div>\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div> ';
  $("body").append(html);
  if(name)
    jkActionFake(url, sessionStorage.getItem("token"));
  else
    jkAction(url, sessionStorage.getItem("token"));
  // 先不显示模态框，如果filter中跳转金库index.jsp后，再在index.jsp中再调用js显示
  //$("#myModal").modal('show');

  window.addEventListener("message", function (e) {
    var msgObj = JSON.parse(e.data);
    if (msgObj.type === "close") {
      $("#_close").click();
    }
    if (msgObj.myModalLabel) {
      $("#myModalLabel").html(msgObj.myModalLabel);
    }
    if (msgObj.src) {
      var lasturl = msgObj.src;
      console.log("msgObj", msgObj);
      if (msgObj.token) {
        sessionStorage.setItem("token", msgObj.token);
        document.getElementById("token-in-sessionStorage").innerHTML =
          "token-in-sessionStorage >> " + msgObj.token;
      }

      // lasturl = 'http://localhost:8080' + lasturl // 线上不需要这一步！！！
      if(name)
        jkActionFake(url, sessionStorage.getItem("token"));
      else
        jkAction(url, sessionStorage.getItem("token"));
    }
    if (msgObj.type === "hide") {
      $("#myModal").modal("hide");
    }
    if (msgObj.type === "show") {
      $("#myModal").modal("show");
    }
  });
  if (!window.loadflag) {
    $("#_close").click(function () {
      $("#myModal").modal("hide");
      $("#virtualIfm").attr("src", "");
    });
  }
  window.loadflag = true;
};

var startJk = function (url) {
  try {
    url = new URL(url);
    url.hostname = "localhost";
    url.port = 8080;
  } catch (e) {
    alert(url + "url 格式不正确");
  }

  if (!window.loadflag) {
    DynamciLoadUtil.loadCSS("./css/bootstrapModal/modal.min.css");
    if (window.jQuery) {
      DynamciLoadUtil.loadJS("./js/bootstrapModal/modal.min.js", function () {
        loadModal(url);
      });
    } else {
      DynamciLoadUtil.loadJS("./js/jquery-1.10.2.min.js", function () {
        DynamciLoadUtil.loadJS("./js/bootstrapModal/modal.min.js", function () {
          loadModal(url);
        });
      });
    }
  } else {
    // $('#virtualIfm').attr('src',url);
    // 先不显示模态框，在index.jsp中再调用js显示
    // $("#myModal").modal('show');
    console.log("已经加载了jk静态文件");
    jkAction(url, sessionStorage.getItem("token"));
  }
};

var startJkFake = function (url) {
  try {
    url = new URL(url);
    url.hostname = "localhost";
    url.port = 8080;
  } catch (e) {
    alert(url + "url 格式不正确");
  }

  if (!window.loadflag) {
    DynamciLoadUtil.loadCSS("./css/bootstrapModal/modal.min.css");
    if (window.jQuery) {
      DynamciLoadUtil.loadJS("./js/bootstrapModal/modal.min.js", function () {
        loadModal(url, 'jkActionFake');
      });
    } else {
      DynamciLoadUtil.loadJS("./js/jquery-1.10.2.min.js", function () {
        DynamciLoadUtil.loadJS("./js/bootstrapModal/modal.min.js", function () {
          loadModal(url, 'jkActionFake');
        });
      });
    }
  } else {
    // $('#virtualIfm').attr('src',url);
    // 先不显示模态框，在index.jsp中再调用js显示
    // $("#myModal").modal('show');
    console.log("已经加载了jk静态文件", url);
    jkActionFake(url, sessionStorage.getItem("token"));
  }
};

jkActionFake = function (url, token) {
  if (!url) return;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.responseType = "blob"; // 返回类型blob
  if (token) {
    xhr.setRequestHeader("JK-Token", token); //设置请求头
  } else {
    $("#virtualIfm").attr("src", url);
    return;
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      if (xhr.getResponseHeader("RedirectFlag") == "Y") {
        var blob = new Blob([xhr.response]);
        var reader = new FileReader();
        reader.readAsText(blob, "utf-8");
        reader.onload = function (e) {
          console.info(reader.result);
          console.log(JSON.parse(reader.result));
          var final_url = JSON.parse(reader.result).redirectUrl;

          var xhr1 = new XMLHttpRequest();
          xhr1.open("GET", final_url, true);
          xhr1.responseType = "blob"; // 返回类型blob
          xhr1.onload = function () {
            if (xhr1.status === 200) {
              var blob = new Blob([xhr1.response]);
              var a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "fake.wav"; //a.download = '历史数据.xlsx'; // 成功
              a.click();
            }
          };
          xhr1.send();
        };
        return;
      }
    }
  };
  // 发送ajax请求
  xhr.send();
}; */
