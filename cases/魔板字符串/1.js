// 模板字符串 在script标签中，所以要用<\/script>转义，否则js代码会解析出错，在node中就不需要转义

const str = `<script setup>
  const b = '\/'
  const c = '\`'
</script>
<style>
.remote-chart {
  height: 100%
}
</style>`
console.log(str);