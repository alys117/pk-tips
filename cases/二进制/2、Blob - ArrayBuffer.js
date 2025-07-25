let str = 'hello，你好吗？'
let blob = new Blob([str],{type:'text/plain;charset=utf-8'});
let utf8decoder = new TextDecoder()
blob.arrayBuffer().then(buffer=>{
  // ArrayBuffer
  console.log(buffer)
  let text = utf8decoder.decode(buffer)
  // String
  console.log(text)
})
