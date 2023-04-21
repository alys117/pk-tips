var url =
  "http://localhost:8080/webroot/ReportServer?sessionID=${sessionID}&op=export&&format=excel&extype=simple&account=" +
  fakeuser +
  "&cpt_path=" +
  encodeURIComponent("${reportName}");
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
  // $('#virtualIfm').attr('src',url);
  // 先不显示模态框，在index.jsp中再调用js显示
  // $("#myModal").modal('show');
  console.log("已经加载了modal");
  judgeJK(url);
}

function judgeJK(url) {
  var xhr = new XMLHttpRequest();
  if (sessionStorage.getItem("token")) {
    url = url + "&token=" + sessionStorage.getItem("token"); // 本来应该使用下面把token放到头信息里的，但是在本地ie下会报错，所以只能放到url里
  }
  xhr.open("POST", url, true);
  if (sessionStorage.getItem("token")) {
    // xhr.setRequestHeader("JK-Token", sessionStorage.getItem("token")); //设置请求头, 在云桌面环境上没事，但是本地ie环境报错： SEC7123: Access-Control-Allow-Headers 列表中不存在请求标头 jk-token。
  }
  xhr.onload = function () {
    if (xhr.status == 200) {
      //监听HTTP状态码
      try{
        var info = JSON.parse(xhr.responseText);
        if (info.direct == "N") {
          sessionStorage.setItem("token", info.token)
          $("#virtualIfm").attr("src", url+'&token=' + info.token);
        } else {
          donwBinary(url, sessionStorage.getItem("token"))
        }
      }catch(e){
        console.log(e);
        sessionStorage.removeItem("token");
        alert('金库时效过期，请重新请求资源')
      }
    }
  };
  xhr.send()
}

function donwBinary(url, token) {
  if (!url) return;
  var realUrl = new URL(url);
  realUrl.host = location.host;
  if(getBrowser() == 'IE'){
    var ifm = document.createElement('iframe')
    ifm.style.display = 'none'
    ifm.style.height = 0
    ifm.src = realUrl
    document.body.appendChild(ifm)
    setTimeout(function(){ document.body.removeChild(ifm) },120000)
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
      const dispoition = xhr.getResponseHeader("Content-Disposition") || "";
      const nameStr = dispoition.split(";")[1] || "";
      let fileName = nameStr.split("=")[1] || "";
      console.log(fileName, "乱码");
      fileName = decodeURIComponent(escape(fileName));
      const blob = new Blob([xhr.response]);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName; //a.download = '历史数据.xlsx';
      a.click();
    } else {
      //请求失败处理
    }
  };
  // 发送ajax请求
  xhr.send(JSON.stringify({ type: "binary" }));
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

  window.addEventListener("message", function (e) {
    var msgObj = JSON.parse(e.data);
    if (msgObj.type === "close") {
      $("#_close").click();
    }
    if (msgObj.myModalLabel) {
      $("#myModalLabel").html(msgObj.myModalLabel);
    }
    if (msgObj.src) {
      console.log("msgObj", msgObj);
      if (msgObj.token) {
        sessionStorage.setItem("token", msgObj.token);
      }
      donwBinary(location.origin + msgObj.src, msgObj.token);
    }
    if (msgObj.type === "hide") {
      $("#myModal").modal("hide");
    }
    if (msgObj.type === "show") {
      $("#myModal").modal("show");
    }
    if (msgObj.type === "delToken") {
      sessionStorage.removeItem("token");
    }
  });
  if (!window.loadflag) {
    $("#_close").click(function () {
      $("#myModal").modal("hide");
      $("#virtualIfm").attr("src", "");
    });
  }
  window.loadflag = true;
}
