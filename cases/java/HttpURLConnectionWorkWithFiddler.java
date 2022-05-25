import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;

public class HttpURLConnectionWorkWithFiddler {
    private static void get() throws Exception {
//      创建一个URL对象
//        URL url = new URL("https://www.baidu.com");
        URL url = new URL("http://192.168.0.249");
//      调用URL对象的openConnection( )来获取HttpURLConnection对象实例
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
//      设置HTTP请求使用的方法:GET或者POST等
        urlConnection.setRequestMethod("GET");
//      设置超时时间,毫秒值
        urlConnection.setConnectTimeout(6 * 1000);
        urlConnection.setReadTimeout(6 * 1000);
//      连接
        urlConnection.connect();
//      得到响应流
        InputStream inputStream = urlConnection.getInputStream();
//      转换成字符串
        String result = new BufferedReader(new InputStreamReader(inputStream)).lines().collect(Collectors.joining(System.lineSeparator()));
        inputStream.close();
        System.out.println(result);
    }

    private static void post() throws Exception{
        // 1. 获取访问地址URL
        // URL url = new URL("http://localhost:8083/receive"); // fiddler 不监听
        // URL url = new URL("http://127.0.0.1:8083/receive"); // fiddler 不监听
        // URL url = new URL("http://192.168.0.113:8083/receive"); // 监听，给自己设置一个静态ip就能抓包了
        // URL url = new URL("http://ipv4.fiddler:8083/receive"); // 但是用fiddler代理后网络错误会被fiddler吞掉，代码不会跳出异常
        // URL url = new URL("https://www.baidu.com"); // https的还需要增加 fiddler根证书的信任
        URL url = new URL("https://https://exsi.deheng.com"); // 试试用mkcert生成的证书，失败了，不知道为什么

        // 2. 创建HttpURLConnection对象
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        /* 3. 设置请求参数等 */
        // 请求方式
        connection.setRequestMethod("POST");
        // 超时时间
        connection.setConnectTimeout(30000);
        // 设置是否输出
        connection.setDoOutput(true);
        // 设置是否读入
        connection.setDoInput(true);
        // 设置是否使用缓存
        connection.setUseCaches(false);
        // 设置此 HttpURLConnection 实例是否应该自动执行 HTTP 重定向
        connection.setInstanceFollowRedirects(true);
        // 设置使用标准编码格式编码参数的名-值对
        connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        // 连接
        connection.connect();
        /* 4. 处理输入输出 */
        // 写入参数到请求中
        String params = "username=test&password=123456";
        OutputStream out = connection.getOutputStream();
        out.write(params.getBytes());
        out.flush();
        out.close();
        // 从连接中读取响应信息
        String msg = "";
        int code = connection.getResponseCode();
        if (code == 200) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                msg += line + "\n";
            }
            reader.close();
        }
        // 5. 断开连接
        connection.disconnect();
        // 处理结果
        System.out.println(msg);
        System.out.println("以上是msg");
      }
    public static void main(String[] args) throws Exception {
// fiddler 抓包：默认8888端口
// 1、在命令中设置代理
//     java -DproxySet=true -DproxyHost=127.0.0.1 -DproxyPort=8888 HttpURLConnectionWorkWithFiddler
//     可以参考这个文章https://www.freesion.com/article/40391028852/ 
//     主要是先导出fiddler根证书，keytool.exe -import -file D:\FiddlerRoot.cer -keystore D:\FiddlerKeystore -alias Fiddler   
//     然后可以运行下面这个命令了
//     java -DproxySet=true -DproxyHost=127.0.0.1 -DproxyPort=8888 -Djavax.net.ssl.trustStore=D:\FiddlerKeystore -Djavax.net.ssl.trustStorePassword=123456 HttpURLConnectionWorkWithFiddler

// 2、在代码中设置代理 
     
      //  System.setProperty("http.proxyHost", "localhost");
      //  System.setProperty("http.proxyPort", "8888");
      //  System.setProperty("https.proxyHost", "localhost");
      //  System.setProperty("https.proxyPort", "8888");

        // HttpURLConnectionWorkWithFiddler.get();
        HttpURLConnectionWorkWithFiddler.post();
        System.out.println("end");
    }
}
