<template>
	<view class="page" :class="getThemeClass">
		<!-- 余额充值 -->
		<unavbar title="转账" v-if="false">
			<template #barRight>
				<view @click="record">转账记录</view>
			</template>
		</unavbar>
		<!-- 充值方式 -->
		<view class="recharge_card card-bg" style="justify-content: flex-start;">
			<view class="receive_left u-m-r-20">
				<view class="recharge_name" style="margin-left: 0;">收款人</view>
			</view>
			<!-- 到账方式 -->
			<view class="phone-input-box">
				<input type="text" class="" v-model="phone" placeholder="请输入收款人账号"
					placeholder-style="color:#C9C9C9;font-size: 28rpx;" />
			</view>
		</view>

		<view class="auction_card card-bg">
			<!--  提现金额 -->
			<view class="auction_title">转账USDT数值</view>
			<view class="auction_price">
				<!-- <text>USDT</text> -->
				<!-- 请输入充值金额 -->
				<input type="number" v-model="bid" placeholder="请输入转账USDT数值"
					placeholder-style="font-weight:500;color:#C9C9C9;" />
			<!-- 全部 -->
			<!-- <text class="all">{{i18n.withdraw5}}</text> -->
			</view>
			<view style="width: 100%;height: 2rpx;" class="line"></view>
			<!-- 最小提现 -->
		<!-- 	<view class="hint">
				{{i18n.withdraw8}}：<text>{{draw.draw_min}}USDT</text>
			</view> -->
		</view>
		<!-- *提现需扣除提现金额的1%作为手续费 -->
		<!-- 提示 -->
		<view class="hint_text text-tips">
			*转账需扣除转账金额的{{rate}}%作为手续费
		</view>
		<!-- 确认提现 -->
		<!-- <botBtnp :btnText="i18n.recharge14" style="margin-top: 174rpx;" @click.native="withdrawalBtn"></botBtnp> -->
		<botBtnp btnText="确认转账" style="margin-top: 174rpx;" @click="withdrawalBtn"></botBtnp>
		
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bid: null,
				phone: null,
				payStatus: {
					show: false
				},
				security: '',
				flag: false, //密码弹框 点击了立即支付后，变true
				status: false,
				draw: {},
				params:{
					draw_num:'',
					security:'',
					draw_type: 3
				},
				rate: 3
			};
		},
		onShow() {
			this.withdrawal()
		},
		onNavigationBarButtonTap() {
			this.record()
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			}
		},
		watch: {
			setSecurity(val) {
				// console.log(val);
				this.params.security = val
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					this.submit()
				}
			},
		},
		created() {
			
		},
		methods: {
			withdrawal() {
				this.$u.api.transfer_show().then(res => {
					if (res.code == 200) {
						// this.draw = res.data.draw
						this.rate = res.data.draw.transfer_fee_rate
						// console.log(this.draw);
					}
				}).catch(err => {

				})
			},
			submit(){
				this.$u.api.transfer_balance({
					phone: this.phone,
					num: this.bid,
					security:this.params.security,
				}).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.payStatus.show = false
						uni.navigateBack()
					}
				})
			},
			withdrawalBtn() { //确认转账
				// if (Number(this.bid)  > Number(this.draw.draw_max) ) {
				// 	this.$refs.uToast.show({
				// 		// 超出最大提现金额
				// 		title: this.i18n.withdraw7,
				// 		type: 'error',
				// 	})
				// 	return false
				// }else if (Number(this.bid) < Number(this.draw.draw_min)){
				// 	this.$refs.uToast.show({
				// 		// 低于最少金额
				// 		title: this.i18n.withdraw8+this.draw.draw_min,
				// 		type: 'error',
				// 	})
				// 	return false
				// }
				if (!this.phone){
					this.$refs.uToast.show({
						type: 'error',
						title: '请输入收款人手机号'
					})
					return false
				}
				if (!this.bid){
					this.$refs.uToast.show({
						type: 'error',
						title: '请输入转账金额'
					})
					return false
				}
				this.payStatus.show = true
			},
			// 提现记录
			record() {
				uni.navigateTo({
					url: '/pages/my/withdraw-record/transfer-record'
				})
			},
			// 充值取消
			cancel() {
				this.show = false
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				this.flag = true
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	// .page-black {
	// 	background-color: #1E2020;
	// 	min-height: 100vh;

	// 	.recharge_card {
	// 		background-color: #292B2B;

	// 		.recharge_name {
	// 			color: #FFFFFF !important;
	// 		}
	// 	}

	// 	.auction_card {
	// 		background-color: #292B2B;

	// 		.auction_title {
	// 			color: #FFFFFF;
	// 		}

	// 		.auction_price {
	// 			color: #FFFFFF;
	// 		}

	// 		.hint>text {
	// 			color: #FFFFFF;
	// 		}
	// 	}
	// }

	.recharge_card {
		height: 148rpx;
		display: flex;
		align-items: center;
		// background-color: #fff;
		border-radius: 20rpx;
		margin: 30rpx;
		padding: 0 30rpx;
		justify-content: space-between;

		.receive_left {
			display: flex;
			align-items: center;

			image {
				width: 58rpx;
			}

			.recharge_name {
				// color: #303030;
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 30rpx;
			}
		}

		.receive_right {
			// color: #666666;
			font-size: 26rpx;

			.uicon {
				margin-left: 16rpx;
			}
		}
	}

	.auction_card {
		// background-color: #fff;
		border-radius: 20rpx;
		margin: 30rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 48rpx 30rpx 46rpx;

		.auction_title {
			// color: #333333;
			font-size: 28rpx;

		}

		.auction_price {
			// color: #333333;
			font-size: 60rpx;
			font-weight: bold;
			display: flex;
			margin-top: 75rpx;
			align-items: baseline;
			margin-bottom: 20rpx;

			text {
				font-size: 38rpx;
			}

			input {
				font-size: 50rpx;
				text-indent: 24rpx;
			}
		}

		.hint {
			// color: #ABABAB;
			font-size: 27rpx;
			margin-top: 32rpx;

			text {
				// color: #303030;
			}
		}
	}

	/deep/.u-drawer-bottom {
		background-color: transparent;
	}

	.popup_item {
		// background-color: #fff;
		text-align: center;
		border-radius: 20rpx;
		margin: 20rpx 30rpx;

		view {
			height: 120rpx;
			line-height: 120rpx;
			font-size: 32rpx;
			// color: #333333;
			font-weight: bold;
		}
	}

	.cancel {
		// background-color: #fff;
		text-align: center;
		border-radius: 20rpx;
		margin: 20rpx 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		// color: #999999;
	}
	
	.hint_text {
		font-size: 24rpx;
		margin: 30rpx 32rpx;
	}
</style>