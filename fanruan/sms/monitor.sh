#!/bin/bash

# 系统监控,记录cpu、memory、load average,当超过规定数值时发电邮通知管理员

# *** config start ***

# 当前目录路径
ROOT=$(cd "$(dirname "$0")"; pwd)


# 当前服务器名
HOST=$(hostname)

# 健康url
STATUS_URL=http://192.168.0.249/status.json

# log 文件路径
CPU_LOG="${ROOT}/logs/cpu.log"
MEM_LOG="${ROOT}/logs/mem.log"
LOAD_LOG="${ROOT}/logs/load.log"
SMS_LOG="${ROOT}/logs/sendsms.log"

# 通知短信列表
#SMS_URL=http://134.80.247.74:8080/api/v1/message/batchSendMessage 
SMS_URL=http://192.168.0.113:8084/api/raw
# NOTICE_LIST='13573769853,13605319075'
NOTICE_LIST='13605319075'

# 发通知电邮间隔时间
REMARK_EXPIRE=3600
NOW=$(date +%s)

# *** config end ***


# *** function start ***
# 发送告警短信
function SendSms() {
   #curl -H "Content-type:application/json " -X POST -d '{"mobile":"13605319075","type":"S","content":"hello sms"}' http://134.80.247.74:8080/api/v1/message/batchSendMessage 
   curl -H "Content-type:application/json" -d '{"mobile":"'"${NOTICE_LIST}"'","type":"S","content":"'"$1"'"}' "${SMS_URL}"
}


# 获取上一次发送电邮时间
function GetRemark() {
    local remark

    if [ -f "$1" ] && [ -s "$1" ]; then
        remark=$(cat $1)

        if [ $(( $NOW - $remark )) -gt "$REMARK_EXPIRE" ]; then
            rm -f $1
            remark=""
        fi
    else
        remark=""
    fi

    echo $remark
}

function GetStatus() {
    status=$(curl "${STATUS_URL}")
    len=$(echo $status |./jq-linux64 '.servers.http|length')

        counter=0
        content=''
        echo "服务器状态："
        while [ $counter -lt $len ]
        do
        content=$content"\r"$(echo $status |./jq-linux64 -r ".servers.http[$counter].name")" "$(echo $status |./jq-linux64 -r ".servers.http[$counter].status")
        #echo $content
        counter=$[ $counter + 1 ]
        done

str="up"
if [[ $status =~ $str ]]
then
   echo "$(SendSms "Subject: $(date +%Y-%m-%d' '%H:%M:%S)$content")"   
else
   echo "$(SendSms "Subject: $(date +%Y-%m-%d' '%H:%M:%S)$content")"
fi
}


# *** function end ***

statusinfo=$(GetStatus)

echo "status: ${statusinfo}" >> "${SMS_LOG}"

exit 0