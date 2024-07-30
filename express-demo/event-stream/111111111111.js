function revertFormat(arr) {
  const result = {};

  arr.forEach(item => {
    if (item.children && item.children.every(child => typeof child === 'object' && !child.children)) {
      // 如果 children 中的每个元素都是基本类型（不包含更深层的 children）
      result[item.label] = item.children.map(child => child.label);
    } else if (item.children && item.children.some(child => typeof child === 'object' && child.children)) {
      // 如果 children 中至少有一个元素包含更深层的 children
      result[item.label] = revertFormat(item.children);
    }
  });

  return result;
}

// 示例使用
const aa = [
  {
    label: 'label',
    children: [
      { label: 'label1' },
      { label: 'label2' }
    ]
  },
  {
    label: 'label3',
    children: [
      {
        label: 'label4',
        children: [
          { label: 'label5' },
          { label: 'label6' }
        ]
      },
      { label: 'label7' }
    ]
  }
];

console.log(revertFormat(aa), '123');

const bb = [
  "text1","text2","text3"
]
const bb2 = {
  "text1": ["text2", "text3"],
  "text4": ["text5", {"text6": ["text7", "text8"]}]
};

setTimeout(() => {
  [1,2,3].forEach(item => {
    console.log(Math.random());
  })
}, 10);
setTimeout(() => {
  [1,2,3].forEach(item => {
    console.log(Math.random());
  })
}, 10);