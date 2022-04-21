
/* 
watermark(mark, paper[, options])
mark {String} 水印（暂时只支持图片水印）
paper {String} 画布
options {Object}
gap {Number} 水印与边界的距离, 当位置并非 center 时有效, 默认: 8 像素
mark {Object}
opacity {Number} 水印透明度, 默认: 0~1
scale {Number} 水印缩放比例, 默认: 0~1
position {String|Object} 水印位置, center 表示水平 & 垂直居中，top-left 或 left-top 表示左上角，top-right 或 right-top 表示右上角，bottom-right 或 right-bottom 表示右下角，bottom-left 或 left-bottom 表示左下角，{ x: 0, y: 0 }, 表示完全手动配置水印位置
output {Object}
filename {String} 输出文件的名称，包括后缀
path {String} 默认 process.cwd()


*/

const watermark = require('@oopsunome/watermark');

(async () => {
  await watermark(
    './static/img/zender_logo.png',
    './static/img/html_logo.png',
    {
      gap: 10,
      mark: {
        position: 'bottom-right',
        scale: 0.8,
        opacity: 0.5,
      },
      output: {
        filename: '_mark.png',
        path: './static/img/',
      },
    },
  );
})();