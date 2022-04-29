// <!--工具函数-->
const _toString = Object.prototype.toString
function getType(obj) {
  return _toString.call(obj).slice(8, -1)
}

// <!--深度优先-->
function DFSDeepClone(obj, vistied = new Set(), level = 0) {
  let res = {}

  if (getType(obj) === 'Object' || getType(obj) === 'Array') {
    if (vistied.has(obj)) {
      // 处理环状结构，循环应用
      res = obj
    } else {
      vistied[level] = obj
      vistied.add(obj)
      res = getType(obj) === 'Object' ? {} : [];
      Reflect.ownKeys(obj).forEach(k => {
        res[k] = DFSDeepClone(obj[k], vistied, level + 1)
      })
    }
  } else if (typeof obj === 'function') {
    res = eval(`(${obj.toString()})`)
  } else {
    res = obj
  }

  return res
}

// <!--广度优先-->
function BFSDeepClone(obj) {
  if (getType(obj) !== 'Object' && getType(obj) !== 'Array') {
    if (typeof obj === 'function') {
      obj = eval(`(${obj.toString()})`)
    }
    return obj
  }

  let res = {}
  const origin = [obj]
  const copy = [res]
  const vistied = new Set([obj])

  while (origin.length) {
    const _obj = origin.shift()
    const copyObj = copy.shift()

     Reflect.ownKeys(_obj).forEach(k => {
      const item = _obj[k]
      if (getType(item) === 'Object' || getType(item) === 'Array') {
        if (vistied.has(item)) {
          copyObj[k] = item
        } else {
          vistied.add(item)
          copyObj[k] = getType(item) === 'Object' ? {} : []
          origin.push(item)
          copy.push(copyObj[k])
        }
      } else if (typeof item === 'function') {
        copyObj[k] = eval(`(${item.toString()})`)
      } else {
        copyObj[k] = item
      }
    })
  }

  return res
}


const origin = {
  city: undefined,
  name: 'simon',
  hobby: {
    name: 'reading',
    level: 'high'
  },
  age: 19,
  run: function() {
    console.log('run function')
  },
  [Symbol.for('money')]: '$109',
}

const copy1 = DFSDeepClone(origin)
console.log(copy1);
copy1.run()

const copy2 = BFSDeepClone(origin)
console.log(copy2);