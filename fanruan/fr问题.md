## 帆软现阶段问题
### 1、日志不能定期清除
![image](static/img/fr日志清理.png)
![image](static/img/fr日志清理2.png)
![image](static/img/fr日志清理3.png)

配置的是每周都清理，但是节点上还有2021年的文件
### 2、登录集成插件即将过期
![image](static/img/fr单点登录.png)
#### P.S. 测试在移动端插件失效，请确认该插件是否可以工作在移动端

### 3、设计器进程驻留问题
#### ① 当打开frm模板时，高频发生退出设计器但进程仍在问题再次打开设计器会提示端口占用
#### ② 当设计器长时间打开，退出时候也会出现进程不退出的现象

### 4、license被置换成临时lic
生产集群环境之前正式license的注册的tomcat，后又增加一个节点，用临时lic重新注册后，原先三台正式lic的也变成临时的了

### 5、设计器同步问题
#### 插件同步问题依然存在，请确认该功能测试正常。

### 6、在WEB-INFO/reportlets目录下FineReport.Reuse目录是做什么用的，是否可以删除
### 7、控件编辑后事件 不能立即起作用，需要setTimeout才可以，涉及报表很广，有什么办法统一更改
![image](static/img/控件级联.png)
### 8、frm报表里面的数据集查询不能同步进行，大屏响应时间很慢
如下图，请求时间9秒，是两个请求时间之和，能够改成异步的
![image](static/img/frm%E6%9F%A5%E8%AF%A2%E6%97%B6%E9%97%B4.png)
![image](static/img/%E5%90%8E%E5%8F%B0%E8%AF%B7%E6%B1%82%E6%97%B6%E9%97%B4.png)
### 9、如何更改cubes日志的存放位置

### 10、导出功能能不能（比如使用插件）增加权限校验
### 11、切换远程服务器时候比8.0的时候慢
是否网络问题，还是产品有多了什么校验
### 12、地图配置是否可做到热更新。
目前山东现场的网格geojson更新后需要重启服务才能生效
### 13、帆软日志报错如何定位错误
比如报错数据集配置错误，如何查定位到哪张模板哪个数据集

### 14、seesion同步工具问题，报错找不到session 
https://github.com/redisson/redisson/tree/master/redisson-tomcat

