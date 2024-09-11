const draw_data = {
  x: {
    x_axis: ['济南', '青岛', '烟台']
  },
  y: {
    '指标1': [1, 2, 3],
    '指标2': [4, 5, 6],
  }
}

const datalist = [
  {'济南': 1, '青岛': 2, '烟台': 3},
  {'济南': 4, '青岛': 5, '烟台': 6}
]
写出从 draw_data 转换到 datalist 的代码

const columns = [{label: '济南'}, {label: '青岛'}, {label: '烟台'}]