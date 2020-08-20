import Vue from 'vue'
import App from './App.vue'
import marked from 'marked'
import axios from 'axios'
/* router */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import createRouter from './router'
const router = createRouter()
router.afterEach(() => {
  window.scrollTo(0, 0)
})
/* router End */

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import dayjs from 'dayjs'

import 'normalize.css/normalize.css'
import './assets/style/app.scss'
import 'remixicon/fonts/remixicon.css'

const utils = require('./utils')
const { deployAxios } = utils
import swal from 'sweetalert'

Vue.prototype.$swal = swal
Vue.prototype.$utils = utils
Vue.prototype.$dayjs = dayjs

// marked + highlight.js config
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    const hljs = require('highlight.js')
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    return hljs.highlight(validLanguage, code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})
Vue.prototype.$marked = marked
Vue.prototype.$http = deployAxios(axios)

/* 全局注册 */
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /App[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
/* 全局注册 End */

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')