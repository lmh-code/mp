import Vue from 'vue'
import App from './App'
import request from '@/utils/request'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = request
const app = new Vue(App)
app.$mount()
// "subPackages": [
//   {
//     "root": "pages/ShelvesMgt/",
//     "pages": [
//       "main"
//     ]
//   }
// ],
