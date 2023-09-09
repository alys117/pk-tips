const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});

let thenable = {
  then: function (resolve, reject) {
    console.log(123);
    resolve(42);
  },
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value); // 42
});
