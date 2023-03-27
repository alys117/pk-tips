// string转base64
function stringToBase64(str) {
    return Buffer.from(str).toString('base64');
}
console.log(stringToBase64('user'));

// base64转string
function base64ToString(str) {
    return Buffer.from(str, 'base64').toString();
}
console.log(base64ToString('dXNlcg=='));

// string转hex  
function stringToHex(str) {
  var val = "";
  for (var i = 0; i < str.length; i++) {
    if (val == "")
      val = str.charCodeAt(i).toString(16);
    else
      val += str.charCodeAt(i).toString(16);
  }
  return val;
}
console.log(stringToHex('abc'));

// hex转bytes
function hexToBytes(str) {
  if (!str) {
    return new Uint8Array();
  }
  var a = [];
  for (var i = 0, len = str.length; i < len; i+=2) {  
    a.push(parseInt(str.substr(i,2),16));
  }
  return new Uint8Array(a);
}
console.log(hexToBytes('ab'));