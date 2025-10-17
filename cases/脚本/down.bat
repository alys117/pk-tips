@echo off
setlocal enabledelayedexpansion
chcp 65001
:: 检查curl是否可用
where curl >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到curl命令，请安装Git Bash或确保curl在PATH中
    pause
    exit /b 1
)

:: 获取token
echo 正在获取token...
curl -s -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1" ^
     http://223.99.141.15:8080/WebReport/jk/ask/token > token_response.txt

:: 提取token值（简单JSON解析）
set "token="
for /f "delims=" %%a in ('type token_response.txt ^| findstr /i "token"') do (
    set "line=%%a"
    set "line=!line:*"token": "=!"
    set "token=!line:"=!"
    set "token=!token:,=!"
)
del token_response.txt

if not defined token (
    echo 错误: 无法获取有效的token
    pause
    exit /b 1
)

echo 获取到的token: %token%

:: 获取用户输入
set /p "remoteFilename=请输入要下载的远程文件名（例如：report.xlsx）: "
set /p "saveFilename=请输入本地保存文件名（直接回车使用原文件名）: "

if "%saveFilename%"=="" set "saveFilename=%remoteFilename%"

:: 显示目录选择菜单
echo 请选择下载位置:
echo 1) 桌面 (%USERPROFILE%\Desktop)
echo 2) 当前目录 (%cd%)
echo 3) 自定义路径

set /p "choice=请输入选项 (1-3，默认1): "

:: 确定下载目录
if "%choice%"=="2" (
    set "downloadDirectory=%cd%"
) else if "%choice%"=="3" (
    set /p "downloadDirectory=请输入自定义路径: "
    if "!downloadDirectory!"=="" set "downloadDirectory=%USERPROFILE%\Desktop"
) else (
    set "downloadDirectory=%USERPROFILE%\Desktop"
)

:: 确保目录存在
if not exist "%downloadDirectory%" (
    mkdir "%downloadDirectory%" >nul 2>nul
    if !errorlevel! neq 0 (
        echo 错误: 无法创建目录 %downloadDirectory%
        pause
        exit /b 1
    )
    echo 已创建目录: %downloadDirectory%
)

echo 下载目录: %downloadDirectory%

:: 执行文件下载
curl -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1" ^
     -H "token: %token%" ^
     -o "%downloadDirectory%\%saveFilename%" ^
     "http://223.99.141.15:8080/WebReport/jk/widgets/jsp/upload/download.jsp?file=%remoteFilename%"

if exist "%downloadDirectory%\%saveFilename%" (
    echo 文件 %remoteFilename% 下载成功，已保存为 %downloadDirectory%\%saveFilename%
) else (
    echo 文件下载失败
)

pause