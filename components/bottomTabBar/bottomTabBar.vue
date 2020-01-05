<template>
	<view class="TabBarfooter">
		<view class="flex bg-white justify-around  align-center text-xxl">
			<view class="flex justify-center align-center flex-direction" :class="switchTab=='home'?'text-red':''" @tap="toPage('home')">
				<view><text class="cuIcon-home"></text></view>
				<view class="text-df">首页</view>
			</view>
			<view class="flex justify-center align-center flex-direction" :class="switchTab=='cart'?'text-red':''" @tap="toPage('cart')">
				<view>
					<text class="cuIcon-cart"></text>
					<!-- <view class="cu-tag shoppingCartNumber bg-red" v-show="cart.length>=1">{{cart.length }}</view> -->
					</view>
				<view class="text-df">购物车</view>
			</view>
			<view class="flex justify-center align-center flex-direction" :class="switchTab=='user'?'text-red':''" @tap="toPage('user')">
				<view><text class="cuIcon-people"></text></view>
				<view class="text-df">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
// import { mapState, mapMutations } from 'vuex';
export default {
	name: 'bottomTabBar',
	data() {
		return {
		};
	},
	props: {
		 //默认选择首页导航条
		switchTab:{
			type:String,
			default:'home'
		}
	},
	// computed: mapState(['cart']),
	methods: {
		toPage(page) {
			//跳转连接
			uni.switchTab({
				url: `../${page}/${page}`
			});
		}
	}
};
</script>
<style>
.TabBarfooter {
	position: fixed;
	bottom: 0;
	z-index: 999;
	width: 100%;
	height: 2 * var(--status-bar-height);
}

</style>
