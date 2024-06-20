// my-component.js
import { ref, watch, onMounted } from 'vue'
import markdownit from 'markdown-it'
import hljs from 'highlight.js'

export default {
  setup() {
    const count = ref(0)
    const plus = () => {
      count.value++
    }

    // Actual default values
    const md = markdownit({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre><code class="hljs">' +
                   hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                   '</code></pre>';
          } catch (__) {}
        }
    
        return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
    const ori = ref('##### markdown-it rulezz!\n')

    const result = ref(md.render(ori.value)); //传入文本

    let url = 'http://localhost:8000/v1/chat/completions';
    // url = 'http://localhost:5502/v1/chat/completions';
    fetch(url).then(function (response) {
      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      reader.read().then(function processText({ done, value }) {
        // console.log({ done, value });
        if (done) {
          console.log('Stream complete');
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        ori.value += decoder.decode(value, { stream: true });
        result.value = md.render(ori.value)
        let parts = buffer.split('\n');
        buffer = parts.pop();
        for (let part of parts) {
          console.log('Received', part);
        }
        return reader.read().then(processText);
      });
    });

    return { count, plus, result }
  },
  template: /*html*/`
  <div>count is {{ count }}</div>
  <div>
    <button @click=plus>+1</button>
    <input />
  </div>
  <div v-html="result" style="border: 1px solid #ccc; margin-top: 10px; padding: 10px;"></div>
  `
}