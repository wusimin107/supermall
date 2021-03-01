import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false
//添加事件总线对象$bus
Vue.prototype.$bus = new Vue()

// 安装插件toast
Vue.use(toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
