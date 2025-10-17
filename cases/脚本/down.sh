#!/bin/bash
set -e

getToken() {
    local response=$(curl -s -w "\n%{http_code}" \
        -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1" \
        http://223.99.141.15:8080/WebReport/jk/ask/token)

    local body=$(echo "$response" | sed '$d')
    local status=$(echo "$response" | tail -n1)

    if [ "$status" -eq 200 ]; then
        echo "$body"
    else
        echo "获取token失败 (状态码: $status)" >&2
        exit 1
    fi
}

downloadFile() {
    local token="$1"
    local remoteFilename="$2"
    local saveFilename="${3:-$remoteFilename}"

    local response=$(curl -s -w "\n%{http_code}" \
        -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.0.0 Mobile/15E148 Safari/604.1" \
        -H "token: $token" \
        "http://223.99.141.15:8080/WebReport/jk/widgets/jsp/upload/download.jsp?file=$remoteFilename" -o "$saveFilename")

    local status=$(echo "$response" | tail -n1)

    if [ "$status" -eq 200 ]; then
        echo "文件 $remoteFilename 下载成功，已保存为 $saveFilename"
        return 0
    else
        echo "文件下载失败 (状态码: $status)" >&2
        return 1
    fi
}

# 主执行流程
TOKEN=$(getToken)
echo "获取到的token: $TOKEN"

# 用户输入处理 - 修正了变量引用错误
read -p "请输入要下载的远程文件名（例如：report.xlsx）: " REMOTE_FILENAME
read -p "请输入本地保存文件名（直接回车使用原文件名）: " SAVE_FILENAME
[ -z "$SAVE_FILENAME" ] && SAVE_FILENAME="$REMOTE_FILENAME"

# 执行下载
downloadFile "$TOKEN" "$REMOTE_FILENAME" "$SAVE_FILENAME"