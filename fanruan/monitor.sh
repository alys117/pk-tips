#!/bin/bash
# 系统监控,记录cpu、memory、load average,当超过规定数值时发电邮通知管理员
# *** config start ***
# 当前目录路径
ROOT=$(cd "$(dirname "$0")"; pwd)

# 当前服务器名
HOST=$(hostname)

# log 文件路径
MONITOR_LOG="${ROOT}/monitor.log"

# 通知短信列表
# SMS_URL=http://134.80.247.74:8080/api/v1/message/batchSendMessage
SMS_URL=http://192.168.0.113:8084/api/receive
NOTICE_LIST='13573769853,13605319075'
NOW=$(date +%s)

# *** config end ***

# *** function start ***
# 发送告警短信
function SendSms() {
	 #curl -H "Content-type:application/json " -X POST -d '{"mobile":"13605319075","type":"S","content":"hello sms"}' http://134.80.247.74:8080/api/v1/message/batchSendMessage 
	 curl -H "content-type:application/json" -d '{"mobile":"'"${NOTICE_LIST}"'","type":"S","content":"'"$1"'"}' "${SMS_URL}"
}

# 获取节点状态发短信
function getNodeStatus() {
    local remark
    remark=$(curl http://192.168.0.103/status/json)
    if [[ $remark == *"down"* ]]; then
        echo "Subject: ${remark} @ $(date +%Y-%m-%d' '%H:%M:%S)" 
        echo "$(date +%s)" > /tmp/monitor.log
        content=$(curl http://192.168.0.103/status/json|jq -r '.servers.http[]|.name+","+.status')
		    $(SendSms "Health Status: ${content},\r good luck")
    fi
}

# *** function end ***

smsinfo=$(getNodeStatus)

echo "$(date +%Y-%m-%d' '%H:%M:%S): ${smsinfo}" >> "${MONITOR_LOG}"
exit 0
