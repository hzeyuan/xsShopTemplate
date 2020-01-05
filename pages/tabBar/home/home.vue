<template>
	<view class="bg-gray">
		<!-- 状态栏 -->
		<uni-nav-bar  fixed="true" title="优选商品" background-color="#e54d42" color="white" statusBar="true"></uni-nav-bar>
		<!--底部tabbar-->
		<!-- <bottomTabBar switchTab="home"></bottomTabBar> -->
		<!--店铺介绍-->		
		<view  class="margin-top padding-lr-sm padding-tb-xs">
			<view class="flex justify-between bg-white padding">
				<view class="flex">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg" mode="scaleToFill" style="width: 50px;height: 50px;"></image>
					<view class="padding-left"><text class="text-lg text-bold">xxxxxxxx超市</text></view>
				</view>
				<view class="padding-left  text-center solids-left">
					<text>123</text>
					<br>
					<text>购买指数</text>
				</view>
			</view>
		</view>
		<!--搜索框 -->
		<view class="padding-lr-sm padding-tb-xs">
			<view  class="header justify-center">
				<!-- 搜索框 -->
				<view class="input-box">
					<input
						placeholder="xxx商品"
						placeholder-style="color:#c0c0c0;"
						@tap="toSearch()"
					/>
					<view class="icon search"></view>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view
						class="dots"
						v-for="(swiper, index) in swiperList"
						:class="[currentSwiper >= index ? 'on' : '']"
						:key="index"
					></view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list padding-lr-sm padding-tb-xs ">
			<view class=" product-list flex justify-center flex-wrap">
				<view
					class="product bg-white margin-tb-xs"
					v-for="product in productList"
					:key="product.goods_id"
					@tap="toGoods(product)"
				>
					<image mode="widthFix" :src="product.img"></image>
					<view class="solids-bottom flex justify-between padding-lr-sm padding-tb-xs">
						<view class="text-bold text-black text-lg" style="width: 200px;">{{product.name}}</view> 
						<view class="solids-left text-center" style="padding-left: 10px;"><text class="text-red">6666</text><br><text class="text-grey">关注人数</text></view>
					</view>
					<view class="flex justify-between text-sm padding-lr-sm padding-tb-xs">
						<view class="text-red" style="flex-grow: 1;">
							<text>预售时间:10月21日</text></br>
							<text>预售时间:10月22日</text>
						</view>
						<view class="text-right" style="flex-grow: 1;"><text>今日已售<text style="color: #DD524D;">209</text>份/限量6000份</text></view>
						<hr>
					</view>
					<view class="flex justify-between padding-lr-sm padding-tb-xs solids-bottom align-center">
						<view class="text-df text-red">
							￥<text class="text-sl text-bold">5.99</text>
							<text class="text-grey" style="text-decoration: line-through;">￥9.9</text>
						</view>
						<view>
							<button style="background-color:#e54d42; color:#ffffff; border-radius: 5000rpx;width: 125px;height: 70rpx;" @tap.stop="joinShoppingCart(product.goods_id)">
								<text style="display: flex; font-size: 15px;align-items:center; justify-content: center;">加入购物车</text>
							</button>
						</view>
					</view>
					<!--某买的用户头像-->
					<view class="padding">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<text class="text-lg text-grey padding-left">等购买了此商品</text>
					</view>
				</view>
			</view>
			<view class="loading-text">{{ loadingText }}</view>
		</view>
	</view>
</template>

<script>
import bottomTabBar from "@/components/bottomTabBar/bottomTabBar.vue"
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import { mapState, mapMutations } from 'vuex';
export default {
	components: {uniNavBar,bottomTabBar},
	data() {
		return {
			avatar: [
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
				'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
			],
			currentSwiper: 0,
			// 轮播图片
			swiperList: [
				{ id: 1, src: 'url1', img: '/static/img/1.jpg' },
				{ id: 2, src: 'url2', img: '/static/img/2.jpg' },
				{ id: 3, src: 'url3', img: '/static/img/3.jpg' }
			],
			//猜你喜欢列表
			productList: [
				{
					goods_id: 0,
					img: '/static/img/goods/p1.jpg',
					name: '商品名称商品名称商品名称商品',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 1,
					img: '/static/img/goods/p2.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 2,
					img: '/static/img/goods/p3.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 3,
					img: '/static/img/goods/p4.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 4,
					img: '/static/img/goods/p5.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 5,
					img: '/static/img/goods/p6.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 6,
					img: '/static/img/goods/p7.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 7,
					img: '/static/img/goods/p8.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 8,
					img: '/static/img/goods/p9.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				},
				{
					goods_id: 9,
					img: '/static/img/goods/p10.jpg',
					name: '商品名称商品名称商品名称商品名称商品名称',
					price: '￥168',
					slogan: '1235人付款'
				}
			],
			loadingText: '正在加载...'
		};
	},
	computed: mapState(['cart']),
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		this.headerTop = e.scrollTop>=0?null:0;
		this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		uni.showToast({ title: '触发上拉加载' });
		let len = this.productList.length;
		if (len >= 40) {
			this.loadingText = '到底了';
			return false;
		}
		// 演示,随机加入商品,生成环境请替换为ajax请求
		let end_goods_id = this.productList[len - 1].goods_id;
		for (let i = 1; i <= 10; i++) {
			let goods_id = end_goods_id + i;
			let p = {
				goods_id: goods_id,
				img:
					'/static/img/goods/p' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
				name: '商品名称商品名称商品名称商品名称商品名称',
				price: '￥168',
				slogan: '1235人付款'
			};
			this.productList.push(p);
		}
	},
	onLoad() {
	},
	methods: {
		...mapMutations(['joinShoppingCart']),
		//消息列表
		toMsg(){
			uni.navigateTo({
				url:'../../msg/msg'
			})
		},
		//搜索跳转
		toSearch() {
			uni.showToast({ title: '建议跳转到新页面做搜索功能' });
		},
		//轮播图跳转
		toSwiper(e) {
			uni.showToast({ title: e.src, icon: 'none' });
		},
		//商品跳转
		toGoods(e) {
			uni.showToast({ title: '商品' + e.goods_id, icon: 'none' });
			uni.navigateTo({
				url: '../../goods/goods'
			});
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		}
	}
};
</script>
<style lang="scss">
.header {
	width: 100%;
	// padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	// position: fixed;
	background-color: #fff;
	.input-box {
		width: 90%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
}
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 96%;
		height: 30.7vw;

		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
					height: 30.7vw;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		.product {
			width: 100%;
			border-radius: 20upx;
			// background-color: #fff;
			// margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
		}
	}
}
</style>
