import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import 'amfe-flexible'

// 导入全局样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
