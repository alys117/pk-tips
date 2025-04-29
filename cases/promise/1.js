const obj1 = {a: 1, b: 2, c: 3};
function test() {
    return obj1
}
const obj2 = test();

console.log(obj1 === obj2);

const p1 = Promise.resolve(1);
async function test2() {
    return p1
}
const p2 = test2();

console.log(p1 === p2);

async function test3() {
    return 1
}
const p3 = test3();
console.log(p3);