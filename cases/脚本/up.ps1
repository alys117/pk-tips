<#
.SYNOPSIS
文件上传脚本（PowerShell版本）
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

function Upload-File {
    param(
        [string]$Token,
        [string]$FilePath,
        [string]$RemoteFileName
    )

    # 检查文件是否存在
    if (-not (Test-Path $FilePath)) {
        Write-Error "文件不存在: $FilePath"
        return $false
    }

    # 生成随机边界
    $boundary = "xiaohuozichuishaoshao"  # 使用固定边界，与原始HTTP请求一致
    
    # 准备请求头
    $headers = @{
        "User-Agent" = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1"
        "token" = $Token
        "Content-Type" = "multipart/form-data; boundary=$boundary"
    }

    # 正确构建multipart表单数据（使用字节数组）
    $CRLF = [System.Text.Encoding]::ASCII.GetBytes("`r`n")
    $bodyBytes = [System.Collections.Generic.List[byte]]::new()
    
    # 添加keep字段
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("--$boundary"))
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes('Content-Disposition: form-data; name="keep"'))
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("Content-Type: text/plain"))
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("一段文字"))
    $bodyBytes.AddRange($CRLF)
    
    # 添加文件字段
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("--$boundary"))
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("Content-Disposition: form-data; filename=`"$RemoteFileName`"; name=`"233333`""))
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("Content-Type: application/octet-stream"))
    $bodyBytes.AddRange($CRLF)
    $bodyBytes.AddRange($CRLF)
    
    # 添加文件内容
    $fileBytes = [System.IO.File]::ReadAllBytes($FilePath)
    $bodyBytes.AddRange($fileBytes)
    $bodyBytes.AddRange($CRLF)
    
    # 添加结束边界
    $bodyBytes.AddRange([System.Text.Encoding]::UTF8.GetBytes("--$boundary--"))
    $bodyBytes.AddRange($CRLF)
    
    try {
        # 发送请求
        $response = Invoke-WebRequest -Uri "http://223.99.141.15:8080/WebReport/jk/widgets/jsp/upload/upload.jsp" `
            -Method Post `
            -Headers $headers `
            -Body $bodyBytes.ToArray()
        
        if ($response.StatusCode -eq 200) {
            Write-Host "文件 $RemoteFileName 上传成功!"
            Write-Host "文件 $response"
            return $true
        }
        else {
            Write-Error "上传失败 (状态码: $($response.StatusCode))"
            return $false
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Error "文件上传失败 (状态码: $_.Exception.Response"
        Write-Error "文件上传失败 (状态码: $statusCode)"
        return $false
    }
}

# 主执行流程
$response = Get-Token
Write-Host "返回内容: $response"
$tokenObject = $response | ConvertFrom-Json
$actualToken = $tokenObject.token

# 获取桌面路径
$desktopPath = [Environment]::GetFolderPath('Desktop')

# 处理文件路径
$filePathInput = Read-Host "请输入要上传的本地文件路径（默认桌面路径，直接回车使用桌面）"
if ([string]::IsNullOrEmpty($filePathInput)) {
    $filePath = $desktopPath
} else {
    $filePath = $filePathInput
}

# 如果输入的是目录（如桌面），则提示输入文件名
if (Test-Path $filePath -PathType Container) {
    $fileName = Read-Host "请输入要上传的文件名（例如：1.zip）"
    $filePath = Join-Path $filePath $fileName
}

# 自动提取本地文件名
$fileNameOnly = [System.IO.Path]::GetFileName($filePath)

# 处理远程文件名（默认与本地文件名相同）
$remoteFileName = Read-Host "请输入服务器上保存的文件名（默认: $fileNameOnly，直接回车使用相同文件名）"
if ([string]::IsNullOrEmpty($remoteFileName)) {
    $remoteFileName = $fileNameOnly
}
Write-Host "解析出的token: $actualToken"
Write-Host "解析出的本地文件名: $filePath"
Write-Host "解析出的远程文件名: $remoteFileName"
Upload-File -Token $actualToken -FilePath $filePath -RemoteFileName $remoteFileName