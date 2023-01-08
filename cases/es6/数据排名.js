var user = [
  { "name": "has",   "age": 17, "height": 165 , "idx": 1},
  { "name": "saf",   "age": 17, "height": 172 , "idx": 2},
  { "name": "bis",   "age": 17, "height": 172 , "idx": 3},
  { "name": "tus",   "age": 17, "height": 172 , "idx": 4},
  { "name": "gngh1",  "age": 45, "height": 182 , "idx": 5},
  { "name": "gngh2",  "age": 45, "height": 182 , "idx": 6},
  { "name": "gngh3",  "age": 45, "height": 182 , "idx": 7},
  { "name": "yjerw", "age": 42, "height": 156 , "idx": 8},
  { "name": "cvb",   "age": 22, "height": 176 , "idx": 9},
  { "name": "wetty", "age": 32, "height": 178 , "idx": 10},
  { "name": "aDNY",  "age": 34, "height": 175 , "idx": 999},
]
var users = user;
users.sort(function (a, b) {
  if(a.idx === 999) {
    return true;
  } else {
    return a.age - b.age;
  }
});
console.log(users);
users.map(function (item) {
  item.sn = users.indexOf(item) + 1;
})
console.log(users);
users.reduce(function (prev, next) {
  if(prev.age === next.age) {
    next.sn = prev.sn;
  }
  return next;
})
console.log(users);
users.sort(function (a, b) {
  return a.idx - b.idx;
});
console.log(users);