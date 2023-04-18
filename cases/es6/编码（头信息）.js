/* 
将 iso-8859-1 转换为 utf-8 javascript: https://segmentfault.com/q/1010000043016623

Use Buffers when decoding: https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding
*/

var http = require('http'), iconv = require('iconv-lite');
console.log(iconv.encodingExists("ISO-8859-1"));
iconv.skipDecodeWarning = true; // 忽略警告

http.get("http://localhost:89/down1", function(res) {
  var chunks = [];
  var hh = res.headers['content-disposition'].split('filename=')[1]
  console.log(hh);
  console.log('~~~~~~~~~~~~~');
  console.log(decodeURIComponent(escape(hh)));
  var hh_ = iconv.decode(hh, 'utf-8');
  console.log(hh_);
  console.log('~~~~~~~~~~~~~');
  res.on('data', function(chunk) {
    chunks.push(chunk);
  });
  res.on('end', function() {
    var decodedBody = iconv.decode(Buffer.concat(chunks), 'iso-8859-1');
    console.log(decodedBody);
    console.log(decodeURI(escape(decodedBody)));
  });
});

// Or, with iconv-lite@0.4 and Node v0.10+, you can use streaming support with `collect` helper
// http.get("http://localhost:89/down1", function(res) {
//   res.pipe(iconv.decodeStream('iso-8859-1')).collect(function(err, decodedBody) {
//     console.log(decodedBody);
//   });
// });

/* 
 * 后台springboot代码

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

@Controller
public class TestDownloadController {
    // 下载文件:将输入流中的数据循环写入到响应输出流中，而不是一次性读取到内存
    
    @RequestMapping("/down1")
    public void downloadLocal(HttpServletResponse response) throws IOException {
        // 读到流中
        String filename = "中文=@123.txt";
        String decodeName = new String(filename.getBytes("UTF-8"), "ISO-8859-1");
//        InputStream inputStream = new FileInputStream("D:\\aaa\\中文123.txt");// 文件的存放路径
        InputStream inputStream = this.getClass().getResourceAsStream("/中文.txt");

        response.reset();
        response.setContentType("application/octet-stream");
//        response.addHeader("Content-Disposition", "attachment; filename=" + decodeName +".txt"); // 方法一
        response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename,"UTF-8")); // 方法二
        ServletOutputStream outputStream = response.getOutputStream();
        byte[] b = new byte[1024];
        int len;
        //从输入流中读取一定数量的字节，并将其存储在缓冲区字节数组中，读到末尾返回-1
        while ((len = inputStream.read(b)) > 0) {
            outputStream.write(b, 0, len);
        }
        inputStream.close();
    }
}
 */