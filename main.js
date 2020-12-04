import Vue from 'vue'
import App from './App'
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
import initModal from "@/store/myAlert.js";
initModal(Vue);


import api from '@/common/vmeitime-http/interface.js';
Vue.prototype.$api = api;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
