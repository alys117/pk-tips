var fakeuser = this.options.form.getWidgetByName("fakeuser").getValue();
var url ='http://127.0.0.1:8080/webroot/ReportServer?sessionID=${sessionID}&op=export&&format=excel&extype=simple&account='+fakeuser+'&res='+encodeURIComponent('${reportName}');
if (!window.loadflag) {
  DynamciLoadUtil.loadCSS(
    "/webroot/widgets/css/plugins/bootstrapModal/modal.min.css"
  )
  if (window.jQuery) {
    DynamciLoadUtil.loadJS(
      "/webroot/widgets/js/plugins/bootstrapModal/modal.min.js",
      function () {
        loadModal(url);
      }
    )
  } else {
    DynamciLoadUtil.loadJS(
      "/webroot/widgets/js/plugins/jquery-1.10.2.min.js",
      function () {
        DynamciLoadUtil.loadJS(
          "/webroot/widgets/js/plugins/bootstrapModal/modal.min.js",
          function () {
            loadModal(url)
          }
        );
      }
    );
  }
} else {
  // $("#myModal").modal('show'); // 先不显示模态框，在index.jsp中再调用js显示
  judgeJK(url);
}
window.errorCount = 0
function judgeJK(url) {
  var xhr = (IEVersion()<10 && IEVersion() != -1)?new XDomainRequest():new XMLHttpRequest();
  if( (IEVersion() < 10 && IEVersion() > -1) && sessionStorage.getItem("token")){
    var urlwithToken = url+'&token='+sessionStorage.getItem("token")
    xhr.open("POST", urlwithToken, true);
  }else if(sessionStorage.getItem("token")){
    xhr.open("POST", url, true);
    xhr.setRequestHeader("JK-Token", sessionStorage.getItem("token")); //设置请求头
  }else {
    xhr.open("POST", url, true);
  }
  xhr.onerror = function(){
    alert(IEVersion() + '  请求失败：' + url)
  }
  xhr.onload = function () {
    try{
      var info = window.JSON?JSON.parse(xhr.responseText):eval('('+xhr.responseText+')');
      if (info.direct == "N") {
        if(info.token){
          sessionStorage.setItem("token", info.token)
          $("#virtualIfm").attr("src", url+'&token=' + info.token);
        }else{
          sessionStorage.removeItem("token");
          judgeJK(url)
        }
      } else {
        downBinary(url, sessionStorage.getItem("token"));
      }
    }catch(e){
      sessionStorage.removeItem("token");
      if(window.errorCount == 3){
        alert('金库验证失败，请联系系统管理员！')
      }else{
        window.errorCount++
        alert('金库验证失败，请重试')
      }
    }
  };
  xhr.send()
}

function  downBinary(url, token) {
  if (!url) return;
  var realUrl = url
  var fake = location.host
  if(url.indexOf('emu') >0){
    fake = 'localhost:8080';
  }
  try{
    realUrl = new URL(url);
    realUrl.host = fake;
  }catch(e){
    var reg = /^http(s)?:\/\/(.*?)\//
    realUrl =realUrl.replace(reg, 'http://'+fake+'/')
    var ifm = document.createElement('iframe')
    ifm.style.display = 'none'
    ifm.style.height = 0
    ifm.src = realUrl
    document.body.appendChild(ifm)
    setTimeout(function(){ document.body.removeChild(ifm) },10000)
    return
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", realUrl, true);
  xhr.responseType = "blob"; // 返回类型blob
  if (token) {
    xhr.setRequestHeader("JK-Token", token); //设置请求头
  }
  xhr.onload = function () {
    if (xhr.status === 200) {
      var dispoition = xhr.getResponseHeader("Content-Disposition") || "";
      var nameStr = dispoition.split(";")[1] || "";
      var fileName = nameStr.split("=")[1] || "";
      // console.log(fileName, "乱码");
      fileName = decodeURIComponent(escape(fileName));
      var blob = new Blob([xhr.response]);
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName; //a.download = '历史数据.xlsx';
      a.click();
      log(blob.size, location.href)
    } else {
      //请求失败处理
    }
  };
  // 发送ajax请求
  xhr.send('{"type":"binary"}');
  log(-1, location.href)
}

function log(size, url) {
  var xhr = new XMLHttpRequest();
  /* 
  如果加上 xhr.withCredentials = true; 
  Access to XMLHttpRequest at 'http://localhost:8080/log' from origin 'http://localhost:8075' has been blocked by CORS policy: Response to preflight 
  request doesn't pass access control check: The value of the 'Access-Control-Allow-Credentials' header in the response is '' 
  which must be 'true' when the request's credentials mode is 'include'. 
  The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
  */
  // xhr.withCredentials = true; 
  xhr.open("POST", "http://localhost:8080/log");
  xhr.setRequestHeader("Content-Type", "application/json");
  var data = JSON.stringify({
    token: sessionStorage.getItem("token"),
    size,
    url: location.href
  });
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.responseText);
    }
  }
  xhr.send(data);
}

function loadModal(url) {
  var html =
    '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">\n' +
    '                              <div class="modal-dialog" role="document">\n' +
    '                                <div class="modal-content" style="width: 500px;background-color:#fafafa">\n' +
    '                                  <div class="modal-header">\n' +
    '                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" id="_close">&times;</span></button>\n' +
    '                                    <h5 class="modal-title" id="myModalLabel">加载中……</h5>\n' +
    "                                  </div>\n" +
    '                                  <div class="modal-body" style="padding:0;">\n' +
    '<iframe id = "virtualIfm" src="" frameborder="no" border=0 scrolling="no" height="380" width="500"/>\n' +
    "                                  </div>\n" +
    "                                </div>\n" +
    "                              </div>\n" +
    "                            </div> ";
  $("body").append(html);
  judgeJK(url);
  // 先不显示模态框，如果filter中跳转金库index.jsp后，再在index.jsp中再调用js显示
  //$("#myModal").modal('show');

  if( window.addEventListener ) {
    window.addEventListener("message", function (e) {
    var msgObj = window.JSON?JSON.parse(e.data):eval('('+e.data+')')
    if (msgObj.type === "close") {
      $("#_close").click();
    }
    if (msgObj.myModalLabel) {
      $("#myModalLabel").html(msgObj.myModalLabel);
    }
    if (msgObj.src) {
      if (msgObj.token) {
        sessionStorage.setItem("token", msgObj.token);
      }
      downBinary(location.origin + msgObj.src, msgObj.token);
    }
    if (msgObj.type === "hide") {
      $("#myModal").modal("hide");
    }
    if (msgObj.type === "show") {
      $("#myModal").modal("show");
    }
    if (msgObj.type === "delToken") {
      sessionStorage.removeItem("token");
      $("#myModal").modal("show");
    }
  });
  }else{
    window.attachEvent("onmessage", function (e) {
    var msgObj = window.JSON?JSON.parse(e.data):eval('('+e.data+')')
    if (msgObj.type === "close") {
      $("#_close").click();
    }
    if (msgObj.myModalLabel) {
      $("#myModalLabel").html(msgObj.myModalLabel);
    }
    if (msgObj.src) {
      if (msgObj.token) {
        sessionStorage.setItem("token", msgObj.token);
      }
      downBinary(location.protocol+'//'+location.host + msgObj.src, msgObj.token);
    }
    if (msgObj.type === "hide") {
      $("#myModal").modal("hide");
    }
    if (msgObj.type === "show") {
      $("#myModal").modal("show");
    }
    if (msgObj.type === "delToken") {
      sessionStorage.removeItem("token");
      $("#myModal").modal("show");
    }
  });
  }
  if (!window.loadflag) {
    $("#_close").click(function () {
      $("#myModal").modal("hide");
      $("#virtualIfm").attr("src", "");
    });
  }
  window.loadflag = true;
}