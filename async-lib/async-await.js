
function request(type) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          type === 'a' ? resolve('resolve...') : reject('reject...')
      }, 2000);
  })
}

/**
 * 高级的处理,接收一个promise，返回一个resolve状态的promise
 * 
 * @param {*} promise 
 */
 const hRequest = promise  => promise.then(res => [undefined, res]).catch(err => [err,undefined])


 async function getData2() {
     let err,result;
     [err,result] = await hRequest(request('a'));
     console.log(err,result);
     [err,result] = await hRequest(request('b'));
     console.log(err,result);
 }
 getData2();
