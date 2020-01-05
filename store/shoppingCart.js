import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const shoppingCart = new Vuex.Store({
	state: {
		goodsTest: {
			id: 1,
			img: '/static/img/goods/p1.jpg',
			name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
			price: 127.5,
			number: 1,
			selected: false
		},
		cart: [], //购物车商品列表
	},
	mutations: {
		//刷新展示购物车
		refreshShoppingCart() {

		},
		//加入购物车
		joinShoppingCart(state, goods) {
			state.cart.push(state.goodsTest)
			uni.setTabBarBadge({
				index: 1,
				text: String(state.cart.length)
			})
		},
		//删除购物车商品
		delShoppingCart(state, goodsId) {
			state.cart.pop()
			console.log(state.cart);
			if (state.cart.length == 0) {
				uni.removeTabBarBadge({index:1})
			} else {
				uni.setTabBarBadge({
					index: 1,
					text: String(state.cart.length)
				})
			}

		},
		//清空购物车
		clearShoppingCart(state){
			state.cart = []
			uni.removeTabBarBadge({index:1})
		}
	}
})

export default shoppingCart
