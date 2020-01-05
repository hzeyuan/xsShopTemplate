<template>
	<view class="bg-gray">
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="middle"></view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after"  :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="bg-white footer padding-lr-sm flex justify-between align-center">
			<view class="flex margin-right-lg">
				<view class="flex justify-center flex-wrap align-center" style="width: 80rpx;height: 80rpx;"  @tap="toChat">
					<view class="text-xl text-black"><text class="cuIcon-home"></text></view>
					<view class="text-df text-center text-grey">首页</view>
				</view>
				<view class="flex justify-center flex-wrap align-center" style="width: 80rpx;height: 80rpx;" @tap="toShoppingCart">
					<view class="text-xl text-black">
						<view class="shoppingCartTag">
							<text class="cuIcon-cart"></text>
							<view class="cu-tag shoppingCartNumber bg-red" v-show="showShoppingCartTag">{{cart.length }}</view>
						</view>
						<view class="text-df text-center text-grey">购物</view>
					</view>
				</view>
				<view class="flex justify-center flex-wrap align-center" style="width: 80rpx;height: 80rpx;" @tap="share">
					<view class="text-xl text-black"><text class="cuIcon-share"></text></view>
					<view class="text-df text-center text-grey" @tap="share">分享</view>
				</view>
			</view>
			<view class="btn text-white">
				<view class=" bg-orange flex align-center padding-lr-sm" @tap="joinCart">加入购物车</view>
				<view class="bg-red  flex align-center padding-lr-sm" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in swiperList" :key="swiper.id">
					<image :src="swiper.img"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="flex justify-between padding-lr-sm padding-tb-xs align-center bg-red">
			<view class="text-sm text-white">
				￥<text class="text-xxl text-bold">{{goodsData.price}}</text>
				<text style="text-decoration: line-through;">￥9.9</text>
			</view>
			<view></view>
		</view>
		<view class="solids-bottom flex justify-between padding-lr-sm padding-tb-xs">
			<view class="flex flex-direction text-bold text-black text-lg">
				<text>{{goodsData.name}}</text>
				<text class="text-gray text-df">简单描述简单描述</text>
				</view> 
			<view class="  solids-left text-center" style="padding-left: 10px;"><text class="text-red">6666</text><br><text class="text-grey">关注人数</text></view>
		</view>
		<view class="flex justify-between text-sm padding-lr-sm padding-tb-xs">
			<view class="text-red" style="flex-grow: 1;">
				<text>预售时间:10月21日</text></br>
				<text>预售时间:10月22日</text>
			</view>
			<view class="text-right" style="flex-grow: 1;"><text>今日已售<text style="color: #DD524D;">209</text>份/限量6000份</text></view>
			<hr>
		</view>
		<!-- 详情 -->
		<view id="description">
			<view class=" flex justify-center align-center bg-white text-lg">———— 商品详情 ————</view>
			<view class="content"><rich-text :nodes="descriptionStr"></rich-text></view>
		</view>
		<!--模态-->
		<view class="cu-modal bottom-modal" :class="shareClass">
			<view class="cu-dialog">
				<view class="flex flex-direction">
					<view class="flex  padding justify-center">
						<view><text>分享到</text></view>
						
					</view>
					<view class="flex justify-around padding solids-bottom text-gray text-df">
						<view>
							<image src="../../static/img/share/wx.png" style="width: 50px;height: 50px;"></image>
							<view> <text>微信好友</text></view>
						</view>
						<view>
							<image src="../../static/img/share/pyq.png" style="width: 50px;height: 50px;"></image>
							<view><text>生成海报</text></view>
						</view>
					</view>
				</view>
				<view class="flex justify-center align-center padding">
					<text class="text-lg text-black" @tap="hideShare">取消</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			showShoppingCartTag:false, //购物车大于等于1时，显示数量的标签
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//轮播主图数据
			swiperList: [
				{ id: 1, img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg' },
				{ id: 2, img: 'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg' },
				{ id: 3, img: 'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg' },
				{ id: 4, img: 'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg' }
			],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{
				id:1,
				name:"商品标题商品标题商品标题商品标题商品",
				price:"127.00",
				number:1,
				service:[
					{name:"正品保证",description:"此商品官方保证为正品"},
					{name:"极速退款",description:"此商品享受退货极速退款服务"},
					{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				],
				
			},
			//商品描述html
			descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>'
		};
	},
	computed: mapState(['cart']),
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		console.log(option.cid); //打印出上个页面传递的参数。
	},
	onReady(){
		this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 100;
		e.scrollTop = e.scrollTop > tmpY ? 100 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		uni.showToast({ title: '触发上拉加载' });
	},
	mounted () {
		
	},
	methods: {
		...mapMutations(['joinShoppingCart']),
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		// 加入购物车
		joinCart(){
			this.showShoppingCartTag=true
			this.joinShoppingCart(this.goodsData)
		},
		//立即购买
		buy(){
			let tmpList=[];
			let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,price:this.goodsData.price,number:this.goodsData.number};
			tmpList.push(goods); 
			uni.setStorage({
				key:'buylist',
				data:tmpList,
				success: () => {
					uni.navigateTo({
						url:'../order/confirmation'
					})
				}
			})
		},
		//跳转购物车界面
		toShoppingCart(){
			uni.switchTab({
				url:'../tabBar/cart/cart'
			})
		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'主图',top:0},
				{name:'详情',top:0}
			]
			let commentsView = uni.createSelectorQuery().select("#description");
			console.log("commentsView",commentsView);
			commentsView.boundingClientRect((data) => {
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.upx2px(100);
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
	}
};
</script>

<style lang="scss">

.header {
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 100%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.middle {
			width: 100%;
		}
	}
	.before {
		
	}
	.after {
		background-color: #f1f1f1;
		.middle {
			font-size: 32upx;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 7%;
			view {
				width: (100%/3);
				padding: 0 3%;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4upx;
					color: #f47952;
					border-bottom: solid 4upx #f47952;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 100vw;
	swiper {
		width: 100%;
		height: 100vw;
		swiper-item {
			image {
				width: 100%;
				height: 100vw;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 100%;
	height: 99upx;
	border-top: solid 1upx #eee;
	z-index: 2;
	.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
	}
}
.shoppingCartTag{
	position: relative;
	//width: 44px;
	text-align: center;
	.shoppingCartNumber{
		border-radius: 200rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
		font-size: 20rpx;
		padding: 0rpx 10rpx;
		height: 28rpx;
		color: #ffffff;
	}
}
</style>
