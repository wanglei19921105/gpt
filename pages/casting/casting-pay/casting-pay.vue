<template>
	<view class="page" :class="getThemeClass">
		<!-- NFT铸造支付 -->
		<!-- <unavbar :title="i18n.castingpay1"></unavbar> -->
		<view class="head card-bg">
			<image :src="orderData.cover" mode="widthFix"></image>
			<!-- NFT铸品名称 -->
			<view class="head_title">
				{{orderData.title}}
			</view>
			<view class="author">
				<!-- 作品简介 -->
				<view class="author_text">
					{{orderData.desc}}
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order_info card-bg">
			<view class="info_item border-color">
				<!-- 版权费 -->
				<view class="text-call">{{i18n.payauction6}}</view>
				<view>{{orderData.copyright_tax}}USDT</view>
			</view>
			<view class="info_item border-color">
				<!-- 创建时间 -->
				<view class="text-call">{{i18n.castingbuy6}}</view>
				<view>{{orderData.created_at}}</view>
			</view>
			<view class="info_item border-color">
				<!-- NFT 铸造总金额 -->
				<view class="text-call">NFT {{i18n.castingpay2}}</view>
				<view class="text_red color-red">{{orderData.price}}USDT</view>
			</view>
		</view>
		<!-- 备注 -->
		<view class="remark text-content">
			<!-- 备注：NFT铸造总费用包括NFT铸造、区块链交易费等 -->
			{{i18n.castingpay3}}
		</view>
		<!-- 支付方式 -->
		<payWay @payway="selPay"></payWay>
		<!-- 立即支付 -->
		<botBtnp class="bot_btn" :btnText="i18n.castingbuy9" @click.native="pay"></botBtnp>
		<!-- 输入安全密码弹窗 -->
		<pwdPay :stauts="payData" @closeMain="popupClose" @status="padpay"></pwdPay>
		
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
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				payData: {
					show: false,
					// url: 3
				},
				id: null, //铸造订单id
				orderId: null, //支付订单id
				orderData: {}, //铸造预览
				status: false,
				security: '',
				
				payway: 1,
				pay_type: null, //支付方式1微信app2微信H53微信公众号4支付宝app5支付宝H56余额支付
				
				isGoPay: false,
			};
		},
		onLoad(option) {
			// 1.NFT开盲盒
			// 2.NFT商品详情-已售罄
			this.payData.show = Boolean(option.show)
			if (option.id) {
				this.id = option.id
				this.orderShow()
			}
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
						this.auction()
					}
					if(this.payway==4){
						this.awardPay()
					}
				}
			}
		},
		methods: {
			orderShow() { //铸造支付预览
				this.$u.api.order_show({
					'cast_id': this.id
				}).then(res => {
					if (res.code == 200) {
						this.orderData = res.data.product_cast
					}
				}).catch(err => {
					this.payData.show = false
				})
			},
			auction() { //余额支付
				this.$u.api.cast_balance_pay({
					'order_id': this.orderId,
					'security': this.security
				}).then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}
				})
			},
			awardPay(){
				this.$u.api.air_pay({
					'order_id': this.orderId,
					'security': this.security
				}).then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}
				})
			},
			pay() {
				this.$u.api.order_add({
					'cast_id': this.id,
					'pay_type': this.pay_type
				}).then(res => {
					if (res.code == 200) {
						this.orderId = res.data.order.id
						
						if(this.payway == 1){
							this.wxPay(this.pay_type)
						}else if(this.payway == 2){
							this.aliPay(this.pay_type)
						}else if(this.payway == 3 || this.payway == 4){
							this.payData.show = true
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
				this.$u.api.cast_pay_sandYun({
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
					.cast_pay_wechat({
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
					.cast_pay_ali({
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
				this.$u.api.cast_pay_sand({
					'order_id': this.orderId,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			dlbPay(type){
				this.$u.api.cast_pay_dlb({
					'order_id': this.orderId,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			paySuccess(){
				this.isGoPay = false
				this.$refs.uToast.show({
					title: this.i18n.castingbuy10,
					type: 'success',
				})
				setTimeout(() => {
					uni.switchTab({
						url:"/pages/tabbar/foundry/foundry"
					})
				}, 1000)
			},
			// 支付方式
			selPay(data) {
				this.payway = data.type
				this.pay_type = data.paytype
			},
			// 监听密码弹窗关闭
			popupClose(val) {
				this.payData.show = val
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
			// 安全密码支付成功
			popupPay() {
				this.payData.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	background-color: #F9F9F9;
	// 	height: 100%;
	// 	min-height: 100vh;
	// 	padding-bottom: 50rpx;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.head {
	// 		background-color: #292B2B;

	// 		.head_title {
	// 			color: #FFFFFF;
	// 		}

	// 		.author_text {
	// 			color: #AAAAAA !important;
	// 		}
	// 	}

	// 	.order_info {
	// 		background-color: #292B2B;
	// 	}

	// 	.info_item+.info_item {
	// 		border-top: 1px solid #363737 !important;
	// 	}

	// 	.info_item>view:nth-child(2) {
	// 		color: #FFFFFF;
	// 	}

	// 	.text_red {
	// 		color: #F7924C !important;
	// 	}
	// }
	.page{
		padding-top: 30rpx;
	}
	.head {
		margin: 0rpx 30rpx 20rpx 30rpx;
		// background-color: #fff;
		border-radius: 30rpx;

		image {
			width: 100%;
		}

		.head_title {
			height: 120rpx;
			line-height: 120rpx;
			text-indent: 32rpx;
			font-weight: bold;
			// color: #111111;
			font-size: 32rpx;
		}

		.author {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 34rpx;

			.author_text {
				// color: #666666;
				font-size: 26rpx;
			}
		}
	}

	.bot_btn {
		margin: 92rpx 0 80rpx;
	}

	.order_info {
		margin: 20rpx 30rpx;
		// background-color: #fff;
		border-radius: 14rpx;

		.info_item {
			display: flex;
			height: 100rpx;
			justify-content: space-between;
			align-items: center;
			margin: 0 30rpx;
			font-size: 28rpx;
			border-top: 1rpx solid;
			&:first-child {
				border-top: none;
			}

			view:nth-child(1) {
				color: #999999;
			}

			.text_red {
				// color: red;
				font-weight: bold;
			}
		}

		.info_item+.info_item {
			border-top: 1px solid #F0F0F0;
		}
	}

	.remark {
		margin: 30rpx 60rpx;
		font-size: 24rpx;
		// color: #999999;
	}
</style>
