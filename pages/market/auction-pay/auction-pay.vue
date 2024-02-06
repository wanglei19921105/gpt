<template>
	<view class="page" :class="getThemeClass">
		<!-- 支付 -->
		<!-- <unavbar :title="i18n.paymargin1"></unavbar> -->
		<view class="auction_card card-bg">
			<view class="auction_title">
				<!-- 参与拍卖 -->
				{{i18n.paymargin2}}
			</view>
			<view class="auction_price">
				{{bail}}
				<text>USDT</text>
			</view>
			<!-- 提示 -->
			<view class="hint text-content">
				<!-- 您需先支付保证金，拍卖结束后退回您的账户 -->
				{{i18n.paymargin3}}
			</view>
		</view>
		<!-- 支付方式 -->
		<payWay @payway="selPay" :hasAward="false"></payWay>
		<!-- 立即支付 -->
		<botBtnp @click.native="pay" style="margin-top: 528rpx;" :btnText="i18n.castingbuy9"></botBtnp>
		<u-toast ref="uToast" />
		<pwdPay :stauts="payStatus" @closeMain="closeMain" @status="padpay"></pwdPay>
		
		<u-modal
			class="my-modal"
			v-model="isGoPay"
			title="支付提示"
			confirm-text="支付成功"
			:confirm-color="getMainColor"
			cancel-text="暂未支付"
			content="是否支付成功？"
			@confirm="paySuccess"
			@cancel="isGoPay = false"
			async-close
			show-cancel-button
		></u-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payway: 1, //支付方式
				bail: null, //保证金
				products_id: null, //作品id
				payStatus: {
					show: false
				},
				status: false,
				orderId: null, //订单id
				security: '', //余额支付密码
				auctionRecordID: null, //拍卖记录id
				pay_type: null,
				
				isGoPay: false,
			};
		},
		onLoad(option) {
			if (option.id) {
				this.products_id = option.id
			}
			this.bail = option.bail
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			}
		},
		watch: {
			setSecurity(val) {
				this.security = val
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					if(this.payway==3){
						this.balance_pay()
					}
					if(this.payway==4){
						this.awardPay()
					}
				}
			}
		},
		methods: {
			// 支付方式
			selPay(data) {
				this.payway = data.type
				this.pay_type = data.paytype
			},
			paySuccess(){
				this.isGoPay = false
				this.$refs.uToast.show({
					title: this.i18n.castingbuy10,
					type: 'success',
				})
				setTimeout(() => {
					uni.navigateTo({
						url:'../../my/my-auction/my-auction'
					})
				}, 1000)
			},
			pay() {
				this.$u.api.auction_order_add({
					'products_id': this.products_id,
					'pay_type': this.pay_type
				}).then(res => {
					if (res.code == 200) {
						this.orderId = res.data.order.id
						this.auctionRecordID = res.data.order.id
						
						if(this.payway == 1){
							this.wxPay(this.pay_type)
						}else if(this.payway == 2){
							this.aliPay(this.pay_type)
						}else if(this.payway == 3 || this.payway == 4){
							this.payStatus.show = true
						} else if(this.payway == 5){
							this.sdkjPay(this.pay_type)
						} else if(this.payway == 6){
							this.dlbPay(this.pay_type)
						} else if(this.payway == 7){
						  this.sandPay(this.pay_type)
						}
						
					}
				})
			},
			sandPay(type){
				this.$u.api.auction_pay_sandYun({
					'order_id': this.orderId,
				}).then(res => {
					// console.log(res.data);
					this.isGoPay = true
					if(res.data.result){
						let urlshand = encodeURIComponent(res.data.result)
						uni.navigateTo({
							url:'/pages/my/manage/embedded?urlshand=' + urlshand
						})
					}
					// this.$pay.otherH5Pay(res.data.result)
				})
			},
			wxPay(type) {
				this.$u.api
					.auction_pay_wechat({
						order_id: this.orderId,
						pay_type: type,
					})
					.then(res => {
						if (res.code == 200) {
							// #ifdef H5
							this.isGoPay = true
							// #endif
							this.$pay.wechatPay(res.data.result).then(
								res => {
									this.paySuccess();
								},
								err => {
									uni.showToast({
										title: '支付失败',
										icon: 'none'
									});
								}
							);
						}
					})
					.catch(err => {
						console.log(err);
						this.gowaitpay()
					});
			},
			aliPay(type) {
				this.$u.api
					.auction_pay_ali({
						order_id: this.orderId,
						pay_type: type
					})
					.then(res => {
						if (res.code == 200) {
							// #ifdef H5
							this.isGoPay = true
							// #endif
							this.$pay.alipayPay(res.data.result).then(
								res => {
									this.paySuccess();
								},
								err => {
									uni.showToast({
										title: '支付失败',
										icon: 'none'
									});
								}
							);
						}
					})
					.catch(err => {
						console.log(err);
						this.gowaitpay()
					});
			},
			sdkjPay(type){
				this.$u.api.auction_pay_sand({
					'order_id': this.orderId,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			dlbPay(type){
				this.$u.api.auction_pay_dlb({
					'order_id': this.orderId,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			balance_pay() {
				let that = this
				that.$u.api.auction_balance_pay({
					'order_id': that.orderId,
					'security': that.security
				}).then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}
				})
			},
			awardPay(){
				// this.$u.api.auction_balance_pay({
				// 	'order_id': this.orderId,
				// 	'security': this.security
				// }).then(res => {
				// 	if (res.code == 200) {
				// 		this.paySuccess()
				// 	}
				// })
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	background-color: #F9F9F9;
	// 	min-height: 100vh;
	// }

	// page {
	// 	height: 100%;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.auction_card {
	// 		background-color: #292B2B;

	// 		.auction_title,
	// 		.auction_price {
	// 			color: #FFFFFF;
	// 		}
	// 	}
	// }
	.page {
		padding: 30rpx 0rpx;
	}

	.auction_card {
		// background-color: #fff;
		border-radius: 20rpx;
		height: 304rpx;
		margin: 0rpx 30rpx;
		text-align: center;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.auction_title {
			// color: #333333;
			font-size: 28rpx;
		}

		.auction_price {
			// color: #333333;
			font-size: 60rpx;
			font-weight: bold;
			display: block;

			text {
				font-size: 38rpx;
			}
		}

		.hint {
			// color: #A9A9A9;
			font-size: 26rpx;
		}
	}
</style>
