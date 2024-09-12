async function wait(second) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('等待了' + second + '秒');
    }, second * 1000);
  });
}
(async function () {
  console.time('timing');
  console.log('begin...');
  console.log(await wait(2));
  console.log('next...');
  console.log(await wait(3));
  console.timeEnd('timing');
})()