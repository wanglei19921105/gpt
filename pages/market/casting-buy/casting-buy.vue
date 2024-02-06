<template>
	<view class="page u-p-t-30" :class="getThemeClass">
		<!-- <unavbar title="订单详情"></unavbar> -->
		<view class="head card-bg">
			<image :src="product_cast.cover" mode="widthFix"></image>
			<view class="head_title">
				<!-- NFT盲盒名称 -->
				{{ product_cast.title }}
			</view>
			<view class="author">
				<view class="author_text text-content">
					<!-- 作者 -->
					{{ i18n.castingbuy8 }}
				</view>
				<view class="author_gight">
					<view class="avatar_img"><image :src="authors.avatar" mode="widthFix"></image></view>
					<view class="author_name">{{ authors.nickname }}</view>
				</view>
			</view>
		</view>
		<!-- 认证信息 -->
		<view class="certification card-bg">
			<!-- <view class="info_item border-color">
				<view class="item_name text-call">合约地址</view>
				<view class="item_value">
					<view class="item_valuetext">{{ product_pre.contract_address }}</view>
					<image class="copy_img" @click="copy(product_pre.contract_address)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view> -->
			<view class="info_item border-color">
				<view class="item_name text-call">合约地址</view>
				<view class="item_value">
					<view class="item_valuetext">{{ $myAppConfig.NFTAddress }}</view>
					<image class="copy_img" @click="copy($myAppConfig.NFTAddress)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="info_item border-color">
				<!-- 认证标识 -->
				<view class="item_name text-call">{{ i18n.castingbuy2 }}</view>
				<view class="item_value">
					<view class="item_valuetext color-main">{{ product_pre.mint_tx }}</view>
					<image class="copy_img" @click="copy(product_pre.mint_tx)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<orderInfo :infoData="pay"></orderInfo>
		<!-- 支付方式 -->
		<payWay @payway="payType"></payWay>
		<!-- 立即支付 -->
		<botBtnp class="bot_btn" :btnText="i18n.castingbuy9" :go="go" @click.native="payBtn"></botBtnp>
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
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			go: null,
			id: '', //商品(作品)ID
			orderData: {}, //订单详情数据
			product_cast: {}, //作品信息
			product_pre:{},
			authors: {}, //作者信息
			pay: {}, //费用信息
			paytype: 1, //支付方式1微信2支付宝3余额
			payStatus: {
				show: false
			},
			security: '',
			status: false,
			product_id: null, //订单id
			payway:1,
			pay_type: null, //订单支付下单方式1微信app2微信H53微信公众号4支付宝app5支付宝H56余额支付
			flag: false, //密码弹框 点击了立即支付后，变true
			orderId: false ,//订单ID
			
			isGoPay: false,
		};
	},
	onLoad(option) {
		// 1.NFT开盲盒
		// 2.NFT商品详情-已售罄
		this.go = option.go;
		// this.getTime();
		if (option.id) {
			this.id = option.id;
			this.orderPro();
		}
	},
	onShow() {
		// this.back()
	},
	computed: {
		setSecurity() {
			return this.$store.state.security;
		}
	},
	watch: {
		setSecurity(val) {
			this.security = val;
		},
		// 密码弹框点击'立即支付'后
		status(val) {
			if (val) {
				if(this.payway==3){
					this.balancePay()
				}
				if(this.payway==4){
					this.awardPay()
				}
			}
		}
	},
	methods: {
		gowaitpay(){
			setTimeout(()=>{
				uni.redirectTo({
					url:"/pages/my/pending-payment/pending-payment"
				})
			},1500)
		},
		back() {
			//获取订单详情，如果没有id或id不合法，则返回上上层
			this.$u.api
				.order_pro_list({
					product_id: this.id
				})
				.then(res => {})
				.catch(err => {
					uni.navigateBack({
						delta: 2
					});
				});
		},
		// 监听弹窗打开状态
		closeMain(val) {
			if (!val) {
				//关闭支付弹窗，当前商品移入到我买到的-未支付页面
				let that = this;
				if (!that.flag) {
					uni.navigateBack({
						delta: 2
					});
				}
			}
			this.payStatus.show = val;
		},
		getTime() {
			//获取创建时间
			let da = Date.now();
			da = new Date(da);
			var year = da.getFullYear();
			var month = da.getMonth() + 1;
			var date = da.getDate();
			var hours = da.getHours();
			var minutes = da.getMinutes();
			var seconds = da.getSeconds();
			this.pay.time = [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':');
		},
		orderPro() {
			this.$u.api
				.order_pro_list({
					product_id: this.id
				})
				.then(res => {
					if (res.code == 200) {
						this.product_cast = res.data.product_cast;
						this.product_pre = res.data.product_pre;
						this.authors = res.data.authors;
						this.product_id = res.data.pay.product_id;
						this.pay = res.data.pay
						// this.pay.plat_free = res.data.pay.plat_free;
						// this.pay.price = res.data.pay.price;
						// this.pay.copyright = res.data.pay.copyright;
					}
				})
				.catch(err => {});
		},
		payType(data) {
			//支付方式1微信2支付宝3余额
			this.payway = data.type
			this.pay_type = data.paytype
		},
		paySuccess(){
			this.isGoPay = false
			this.$refs.uToast.show({
				title: this.i18n.castingbuy10,
				type: 'success',
				duration: 1000,
				callback: () => {
					uni.navigateBack()
				}	
			})
		},
		// 立即支付
		payBtn() {
			this.$u.api.sale_order_add({
				product_id: this.product_id,
				pay_type: this.pay_type
			}).then(res => {
				if (res.code == 200) {
					this.orderId = res.data.order.id;
					
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
		auction() {
			//余额支付下单
			let that = this;
			that.$u.api
				.sale_order_add({
					product_id: that.product_id,
					pay_type: that.pay_type
				})
				.then(res => {
					if (res.code == 200) {
						that.orderId = res.data.order.id;
						that.balancePay();
					}
				})
				.catch(err => {});
		},
		awardPay(){
			this.$u.api.shop_air_pay({
				'order_id': this.orderId,
				'security': this.security
			}).then(res => {
				if (res.code == 200) {
					this.paySuccess()
				}else{
						this.gowaitpay()
					}
			})
		},
		balancePay() {
			//余额支付
			this.$u.api
				.balance_pay({
					order_id: this.orderId,
					security: this.security
				})
				.then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}else{
						this.gowaitpay()
					}
				})
		},
		// 密码弹窗点击立即支付后
		padpay(i) {
			this.flag = true;
			if (i) {
				this.status = true;
			} else {
				this.status = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>

.head {
	margin: 0rpx 30rpx 20rpx 30rpx;
	border-radius: 30rpx;

	image {
		width: 100%;
	}

	.head_title {
		height: 120rpx;
		line-height: 120rpx;
		text-indent: 32rpx;
		font-weight: bold;
		font-size: 32rpx;
	}

	.author {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 34rpx;

		.author_text {
			font-size: 26rpx;
		}

		.author_gight {
			display: flex;
			align-items: center;

			.avatar_img {
				border-radius: 50%;
				width: 48rpx;
				height: 48rpx;
				overflow: hidden;
			}

			image {
				width: 100%;
			}

			.author_name {
				margin-left: 24rpx;
			}
		}
	}
}

.bot_btn {
	margin: 92rpx 0 80rpx;
}

.certification {
	margin: 24rpx 30rpx;
	border-radius: 20rpx;
	padding: 0 30rpx;

	.info_item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item_name {
			font-size: 27rpx;
			width: 280rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.item_value {
			display: flex;
			align-items: center;
			font-size: 29rpx;
			justify-content: flex-end;
		}

		.item_valuetext {
			width: 300rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: right;
		}

		.copy_img {
			width: 22rpx;
			margin-left: 20rpx;
		}
	}

	.info_item + .info_item {
		border-top: 1px solid;
	}
}
</style>
