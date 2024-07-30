let global = 0
const drawData = {
  'draw_data': {
    'x': {
      'x_axis': [
        0
      ]
    },
    'y': {
      '增量市场增幅贡献pp': [
        '0.2751'
      ],
      '家庭市场增幅贡献pp': [
        '1.8381'
      ],
      '存量市场增幅贡献pp': [
        '1.9979'
      ]
    }
  },
  'draw_data_2': {
    'x': {
      'x_axis': [
        '济南',
        '青岛',
        '潍坊',
        '临沂',
        '淄博',
        '烟台',
        '济宁',
        '泰安',
        '德州',
        '滨州',
        '聊城',
        '菏泽',
        '日照',
        '莱芜'
      ]
    },
    'y': {
      '宽带渗透率': [
        '0.2913',
        '0.2798',
        '0.2571',
        '0.2938',
        '0.2812',
        '0.2757',
        '0.278',
        '0.2865',
        '0.2792',
        '0.2885',
        '0.2817',
        '0.2753',
        '0.279',
        '0.2821'
      ]
    }
  },
  'sql': "SELECT `IMGC_pp` AS '增量市场增幅贡献pp', `HMGC_pp` AS '家庭市场增幅贡献pp', `EMGC_pp` AS '存量市场增幅贡献pp' FROM dw_city_operation_indicator WHERE `op_time` LIKE '2024%' AND `city_name` = '济南'"
}
Object.freeze(drawData)
const fakeFetchDrawChart = async() => {
  const n = Math.random()
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = structuredClone(drawData)

      data.count = ++global
      data.draw_data = global % 2 ? drawData.draw_data : drawData.draw_data_2
      Object.keys(data.draw_data.y).forEach((key, index) => {
        data.draw_data.y[key] = data.draw_data.y[key].map(item => Math.random().toFixed(4))
      })
      data.draw_data.z = global
      delete data.draw_data.x
      delete data.draw_data.y
      console.log(data.count, data.draw_data, 'origin')
      console.log(drawData, 'fake')
      resolve(data)
    }, 1000 * n)
  })
}
async function test() {
  await fakeFetchDrawChart()
}
test()
test()


// const a = {k:1, b:2}
// Object.freeze(a)
// delete a.k
