@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

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

:: 提取token值
set "token="
for /f "delims=" %%a in ('type token_response.txt ^| findstr /i "token"') do (
    set "line=%%a"
    set "line=!line:*"token": "=!"
    set "token=!line:"=!"
    set "token=!token:,=!"
    set "token=!token:}=!"
)
del token_response.txt

if not defined token (
    echo 错误: 无法获取有效的token
    pause
    exit /b 1
)

echo 获取到的token: %token%

:: 获取桌面路径
set "desktopPath=%USERPROFILE%\Desktop"

:: 处理文件路径
set /p "filePathInput=请输入要上传的本地文件路径（默认桌面路径，直接回车使用桌面）: "

if "!filePathInput!"=="" (
    set "filePath=!desktopPath!"
) else (
    set "filePath=!filePathInput!"
)

:: 检查是否是目录
if exist "!filePath!\*" (
    set /p "fileName=请输入要上传的文件名（例如：1.zip）: "
    set "filePath=!filePath!\!fileName!"
)

:: 自动提取本地文件名
for %%I in ("!filePath!") do set "fileNameOnly=%%~nI%%~xI"

:: 处理远程文件名
set /p "remoteFileName=请输入服务器上保存的文件名（默认:!fileNameOnly!，直接回车使用相同文件名）: "
if "!remoteFileName!"=="" set "remoteFileName=!fileNameOnly!"

echo 解析出的本地文件名: !filePath!
echo 解析出的远程文件名: !remoteFileName!

:: 执行文件上传
curl -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1" ^
     -H "token: %token%" ^
     -F "keep=改下面的路径 filename 和 ^< 开头的路径" ^
     -F "file=@!filePath!;filename=!remoteFileName!" ^
     http://223.99.141.15:8080/WebReport/jk/widgets/jsp/upload/upload.jsp

if %errorlevel% equ 0 (
    echo 文件 !remoteFileName! 上传成功!
) else (
    echo 文件上传失败 (错误码: %errorlevel%)
)

pause