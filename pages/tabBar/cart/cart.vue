<template>
	<view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="cart.length == 0">
				<text>购物车是空的哦~</text>
				
			</view>
			<view class="row flex align-center" v-for="(row, index) in cart" :key="index">
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(row.id)"><view class="icon shanchu"></view></view>
				<!-- 商品 -->
				<view
					class="carrier flex align-center"
					:class="[theIndex == index ? 'open' : oldIndex == index ? 'close' : '']"
					@touchstart="touchStart(index, $event)"
					@touchmove="touchMove(index, $event)"
					@touchend="touchEnd(index, $event)"
				>
					<!-- checkbox -->
					<view class="checkbox-box padding-left-sm margin-right-sm" @tap="selected(index)">
						<view class="checkbox"><view :class="[row.selected ? 'on' : '']"></view></view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info flex margin-right-sm" @tap="toGoods(row)">
						<view class="img margin-right-xs"><image :src="row.img"></image></view>
						<view class="info flex flex-wrap flex-direction justify-between">
							<view class="title flex">{{ row.name }}</view>
							<!-- <view class="spec flex align-center">{{ row.spec }}</view> -->
							<view class="price-number flex justify-between">
								<view class="price">￥{{ row.price }}</view>
								<view class="number">
									<view class="sub" @tap.stop="sub(index)"><view class="icon jian"></view></view>
									<view class="input" @tap.stop="discard"><input type="number" v-model="row.number" @input="sum($event, index)" /></view>
									<view class="add" @tap.stop="add(index)"><view class="icon jia"></view></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 脚部菜单 -->
		<view class="footer bg-white flex justify-between align-center padding-lr-sm">
			<view class="checkbox-box" @tap="allSelect">
				<view class="checkbox"><view :class="[isAllselected ? 'on' : '']"></view></view>
				<view class="text">全选</view>
				<view class="delBtn flex  padding-lr-sm text-red margin-left-sm" @tap="deleteList" v-if="selectedList.length > 0">删除</view>
			</view>
			<view class="settlement flex align-center justify-end">
				<view class="sum flex margin-right-sm">
					合计:
					<view class="money text-bold">￥{{ sumPrice }}</view>
				</view>
				<view class="btn bg-red text-white flex justify-center align-center padding-lr-sm" @tap="toConfirmation">结算({{ selectedList.length }})</view>
			</view>
		</view>
		<!--底部tabbar-->
		<!-- <bottomTabBar switchTab="cart"></bottomTabBar> -->
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
			sumPrice: '0.00',
			selectedList: [], //被选中列表
			isAllselected: false, //都被选中
			//控制滑动效果
			theIndex: null,
			oldIndex: null,
			isStop: false,
		};
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onLoad() {
		//兼容H5下结算条位置
		// #ifdef H5
		this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px';
		// #endif
		// #ifdef APP-PLUS
		this.showHeader = false;
		this.statusHeight = plus.navigator.getStatusbarHeight();
		// #endif
		this.goodsList = this.cart
	},
	computed: mapState(['cart']),
	methods: {
		...mapMutations(['delShoppingCart','clearShoppingCart']),
		//加入商品 参数 goods:商品数据
		joinGoods(goods) {
			/*
			 * 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
			 * 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
			 * 一般商城购物车的增删改动作是由后端来完成的,
			 * 后端记录后返回前端更新前端缓存
			 */
			let len = this.goodsList.length;
			let isFind = false; //是否找到ID一样的商品
			for (let i = 0; i < len; i++) {
				let row = this.goodsList[i];
				if (row.id == goods.id) {
					//找到商品一样的商品
					this.goodsList[i].number++; //数量自增
					isFind = true; //找到一样的商品
					break; //跳出循环
				}
			}
			if (!isFind) {
				//没有找到一样的商品，新增一行到购物车商品列表头部
				this.goodsList[i].unshift(goods);
			}
		},
		//控制左滑删除效果-begin
		touchStart(index, event) {
			//多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			console.log("theIndex",this.theIndex);
			this.oldIndex = this.theIndex;
			this.theIndex = null;
			console.log("theIndex",this.theIndex);
			//初始坐标
			this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			console.log("this.initXY",this.initXY);
		},
		touchMove(index, event) {
			//多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			let moveX = event.touches[0].pageX - this.initXY[0];
			let moveY = event.touches[0].pageY - this.initXY[1];
			
			console.log("moveX",moveX,"moveY",moveY);
			if (this.isStop || Math.abs(moveX) < 5) {
				return;
			}
			console.log("移动距离过小");
			if (Math.abs(moveY) > Math.abs(moveX)) {
				// 竖向滑动-不触发左滑效果
				this.isStop = true;
				return;
			}
			//向左滑动
			if (moveX < 0) {
				this.theIndex = index;
				this.isStop = true;
			}else if (moveX > 0) {
				if (this.theIndex != null && this.oldIndex == this.theIndex) {
					this.oldIndex = index;
					this.theIndex = null;
					this.isStop = true;
					setTimeout(() => {
						this.oldIndex = null;
					}, 150);
				}
			}
		},
		touchEnd(index, $event) {
			//结束禁止触发效果
			this.isStop = false;
		},
		//控制左滑删除效果-end

		//商品跳转
		toGoods(e) {
			uni.showLoading({
				title:'加载中'
			});
			uni.navigateTo({
				url: '../../goods/goods',
				success() {
					uni.hideLoading()
				}
			});
		},
		//跳转确认订单页面
		toConfirmation() {
			let tmpList = [];
			let len = this.goodsList.length;
			for (let i = 0; i < len; i++) {
				if (this.goodsList[i].selected) {
					tmpList.push(this.goodsList[i]);
				}
			}
			if (tmpList.length < 1) {
				uni.showToast({
					title: '请选择商品结算',
					icon: 'none'
				});
				return;
			}
			uni.setStorage({
				key: 'buylist',
				data: tmpList,
				success: () => {
					uni.navigateTo({
						url: '../../order/confirmation'
					});
				}
			});
		},
		//删除商品
		deleteGoods(id) {
			this.delShoppingCart(id)
		},
		// 删除商品s
		deleteList() {
			this.clearShoppingCart()
			this.sum()
		},
		// 选中商品
		selected(index) {
			this.goodsList[index].selected = this.goodsList[index].selected ? false : true;
			let i = this.selectedList.indexOf(this.goodsList[index].id);
			i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.goodsList[index].id);
			this.isAllselected = this.selectedList.length == this.goodsList.length;
			this.sum();
		},
		//全选
		allSelect() {
			let len = this.goodsList.length;
			let arr = [];
			for (let i = 0; i < len; i++) {
				this.goodsList[i].selected = this.isAllselected ? false : true;
				arr.push(this.goodsList[i].id);
			}
			this.selectedList = this.isAllselected ? [] : arr;
			this.isAllselected = this.isAllselected || this.goodsList.length == 0 ? false : true;
			this.sum();
		},
		// 减少数量
		sub(index) {
			if (this.cart[index].number <= 1) {
				return;
			}
			this.cart[index].number--;
			this.sum();
		},
		// 增加数量
		add(index) {
			this.cart[index].number++;
			this.sum();
		},
		// 合计
		sum(e, index) {
			this.sumPrice = 0;
			let len = this.cart.length;
			for (let i = 0; i < len; i++) {
				if (this.cart[i].selected) {
					if (e && i == index) {
						this.sumPrice = this.sumPrice + e.detail.value * this.cart[i].price;
					} else {
						this.sumPrice = this.sumPrice + this.cart[i].number * this.cart[i].price;
					}
				}
			}
			this.sumPrice = this.sumPrice.toFixed(2);
		},
		discard() {
			//丢弃
		}
	}
};
</script>
<style lang="scss">
.checkbox-box {
	display: flex;
	align-items: center;
	.checkbox {
		width: 35upx;
		height: 35upx;
		border-radius: 100%;
		border: solid 2upx #e54d42;
		display: flex;
		justify-content: center;
		align-items: center;
		.on {
			width: 25upx;
			height: 25upx;
			border-radius: 100%;
			background-color: #e54d42;
		}
	}
	.text {
		font-size: 28upx;
		margin-left: 10upx;
	}
}

.goods-list {
	width: 100%;
	padding: 20upx 0 120upx 0;
	.tis {
		width: 100%;
		height: 80vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32upx;
	}
	.row {
		width: calc(92%);
		height: calc(22vw + 40upx);
		margin: 20upx auto;
		border-radius: 15upx;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
		z-index: 4;
		border: 0;
		.menu {
			.icon {
				color: #fff;
			}
			position: absolute;
			width: 30%;
			height: 100%;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: red;
			color: #fff;
			z-index: 2;
		}
		.carrier {
			@keyframes showMenu {
				0% {
					transform: translateX(0);
				}
				100% {
					transform: translateX(-30%);
				}
			}
			@keyframes closeMenu {
				0% {
					transform: translateX(-30%);
				}
				100% {
					transform: translateX(0);
				}
			}
			&.open {
				animation: showMenu 0.25s linear both;
			}
			&.close {
				animation: closeMenu 0.15s linear both;
			}
			background-color: #fff;
			position: absolute;
			height: 100%;
			z-index: 3;

			.goods-info {
				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					// margin-right: 10upx;
					image {
						width: 22vw;
						height: 22vw;
					}
				}
				.info {
					// width: 100%;
					height: 22vw;
					overflow: hidden;
					position: relative;
					.title {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						text-align: justify;
						overflow: hidden;
					}
					.price-number {
						width: 100%;
						bottom: 0upx;
						align-items: flex-end;
						font-size: 28upx;
						height: 60upx;
						.price {
						}
						.number {
							display: flex;
							justify-content: center;
							align-items: flex-end;
							.input {
								width: 60upx;
								height: 60upx;
								margin: 0 10upx;
								background-color: #f3f3f3;
								input {
									width: 60upx;
									height: 60upx;
									display: flex;
									justify-content: center;
									align-items: center;
									text-align: center;
									font-size: 26upx;
								}
							}
							.sub,
							.add {
								width: 45upx;
								height: 45upx;
								background-color: #f3f3f3;
								border-radius: 5upx;
								.icon {
									font-size: 22upx;
									width: 45upx;
									height: 45upx;
									display: flex;
									justify-content: center;
									align-items: center;
								}
							}
						}
					}
				}
			}
		}
	}
}
.footer {
	width: 100%;
	height: 100upx;
	position: fixed;
	bottom: 0upx;
	z-index: 5;
	.delBtn {
		border: solid 1upx #e54d42;
		height: 50upx;
		border-radius: 30upx;
	}

	.btn {
		height: 50upx;
		border-radius: 30upx;
	}
}
</style>
