import { pinyin } from 'pinyin'

console.log(pinyin('中心', { compact: true })) // [ [ 'zhōng' ], [ 'xīn' ] ]
console.log(
  pinyin('中心', {
    heteronym: true, // 启用多音字模式
  })
) // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]
console.log(
  pinyin('中华人民共和国', {
    heteronym: true, // 启用多音字模式
    segment: true, // 启用分词，以解决多音字问题。
  })
) // [ [ 'zhōng' ], [ 'xīn' ] ]
console.log(
  pinyin('中心', {
    style: pinyin.STYLE_INITIALS, // 设置拼音风格
    heteronym: true,
  })
) // [ [ 'zh' ], [ 'x' ] ]

console.log(
  pinyin('中心', {
    style: pinyin.STYLE_TO3NE, // 设置拼音风格
    heteronym: true,
  })
)
console.log(
  pinyin('单田芳', {
    style: 'normal', // 设置拼音风格
    mode: 'surname',
    compact: true,
  })
)
console.log(pinyin('zhongxin暴雨'))
