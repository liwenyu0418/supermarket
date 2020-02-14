import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入Element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入全局重置样式
import 'normalize.css'
//引入全局公用样式
import './assets/styles/common.less'

// 引入echarts模块
import echarts from 'echarts'
// 将echarts挂载到vue原型上
Vue.prototype.$echarts = echarts

//全局注册
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
