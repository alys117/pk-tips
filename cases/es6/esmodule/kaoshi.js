import fetch from "node-fetch";

fetch("https://edu.inspur.com/api/v1/course-study/new/course-front/update-progress", {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": "Bearer__195edffc62bb0924b605fefa60f49e77",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "Referer": "https://edu.inspur.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "logId=2ujsudYAJPr1u4cmhG433W%2Fn7tu%2FoJVvqEFzEqZngPVjL2CMD8QdrVkQDk4Ni56i&lessonLocation=N8XxZPBkHR4UcAuMtuMC4Q%3D%3D&entrance=CPlDBZRKwiIIxvsraFgmNA%3D%3D&singleMark=8RGBNTluuAXqe1E0ld6%2BdfQufvL017Y5DBWMxWHzwIlcFGJiS4z%2FsmG3VHXdTigr",
  "method": "POST"
});