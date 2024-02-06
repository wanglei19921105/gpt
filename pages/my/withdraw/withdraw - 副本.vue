<template>
	<view class="page" :class="getThemeClass">
		<!-- 余额充值 -->
		<unavbar :title="i18n.withdraw1" v-if="false">
			<template #barRight>
				<!-- 提现记录 -->
				<view @click="record">{{i18n.withdraw2}}</view>
			</template>
		</unavbar>
		<!-- 充值方式 -->
		<view class="recharge_card card-bg" @click="popup_show">
			<view class="receive_left" v-if="params.draw_type==1">
				<image
					src="../../../static/images/weChatRecharge.png"
					mode="widthFix"></image>
				<view class="recharge_name">微信</view>
			</view>
			<view class="receive_left" v-if="params.draw_type==2">
				<image
					src="../../../static/images/alipayTopUp.png"
					mode="widthFix"></image>
				<view class="recharge_name">支付宝</view>
			</view>
			<view class="receive_left" v-if="params.draw_type==3">
				<image
					src="../../../static/images/bank.png"
					mode="widthFix"></image>
				<view class="recharge_name">银行卡</view>
			</view>
			<!-- 到账方式 @click="popup_show" -->
			<view class="receive_right text-tips">
				{{i18n.withdraw3}}
				<u-icon class="uicon" color="#C9C9C9" name="arrow-right"></u-icon>
			</view>
		</view>

		<view class="auction_card card-bg">
			<!--  提现金额 -->
			<view class="auction_title">
				{{i18n.withdraw4}}
			</view>
			<view class="auction_price">
				<text class="withinp">USDT</text>
				<!-- 请输入提现金额 -->
				<input type="text" class="withinp" v-model="params.draw_num" :placeholder="i18n.withdraw9"
					placeholder-style="font-weight:500;color:#C9C9C9;" />
					<!-- 全部 -->
				<view style="font-size: 24rpx; flex-shrink: 0; align-self: center;" @click="params.draw_num = balance">全部提现</view>
			</view>
			<view style="width: 100%;height: 2rpx;" class="line"></view>
			<!-- 最小提现 -->
			<!-- <view class="u-flex align-center justify-between u-m-t-30"></view> -->
			<view class="hint text-tips u-m-t-30">
				{{i18n.withdraw8}}：<text>USDT{{draw.draw_min}}</text>
			</view>
			
			<view class="hint text-tips u-m-t-10">
				最大提现：<text>USDT{{draw.draw_max}}</text>
			</view>
			
			<view class="hint text-tips u-m-t-10">
				<text>钱包余额：{{ balance }}</text>
			</view>
		</view>
		<!-- *提现需扣除提现金额的1%作为手续费 -->
		<!-- 提示 -->
		<view class="hint_text text-tips">
			*提现需扣除提现金额的{{rate}}%作为手续费
		</view>
		<!-- 确认提现 -->
		<botBtnp :btnText="i18n.recharge14" style="margin-top: 174rpx;" @click.native="withdrawalBtn"></botBtnp>

		<u-popup v-model="show" mode="bottom" border-radius="14">
			<view class="popup_item card-bg">
				<view v-for="(item,index) in manner" :key="index" @click="rechargeCli(item.id)">{{item.name}}</view>
			</view>
			<view class="cancel card-bg text-content" @click="cancel()">
				{{i18n.recharge9}}
			</view>
		</u-popup>
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bid: null,
				show: false,
				manner: [{
						id: 1,
						name: '微信'
					},
					{
						id: 2,
						name: '支付宝'
					},
					{
						id: 3,
						name: '银行卡'
					}
				],
				payStatus: {
					show: false
				},
				security: '',
				flag: false, //密码弹框 点击了立即支付后，变true
				status: false,
				// 提现方式
				rechargeMethod: '',
				draw: {},
				params:{
					draw_num: '',
					security: '',
					draw_type: 1
				},
				rate: 1,
				balance: '0.00',
			};
		},
		onShow() {
			this.withdrawal()
		},
		onLoad() {
			
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
		methods: {
			withdrawal() {
				this.$u.api.wallet_show().then(res => {
					if (res.code == 200) {
						this.draw = res.data.draw
						this.rate = res.data.draw.draw_rate
						this.balance = res.data.balance
						// console.log(this.draw);
					}
				}).catch(err => {

				})
			},
			submit(){
				this.$u.api.draw_make({
					draw_num: this.params.draw_num,
					draw_type: this.params.draw_type,
					security:this.params.security,
				}).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.psdshow = false
						uni.navigateBack()
					}else if(res.message=='请先实名认证'){
						setTimeout(()=>{
							uni.navigateTo({
								url:"../verified/verified"
							})
						},1500)
					}
				})
			},
			withdrawalBtn() { //确认提现
				if (Number(this.params.draw_num)  > Number(this.draw.draw_max) ) {
					this.$refs.uToast.show({
						// 超出最大提现金额
						title: this.i18n.withdraw7,
						type: 'error',
					})
					return false
				}else if (Number(this.params.draw_num) < Number(this.draw.draw_min)){
					this.$refs.uToast.show({
						// 低于最少金额
						title: this.i18n.withdraw8+this.draw.draw_min,
						type: 'error',
					})
					return false
				}
				this.payStatus.show = true
			},
			// 提现记录
			record() {
				uni.navigateTo({
					url: '../withdraw-record/withdraw-record'
				})
			},
			// 充值方式弹窗
			popup_show() {
				if (this.show) {
					this.show = false
				} else {
					this.show = true
				}
			},
			// 充值取消
			cancel() {
				this.show = false
			},
			// 充值方式
			rechargeCli(id) {
				this.params.draw_type = id
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
	.page {
		padding-top: 30rpx;
	}
	.recharge_card {
		height: 148rpx;
		display: flex;
		align-items: center;
		// background-color: #fff;
		border-radius: 20rpx;
		margin: 0rpx 30rpx 30rpx;
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
			// margin-top: 32rpx;

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