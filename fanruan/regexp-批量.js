const str = 'github macos Typescript three words'

const dict = {
  github: 'GitHub',
  macos: 'macOS',
  typescript: 'TypeScript'
}

const reg = new RegExp(`\\b(${Object.keys(dict).join('|')})\\b`, 'gi')
const result = str.replace(reg, (_, key, index) => {
  console.log(_, key, index)
  return dict[key]
})
console.log(result)