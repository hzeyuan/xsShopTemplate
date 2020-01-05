import Vue from 'vue'
import App from './App'
import shoppingCart from './store/shoppingCart'

Vue.config.productionTip = false
Vue.prototype.$store = shoppingCart
App.mpType = 'app'

const app = new Vue({
	shoppingCart,
    ...App
})
app.$mount()
