<template>
	<view class="page" :class="getThemeClass">
		<!-- 竞拍支付 -->
		<!-- <unavbar :title="i18n.bidpay1"></unavbar> -->
		<view class="head_hint">
			<!-- 您将竞价 -->
			{{ i18n.bidpay2 }}
			<text>{{product_pre.author_nickname}}</text>
			的
			<text>{{product_pre.products_title}}</text>
		</view> 

		<view class="head_box card-bg">
			<image :src="product_pre.products_cover" mode="widthFix"></image>
			<view class="head_content">
				<view class="head_name">
					<!-- NFT铸品名称 -->
					{{ product_pre.products_title }}
				</view>
				<view class="head_introduction">
					<!-- 作品简介 -->
					<u-parse :html="desc" @imgtap="e => e.ignore()"></u-parse>
				</view>
			</view>
		</view>

		<view class="auction_card card-bg">
			<view class="auction_title">
				您的出价
			</view>
			<view class="auction_price">
				<text>USDT</text>
				<input type="text" :disabled="true" v-model="price" />
			</view>
			<view style="width: 100%;height: 2rpx;" class="line"></view>
			<view class="auction_flex">
				<view class="text-content">版权费</view>
				<view>{{ product_pre.copyright_tax }}%</view>
			</view>
			<view class="auction_flex">
				<view class="text-content">手续费</view>
				<view>{{ plat_free }}%</view>
			</view>
		</view>
		<!-- 支付方式 -->
		<payWay @payway="selPay"></payWay>
		<!-- 出价 -->
		<botBtnp @click="pay" style="margin: 100rpx 0 0rpx;" btnText="确定支付"></botBtnp>
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
			id: '',
			desc: '',
			plat_free: '',
			price: '',
			product_pre: {},
			payway: 1,
			pay_type: null,
			payData: {
				show: false
				// url: 3
			},
			security: '',
			orderId:'',
			status: false,
			
			isGoPay: false,
		};
	},
	onLoad(data) {
		this.id = data.id;
		this.loadData();
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
		loadData() {
			this.$u.api.my_auction_pay_show({ id: this.id }).then(res => {
				// console.log(res.data);
				if (res.code == 200) {
					this.desc = res.data.desc;
					this.plat_free = res.data.plat_free;
					this.price = res.data.price;
					this.product_pre = res.data.product_pre;
					// console.log(res.data);
				} 
				if(res.code == 400){
					setTimeout(() => {
						uni.navigateBack()
					}, 1500);
				}
			});
		},
		selPay(data) {
			this.payway = data.type;
			this.pay_type = data.paytype;
		},
		auction() { //余额支付
			this.$u.api.balance_pay({
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
			this.$u.api
				.auction_product_order_add({
					id: this.id,
					pay_type: this.pay_type
				})
				.then(res => {
					if (res.code == 200) {
						this.orderId = res.data.order.id;
						
						if(this.payway == 1){
							this.wxPay(this.pay_type)
						}else if(this.payway == 2){
							this.aliPay(this.pay_type)
						}else if(this.payway == 3 || this.payway == 4){
							this.payData.show = true;
						} else if(this.payway == 5){
							this.sdkjPay(this.pay_type)
						} else if(this.payway == 6){
							this.dlbPay(this.pay_type)
						} else if(this.payway == 7){
							this.sandPay(this.pay_type)
						}
						
					}
				});
		},
		sandPay(type){
			this.$u.api.pre_pay_sandYun({
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
				.pre_pay_wechat({
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
				.pre_pay_ali({
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
			this.$u.api.pre_pay_sand({
				'order_id': this.orderId,
				'pay_type': type
			}).then(res => {
				this.isGoPay = true
				this.$pay.otherH5Pay(res.data.result)
			})
		},
		dlbPay(type){
			this.$u.api.pre_pay_dlb({
				'order_id': this.orderId,
				'pay_type': type
			}).then(res => {
				this.isGoPay = true
				this.$pay.otherH5Pay(res.data.result)
			})
		},
		paySuccess() {
			this.isGoPay = false
			this.$refs.uToast.show({
				title: this.i18n.castingbuy10,
				type: 'success'
			});
			setTimeout(() => {
				uni.redirectTo({
					url:'/pages/my/collections/collections'
				});
			}, 1000);
		},
		padpay(i) {
			if (i) {
				this.status = true;
			} else {
				this.status = false;
			}
		},
		popupPay() {
			this.payData.show = false;
		},
		popupClose(val) {
			this.payData.show = val;
		}
	}
};
</script>

<style lang="scss" scoped>
// .box {
// 	background-color: #f9f9f9;
// 	min-height: 100vh;
// 	height: 100%;
// 	padding-bottom: 100rpx;
// }

// .page-black {
// 	background-color: #111926 !important;

// 	.head_hint {
// 		color: #ffffff;
// 	}
// 	.head_box {
// 		background-color: #1E1E1E;
// 		.head_name {
// 			color: #ffffff !important;
// 		}
// 	}

// 	.auction_card {
// 		background-color: #1E1E1E;

// 		.auction_title,
// 		.auction_price {
// 			color: #ffffff;
// 		}

// 		.hint > text {
// 			color: #ffffff;
// 		}

// 		.auction_flex {
// 			color: #ffffff;

// 			view:nth-child(1) {
// 				color: #666666;
// 			}
// 		}
// 	}
// }
.head_box {
	margin: 0 30rpx;
	// background-color: #ffffff;
	border-radius: 30rpx;
	overflow: hidden;

	image {
		width: 100%;
	}
	.head_content {
		margin: 40rpx 30rpx;
		.head_name {
			// color: #111111;
			font-size: 32rpx;
			font-weight: bold;
		}
		.head_introduction {
			// color: #666666;
			font-size: 26rpx;
			margin-top: 38rpx;
			line-height: 1.8;
		}
	}
}

.auction_card {
	// background-color: #fff;
	border-radius: 20rpx;
	// height: 474rpx;
	margin: 30rpx;
	// text-align: center;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	// justify-content: space-evenly;
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
			font-size: 60rpx;
		}
	}

	.hint {
		// color: #ababab;
		font-size: 27rpx;
		margin-top: 32rpx;

		text {
			color: #303030;
		}
	}
}

.head_hint {
	font-size: 30rpx;
	text-align: center;
	margin: 66rpx 30rpx;

	text {
		font-weight: bold;
		margin: 0 20rpx;
	}
}

.auction_flex {
	display: flex;
	margin-top: 38rpx;
	justify-content: space-between;
}
</style>
