let obj = {
    name: 'zhangsan',
    age: 18
}

type Key = keyof typeof obj

function ob<T extends object, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

ob(obj, 'name')
console.log(ob(obj, 'age'));
// ob(obj, 'sex')