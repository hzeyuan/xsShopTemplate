<template>
	<view>
		<view class="bg-white padding margin">
			<view class="cu-steps">
				<view class="cu-item" :class="index > num ? '' : 'text-blue'" v-for="(item, index) in numList" :key="index">
					<text class="num" :class="index == 2 ? 'err' : ''" :data-index="index + 1"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="bg-white padding margin">
			<view class="flex justify-center align-center flex-direction">
				<view class="padding-tb-xs text-df"><text>订单金额</text></view>
				<view class="padding-tb-xs text-red text-xxl">￥3.99<text></text></view>
				<view class="padding-tb-xs text-df"><text>订单提交成功，请在10分钟内完成支付</text></view>
				<view class="padding-tb-sm text-df"><text>支付方式:</text> <text>微信支付</text></view>
			</view>
		</view>
		<view class="flex margin flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg round"@tap="doDeposit">去付款</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			numList: [
				{
					name: '提交订单'
				},
				{
					name: '付款'
				}
			],
			num: 0,
			amount: 0,
			orderName: '',
			paytype: 'alipay' //支付类型
		};
	},
	onLoad(e) {},
	methods: {
		NumSteps() {
			this.num = this.num == this.numList.length - 1 ? 0 : this.num + 1;
		},
		doDeposit() {
			//模板模拟支付，实际应用请调起微信/支付宝
			uni.showLoading({
				title: '支付中...'
			});
			setTimeout(() => {
				uni.hideLoading();
				uni.showToast({
					title: '支付成功'
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '../../pay/success/success?amount=' + this.amount
					});
				}, 300);
			}, 700);
		}
	}
};
</script>

<style lang="scss">
.block {
	width: 94%;
	padding: 0 3% 40upx 3%;
	.title {
		width: 100%;
		font-size: 34upx;
	}
	.content {
		.orderinfo {
			width: 100%;
			border-bottom: solid 1upx #eee;
			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;
				.nominal {
					flex-shrink: 0;
					font-size: 32upx;
					color: #7d7d7d;
				}
				.text {
					width: 70%;
					margin-left: 10upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 32upx;
				}
			}
		}
		.pay-list {
			width: 100%;
			border-bottom: solid 1upx #eee;
			.row {
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				.left {
					width: 100upx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					image {
						width: 80upx;
						height: 80upx;
					}
				}
				.center {
					width: 100%;
					font-size: 30upx;
				}
				.right {
					width: 100upx;
					flex-shrink: 0;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
}
.pay {
	margin-top: 20upx;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	.btn {
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: #f06c7a;
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.2);
	}
	.tis {
		margin-top: 10upx;
		width: 100%;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: baseline;
		color: #999;
		.terms {
			color: #5a9ef7;
		}
	}
}
</style>
