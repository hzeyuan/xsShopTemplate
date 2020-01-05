<template>
	<view class="bg-gray">
		<!--底部tabbar-->
		<!-- <bottomTabBar switchTab="user"></bottomTabBar> -->
		<!-- 用户信息 -->
		<view class="flex bg-red align-center padding-lr" style="padding-bottom: 120upx;">
			<!-- 头像 -->
			<view class="margin-right-lg"><view class="cu-avatar lg round" style="background-image: url('/static/img/face.jpg');"></view></view>
			<!-- 昵称,个性签名 -->
			<view style="width: 100%;">
				<view class="text-white text-xl" @tap="toLogin">{{ user.username }}</view>
				<view class="text-white text-df" @tap="toSetting">{{ user.signature }}</view>
			</view>
			<!-- 二维码按钮 -->
			<view class="erweima" @tap="toMyQR"><view class="icon qr"></view></view>
		</view>
		<view style="margin-top: -80upx;box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.3);" class="radius margin-lr-xs padding-lr-sm padding-tb-xs bg-white">
			<view class="solids-bottom padding-lr padding-tb-sm"><text class="text-black">我的订单</text></view>
			<!-- 订单类型 -->
			<view class="flex padding-lr-sm padding-tb-lg justify-around">
				<view style="width:25%;" class="flex flex-direction justify-center" v-for="(row, index) in orderList" :key="index" @tap="toOrderList(index)">
					<view class="text-center"><view class="icon" :class="row.icon"></view></view>
					<view class="text text-center">{{ row.text }}</view>
				</view>
			</view>
		</view>
		<!-- 工具栏 -->
		<view style="box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.3);" class="margin-tb-sm radius margin-lr-xs padding-lr-sm padding-tb-xs bg-white">
			<view class="flex justify-between solids-bottom padding-tb-sm text-lg black">
				<view>我的自提点</view>
				<view>切换自提点</view>
			</view>
			<view class=" flex text-lg flex-direction">
				<view class="padding-tb-xs text-red"><text>天河利源市场</text></view>
				<view class="padding-tb-xs text-grey text-df"><text>广东省 广州市 天河区 前进街 道州市天河区前进街道广东省广州市天河区前进街道州市天河区前进街</text></view>
				<view class="padding-tb-xs">
					<text class="text-black">门店电话:</text>
					<text class="text-red">123123123123</text>
				</view>
			</view>
		</view>
		<view class="margin-tb-sm radius margin-lr-xs padding-lr-sm padding-tb-xs text-grey text-sm">
			<view class="padding-tb-sm"><text>1.如果您购买的商品有任何问题，请直接与购买的门店联系!100%售后保证!</text></view>
			<view class="padding-tb-sm">
				<text>
					2.如果您找不到购买的提货门店，请致电xxx热线
					<text class="text-bold">123123123123</text>
				</text>
			</view>
			<view class="flex  flex-direction"><button class="cu-btn bg-red margin-tb-sm lg round" @tap="toShop">去购物</button></view>
		</view>
	</view>
</template>
<script>
import bottomTabBar from "@/components/bottomTabBar/bottomTabBar.vue"
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
	components: {uniNavBar,bottomTabBar},
	data() {
		return {
			isfirst: true,
			//个人信息,
			user: {
				username: '游客1002',
				face: '/static/img/face.jpg',
				signature: '点击昵称跳转登录',
				integral: 0,
				balance: 0,
				envelope: 0
			},
			// 订单类型
			orderList: [{ text: '全部订单', icon: 'fukuan' }, { text: '未付款', icon: 'fahuo' }, { text: '待提货', icon: 'shouhuo' }, { text: '已提货', icon: 'pingjia' }]
		};
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop >= 0 ? 'fixed' : 'absolute';
		this.headerTop = e.scrollTop >= 0 ? null : 0;
		this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
	},
	onLoad() {
		this.statusHeight = 0;
		// #ifdef APP-PLUS
		this.showHeader = false;
		this.statusHeight = plus.navigator.getStatusbarHeight();
		// #endif
	},
	onReady() {
		//此处，演示,每次页面初次渲染都把登录状态重置
		uni.setStorage({
			key: 'UserInfo',
			data: false,
			success: function() {},
			fail: function(e) {}
		});
	},
	onShow() {
		uni.getStorage({
			key: 'UserInfo',
			success: res => {
				if (!res.data) {
					if (this.isfirst) {
						//this.toLogin();
					}
					return;
				}
				this.user = res.data;
			},
			fail: e => {
				//this.toLogin();
			}
		});
	},
	methods: {
		toOrderList(index) {
			uni.setStorageSync('tbIndex', index);
			uni.navigateTo({ url: '../../user/order_list/order_list?tbIndex=' + index });
		},
		toShop() {
			uni.switchTab({
				url: '../../tabBar/home/home'
			})
			
		},
		toMyQR() {
			uni.navigateTo({
				url: '../../user/myQR/myQR'
			});
		},
		toLogin() {
			uni.showToast({ title: '请登录', icon: 'none' });
			uni.navigateTo({
				url: '../../login/login'
			});
			this.isfirst = false;
		},
		isLogin() {
			//实际应用中,用户登录状态应该用token等方法去维持登录状态.
			const value = uni.getStorageSync('UserInfo');
			if (value) {
				return true;
			}
			return false;
		},
		toDeposit() {
			uni.navigateTo({
				url: '../../user/deposit/deposit'
			});
		}
	}
};
</script>
<style lang="scss">
.erweima {
	flex-shrink: 0;
	width: 10vw;
	height: 10vw;
	margin-left: 5vw;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(to left, #fbbb37 0%, #fcf0d0 105%);
	.icon {
		color: #7b6335;
		font-size: 42upx;
	}
}
</style>
