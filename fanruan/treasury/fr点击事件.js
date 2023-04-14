var url ='http://localhost:8080/treasury/ReportServer?sessionID=${sessionID}'+'&webContext=webroot&op=export&&format=excel&extype=simple&account='+fakeuser+'&cpt_path='+encodeURIComponent('${reportName}');
if(!window.loadflag){
	DynamciLoadUtil.loadCSS("/webroot/widgets/css/plugins/bootstrapModal/modal.min.css");
	if(window.jQuery){
	  DynamciLoadUtil.loadJS('/webroot/widgets/js/plugins/bootstrapModal/modal.min.js',function () {
		loadModal(url);
	  });
	} else{
	  DynamciLoadUtil.loadJS('/webroot/widgets/js/plugins/jquery-1.10.2.min.js',function () {
		DynamciLoadUtil.loadJS('/webroot/widgets/js/plugins/bootstrapModal/modal.min.js',function () {
		  loadModal(url);
		});
	  })
	}
}else {
	// $('#virtualIfm').attr('src',url);
	// 先不显示模态框，在index.jsp中再调用js显示
	// $("#myModal").modal('show');
	console.log('已经加载了modal');
	jkAction(url, sessionStorage.getItem('token'))
}			
			
    function jkAction(url,token) {
      if(!url) return
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.responseType = "blob";  // 返回类型blob
      if(token){
        xhr.setRequestHeader('JK-Token', token); //设置请求头
      }else{
        $('#virtualIfm').attr('src',url);
        return;
      }
      xhr.onload = function () {
        if (xhr.status === 200) {
          if(xhr.getResponseHeader('Content-Type').indexOf('application/json') > -1){
            console.log(xhr.response);
            const blob = new Blob([xhr.response])
            var reader = new FileReader();
            reader.readAsText(blob, 'utf-8');
            reader.onload = function (e) {
              console.info(reader.result);
              console.log(JSON.parse(reader.result));
              var final_url = JSON.parse(reader.result).redirectUrl
              jkAction(final_url, sessionStorage.getItem('token'))
            }
            return;
          }

          const dispoition = xhr.getResponseHeader('Content-Disposition') || ''
          const nameStr = dispoition.split(';')[1] || ''
          const fileName = decodeURI(nameStr.split('=')[1] || '')
          // console.log(fileName,'乱码')
          //decodeURI解码需要后端处理。文件类型固定可自定义名字
          const blob = new Blob([xhr.response])
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = fileName  //a.download = '历史数据.xlsx'; // 成功
          a.click();
        }
        else {
          //请求失败处理
        }
      };
      // 发送ajax请求
      xhr.send(JSON.stringify({foo:'bar'}))
    }

    function loadModal(url) {
        var html = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">\n' +
            '                              <div class="modal-dialog" role="document">\n' +
            '                                <div class="modal-content" >\n' +
            '                                  <div class="modal-header">\n' +
            '                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" id="_close">&times;</span></button>\n' +
            '                                    <h5 class="modal-title" id="myModalLabel">加载中……</h5>\n' +
            '                                  </div>\n' +
            '                                  <div class="modal-body" style="padding:0;height: 350px;width: 250px;">\n' +

            '<iframe id = "virtualIfm" src="" frameborder="no" border=0 scrolling="no" height="350" width="560"/>\n' +
            '                                  </div>\n' +
            '                                </div>\n' +
            '                              </div>\n' +
            '                            </div> ';
        $('body').append(html);
        jkAction(url, sessionStorage.getItem('token'))
        // 先不显示模态框，如果filter中跳转金库index.jsp后，再在index.jsp中再调用js显示
        //$("#myModal").modal('show');

        window.addEventListener('message', function (e){
          var msgObj = JSON.parse(e.data)
          if(msgObj.type === 'close'){
            $('#_close').click()
          }
          if(msgObj.myModalLabel){
            $('#myModalLabel').html(msgObj.myModalLabel)
          }
          if (msgObj.src){
            var lasturl = msgObj.src.replace('/treasury/', '/webroot/') // 线上用资源的上下文替换 比如 msgObj.src.replace('/treasury/', '/WebReport/') 
            console.log('msgObj',msgObj)
            if (msgObj.token){
              sessionStorage.setItem('token', msgObj.token)
            }
            
            // lasturl = 'http://localhost:8080' + lasturl // 线上不需要这一步！！！
            jkAction(lasturl, msgObj.token)
          }
          if(msgObj.type === 'hide'){
            $("#myModal").modal('hide');
          }
          if(msgObj.type === 'show'){
            $("#myModal").modal('show');
          }
        })
        if(!window.loadflag){
            $('#_close').click(function () {
                $("#myModal").modal('hide');
                $('#virtualIfm').attr('src',"");
            })
        }
        window.loadflag = true;
    }