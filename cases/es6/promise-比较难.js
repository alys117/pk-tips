// https://www.bilibili.com/video/BV1Nh4y127EM/?spm_id_from=autoNext&vd_source=93581eb7bfb6dedc74fd2baddff1049d
// 如果then方法中的回调函数返回的是一个promise对象，那么then方法返回的也是一个promise对象，且两个promise对象的状态是一致的

Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4)
    // .then((res) => {console.log(res);return 4.1})
  })
  .then((res) => {
    console.log(res);
  });
console.log('start');
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  });
