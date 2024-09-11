const draw_data1 = {
  x: {
    x_axis: ['济南', '青岛', '烟台']
  },
  y: {
    '指标1': [1, 2, 3],
    '指标2': [4, 5, 6],
  }
};
const draw_data = {
  "x": {
    "x_axis": [
      0
    ]
  },
  "y": {
    "增量市场增幅贡献pp": [
      "0.7104"
    ],
    "家庭市场增幅贡献pp": [
      "0.6474"
    ],
    "存量市场增幅贡献pp": [
      "0.3364"
    ]
  }
}


const columns = ['指标', ...draw_data.x.x_axis]
const list = Object.keys(draw_data.y).map((key, index) => {
  return {
    '指标': key
  }
});
Object.values(draw_data.y).forEach((value, index) => {
  value.forEach((v, i) => {
    list[index][draw_data.x.x_axis[i]] = v
  });
});


console.log(columns);
console.log(list);