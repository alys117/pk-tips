<#
.SYNOPSIS
文件下载脚本（PowerShell版本）
#>

function Get-Token {
    $headers = @{
        "User-Agent" = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1"
    }

    try {
        $response = Invoke-WebRequest -Uri "http://223.99.141.15:8080/WebReport/jk/ask/token" -Headers $headers -Method Get
        if ($response.StatusCode -eq 200) {
            return $response.Content
        }
        else {
            Write-Error "获取token失败 (状态码: $($response.StatusCode))"
            exit 1
        }
    }
    catch {
        Write-Error "请求失败: $_"
        exit 1
    }
}

function Download-File {
    param(
        [string]$Token,
        [string]$RemoteFilename,
        [string]$SaveFilename,
        [string]$DownloadDirectory = (Get-Location).Path  # 默认为当前目录
    )
    
    # 确保下载目录存在
    if (-not (Test-Path $DownloadDirectory)) {
        try {
            New-Item -ItemType Directory -Path $DownloadDirectory -ErrorAction Stop | Out-Null
        } catch {
            Write-Error "无法创建目录: $_"
            return $false
        }
    }
    
    # 构建完整保存路径
    $fullPath = Join-Path $DownloadDirectory $SaveFilename
    
    $headers = @{
        "User-Agent" = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1"
        "token"      = $Token
    }

    try {
        $response = Invoke-WebRequest -Uri "http://223.99.141.15:8080/WebReport/jk/widgets/jsp/upload/download.jsp?file=$RemoteFilename" `
            -Headers $headers `
            -OutFile $fullPath
        
        if ($response.StatusCode -eq 200) {
            Write-Host "文件 $RemoteFilename 下载成功，已保存为 $fullPath"
            return $true
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Error "文件下载失败 (状态码: $statusCode)"
        return $false
    }
}

# 主执行流程
$response = Get-Token
Write-Host "返回内容: $response"
$tokenObject = $response | ConvertFrom-Json
$actualToken = $tokenObject.token
Write-Host "解析出的token: $actualToken"

$remoteFilename = Read-Host "请输入要下载的远程文件名（例如：report.xlsx）"
$saveFilename = Read-Host "请输入本地保存文件名（直接回车使用原文件名）"

if ([string]::IsNullOrEmpty($saveFilename)) {
    $saveFilename = $remoteFilename
}
# 获取桌面路径
$desktopPath = [Environment]::GetFolderPath('Desktop')

# 显示目录选择菜单
Write-Host "请选择下载位置："
Write-Host "1) 桌面 ($desktopPath)"
Write-Host "2) 当前目录 ($(Get-Location).Path)"
Write-Host "3) 自定义路径"

# 获取用户选择
$choice = Read-Host "请输入选项 (1-3，默认1)"

# 确定下载目录
$downloadDirectory = switch ($choice) {
    "2" { (Get-Location).Path }
    "3" { Read-Host "请输入自定义路径" }
    default { $desktopPath }  # 默认选择桌面
}

# 验证并处理自定义路径
if ($choice -eq "3" -and [string]::IsNullOrEmpty($downloadDirectory)) {
    $downloadDirectory = $desktopPath
    Write-Host "使用默认路径: $downloadDirectory"
}

# 确保目录存在
if (-not (Test-Path $downloadDirectory)) {
    try {
        New-Item -ItemType Directory -Path $downloadDirectory -ErrorAction Stop | Out-Null
        Write-Host "已创建目录: $downloadDirectory"
    } catch {
        Write-Error "无法创建目录: $_"
        exit 1
    }
}

Write-Host "下载目录: $downloadDirectory"
Download-File -Token $actualToken -RemoteFilename $remoteFilename `
    -SaveFilename $saveFilename -DownloadDirectory $downloadDirectory