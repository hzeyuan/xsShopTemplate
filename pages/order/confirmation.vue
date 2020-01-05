!
<template>
	<view class="bg-gray">
		<!--收货信息-->
		<view class="flex padding-lr-sm padding-tb-xs">
			<view class=" bg-white flex justify-around align-center padding-lr-sm padding-tb-xs" style="width: 100%;">
				<view><text>收货人:</text></view>
				<view style="border: 1px solid #000000; width:25vw;"><input type="text" value="名字" /></view>
				<view class="margin-left" style="border: 1px solid #000000;width:40vw;"><input type="text" value="16620981522" /></view>
			</view>
		</view>
		<!--提货地点-->
		<view style="box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.3);" class="margin-tb-sm radius margin-lr-xs padding-lr-sm padding-tb-xs bg-white">
			<view class=" flex text-lg flex-direction">
				<view class="padding-tb-xs text-red">
					<text>自提点:</text>
					<text>天河利源市场</text>
				</view>
				<view class="padding-tb-xs text-grey text-df"><text>广东省 广州市 天河区 前进街 道州市天河区前进街道广东省广州市天河区前进街道州市天河区前进街</text></view>
				<view class="padding-tb-xs">
					<text class="text-black">门店电话:</text>
					<text class="text-red">123123123123</text>
				</view>
			</view>
		</view>
		<!--商品统计-->
		<view style="box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.3);" class="margin-tb-sm radius margin-lr-xs padding-lr-sm padding-tb-xs bg-white">
			<view class=" flex text-lg flex-direction">
				<view class="flex justify-between">
					<view class="flex">
						<image src="../../static/img/goods/p10.jpg" mode="aspectFill" style="width: 80px;height: 80px;"></image>
						<view class="flex flex-direction padding-lr-sm padding-tb-xs justify-start">
							<view class="text-black text-lg"><text>好吃的冬枣 约300克一份</text></view>
							<view class="text-grey text-df"><text>1份</text></view>
							<view class="text-red text-df"><text>10月25日 16:00提货</text></view>
							<view class="text-red text-lg">
								<text>￥2.98</text>
								<text class="text-grey text-df">￥6</text>
							</view>
						</view>
					</view>
					<view class="flex align-center justify-center">
						<view class="text-lg text-black">
							<text>x{{ goodsNumber }}</text>
						</view>
					</view>
				</view>
				<view class="flex justify-between padding-lr-sm paådding-tb-xs align-center">
					<view class="text-lg"><text>购买数量</text></view>
					<view class="flex text-lg">
						<button
							class="flex align-center justify-center  text-red"
							@tap="deleteGoodsNumber"
							style="border-radius:50%; border:solid 1px #ED1C24;width: 30px;height: 30px;"
						>
							<text class="text-xl">-</text>
						</button>
						<view class="flex align-center justify-center padding-sm margin-left-sm" style="border: solid 0.1px #8799a3; width: 30px;height: 30px;">
							<text class="text-xxl">{{ goodsNumber }}</text>
						</view>
						<button class="flex align-center justify-center bg-red margin-left-sm" @tap="addGoodsNumber" style="border-radius:50%;width: 30px;height: 30px;">
							<text class="text-xl">+</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		<!--商品统计-->
		<view style="box-shadow: 0upx 0upx 25upx rgba(0,0,0,0.3);" class="margin-tb-sm radius margin-lr-xs padding-lr-sm padding-tb-xs bg-white">
			<view class="flex justify-between">
				<view class="text-df">
					<text>共计{{ goodsNumber }}键商品</text>
				</view>
				<view class="flex text-xl">
					<view><text class="text-df">应付金额:</text></view>
					<view class="text-red">
						<text class="text-sm">￥</text>
						<text>{{ totalPrice }}</text>
					</view>
				</view>
			</view>
		</view>
		<!--售后保证 -->
		<view class="margin-tb-sm radius margin-lr-xs padding-lr-sm padding-tb-xs text-grey text-sm">
			<view class="padding-tb-sm"><text>1.如果您购买的商品有任何问题，请直接与购买的门店联系!100%售后保证!</text></view>
			<view class="padding-tb-sm">
				<text>
					2.如果您找不到购买的提货门店，请致电xxx热线
					<text class="text-bold">123123123123</text>
				</text>
			</view>
		</view>
		<!-- 底部-->
		<view class="footer">
			<view class="flex justify-between bg-white">
				<view class="flex justify-center align-center">
					<text class="text-lg text-black">合计:</text>
					<view class="text-red text-xl">
						<text class="text-df">￥</text>
						<text>{{ totalPrice }}</text>
					</view>
				</view>
				<view style="width: 150px;"><button class="bg-red" @tap="showModal">提交订单</button></view>
			</view>
		</view>
		<!--模态-->
		<view class="cu-modal bottom-modal" :class="modalShow">
			<view class="cu-dialog">
				<view class="flex bg-white justify-center align-center flex-direction margin-bottom-sm" >
					<view class="flex justify-start bg-red padding-sm  margin-bottom-sm"><text class="text-white">10月26日 16:00提货</text></view>
					<view class="text-red text-df"><text>此商品需要您到店自提，请仔细确认地址!</text></view>
				</view>
				<view class="flex bg-gray padding-xl justify-center align-center flex-direction margin-tb-sm" >
					<view><text class="text-lg text-black">自提门店:天河利源超市店</text></view>
					<view><text class="text-df text-grey">广东省广州市天河区前进街道 xxx</text></view>
				</view>
				<view class="bg-white flex padding-xl justify-around">
					<button class="cu-btn round line-gray padding-xl" @tap="hideModal"><text>取消付款</text></button>
					<button class="cu-btn round line-red padding-xl" @tap="confirmOrders"><text>确认订单</text></button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			goodsNumber: 1,
			goodsPrice: 2.98,
			modalShow: false
		};
	},
	computed: {
		totalPrice: function() {
			return this.goodsNumber * this.goodsPrice;
		}
	},
	methods: {
		addGoodsNumber() {
			this.goodsNumber += 1;
		},
		deleteGoodsNumber() {
			if (this.goodsNumber <= 1) {
				this.goodsNumber = 1;
			} else {
				this.goodsNumber -= 1;
			}
		},
		showModal() {
			this.modalShow = 'show';
		},
		hideModal() {
			this.modalShow = '';
		},
		confirmOrders() {
			//本地模拟订单提交UI效果
			uni.showLoading({
				title:'正在提交订单...'
			})
			setTimeout(()=>{
				uni.setStorage({
					key:'paymentOrder',
					data:'',
					success: () => {
						uni.hideLoading();
						uni.navigateTo({
							url:"../pay/payment/payment?amount="+this.sumPrice
						})
					}
				})
			},1000)
		}
	}
};
</script>
<style>
.footer {
	position: fixed;
	bottom: 0;
	width: 100vw;
}
</style>
