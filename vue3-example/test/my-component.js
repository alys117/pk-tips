// my-component.js
import { ref, watch, onMounted } from 'vue'
export default {
  setup() {
    const x = ref(0)
    const y = ref(0)
    const change = () => {
      x.value++
    }
    // 单个 ref
    watch(x, (newX) => {
      console.log(`x is ${newX}`)
    })

    // getter 函数
    watch(
      () => x.value + y.value,
      (sum) => {
        console.log(`sum of x + y is: ${sum}`)
      }
    )
    onMounted(() => {
      console.log('mounted!')
      console.time()
      delay(1200)
      console.timeEnd()
    })
    function delay(duration=100) {
      // 延迟函数
      const now = Date.now()
      while (Date.now() - now < duration) {}
      console.log('end delay')
    }


    const count = ref(0)
    const plus = () => {
      count.value++
    }

    const fi = function(el){
      console.dir(el)
    }
    return { count, plus, change, fi }
  },
  template: /*html*/`
  <div>count is {{ count }}</div>
  <div>
    <button @click=plus>+1</button>
    <button @click=change>change</button>
    <input :ref="fi">
  </div>
  `
}