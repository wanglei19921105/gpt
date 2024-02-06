<template>
	<view class="page" :class="getThemeClass">
		<!-- 余额充值 -->
		<!-- <unavbar title="积分充值"></unavbar> -->
		<!-- 充值方式 -->
		<view class="recharge_card card-bg">
				<!-- ==微信? -->
			<view class="receive_left">
				<image
					src="/static/images/bank.png"
					mode="widthFix"></image>
				<view class="recharge_name">{{rechargeMethod}}</view>
			</view>
			<!-- 充值方式 -->
			<view class="receive_right"><!-- @click="popup_show" -->
				{{i18n.recharge4}}
				<!-- <u-icon class="uicon" color="#C9C9C9" name="arrow-right"></u-icon> -->
			</view>
		</view>

		<view class="auction_card card-bg">
			<!-- 充值金额 -->
			<view class="auction_title">
				{{i18n.recharge5}}
			</view>
			<view class="auction_price">
				<text>USDT</text>
				<!-- 请输入充值金额 -->
				<input type="number" v-model="bid" :placeholder="i18n.recharge6"
					placeholder-style="font-weight:500;color:#C9C9C9;" />
			</view>
			<view style="width: 100%;height: 2rpx;" class="line"></view>
			<!-- 最小充值 -->
			<view class="hint text-tips">
				钱包余额：<text class="text-main">{{wallet.balance}}USDT</text>
			</view>
		</view>

		<!-- 确认充值 -->
		<botBtnp :btnText="i18n.recharge8" style="margin-top: 240rpx;" @click="rechargeBtn"></botBtnp>
		
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bid: null,
				// 充值方式
				rechargeMethod: '钱包余额',
				wallet: {
					balance: '0.00'
				},
				payStatus: {
					show: false
				},
				flag: false, //密码弹框 点击了立即支付后，变true
				status: false,
				security: '',
			};
		},
		onShow() {
			this.walletShow()
		},
		methods: {
			submit(){
				this.$u.api.balance_transfer({
					transfer_num: this.bid,
					security: this.security,
				}).then(res => {
					// console.log(res);
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 充值不能小于  USDT
							title: '充值成功',
							type: 'success',
							duration: 1000,
							callback: () => uni.navigateBack() 
						})
					}
				})
			},
			walletShow() {
				this.$u.api.wallet_index().then(res => {
					if (res.code == 200) {
						// console.log(res);
						this.wallet = res.data.wallet
					}
				}).catch(err => {

				})
			},
			rechargeBtn() { //确认充值按钮
				let that = this
				if (!this.bid) {
					this.$refs.uToast.show({
						// 充值不能小于  USDT
						title: '请输入金额',
						type: 'error',
					})
					return false
				}
				this.payStatus.show = true
			},
			padpay(i) {
				this.flag = true
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			}
		},
		watch: {
			status(val) {
				if (val) {
					this.submit()
				}
			},
			setSecurity(val) {
				// console.log(val);
				this.security = val
			},
		},
	}
</script>

<style lang="scss" scoped>
	
	.page {
		padding-top: 30rpx;
	}

	.recharge_card {
		height: 148rpx;
		display: flex;
		align-items: center;
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
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 30rpx;
			}
		}

		.receive_right {
			font-size: 26rpx;

			.uicon {
				margin-left: 16rpx;
			}
		}
	}

	.auction_card {
		border-radius: 20rpx;
		margin: 30rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 48rpx 30rpx 46rpx;

		.auction_title {
			font-size: 28rpx;

		}

		.auction_price {
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
			font-size: 27rpx;
			margin-top: 32rpx;
		}
	}
</style>
