<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar title="订单详情"></unavbar> -->
		<view class="head card-bg">
			<image :src="product_cast.cover" mode="widthFix"></image>
			<view class="head_title">
				<!-- NFT盲盒名称 -->
				{{ product_cast.title }}
			</view>
			<view class="author">
				<view class="author_text">
					<!-- 作者 -->
					{{ i18n.castingbuy8 }}
				</view>
				<view class="author_gight">
					<view class="avatar_img"><image :src="authors.avatar" mode="widthFix"></image></view>
					<view class="author_name">{{ authors.nickname }}</view>
				</view>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="u-p-l-30 u-p-r-30" v-if="product_cast.has_goods==1">
			<view class="main-card flex justify-between align-center" @click="$u.route('/pages/my/address/address')">
				<view class="" v-if="address">
					<view class="flex align-center">
						<u-tag class="u-m-r-20" text="默认" mode="dark" type="primary" size="mini" v-if="address.isDefault" />
						<text class="u-font-30">{{address.name}}</text>
						<text class="u-m-l-20 u-font-30">{{address.mobile}}</text>
					</view>
					<view class="u-font-28 text-content u-m-t-30">{{address.region}}{{address.regionCode}}</view>
				</view>
				<view class="u-font-30 flex align-center" v-else>
					<u-icon name="map"></u-icon>
					<view class="u-m-l-10">请选择收货地址</view>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<!-- 认证信息 -->
		<view class="certification card-bg" v-if="product_cast.contract_address">
			<view class="info_item">
				<!-- 合约地址 -->
				<view class="item_name">{{ i18n.castingbuy1 }}</view>
				<view class="item_value text-content">
					<view class="item_valuetext">{{ product_cast.contract_address }}</view>
					<image class="copy_img" @click="copy(product_cast.contract_address)" src="/static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			
		</view>
		<!-- 订单信息 -->
		<orderInfo :infoData="pay" :one="usable_max_num" @change="numchange"></orderInfo>
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
import { wechatWebPay } from '@/utils/pay.js';
export default {
	data() {
		return {
			go: null,
			id: '', //商品(作品)ID
			orderData: {}, //订单详情数据
			product_cast: {}, //作品信息
			authors: {}, //作者信息
			pay: {}, //费用信息
			paytype: 1, //支付方式1微信2支付宝3余额
			payStatus: {
				show: false
			},
			security: '',
			status: false,
			product_id: null, //订单id
			pay_type: null, //订单支付下单方式1微信app2微信H53微信公众号4支付宝app5支付宝H56余额支付
			flag: false, //密码弹框 点击了立即支付后，变true
			orderId: false, //订单ID
			
			num:1,
			new_type:0,
			power_id:0,
			usable_max_num:1,
			
			address: null,
			
			isGoPay: false,
		};
	},
	onLoad(option) {
		// 1.NFT开盲盒
		// 2.NFT商品详情-已售罄
		this.go = option.go;
		// this.getTime();
		this.id = option.id;
		this.power_id = option.power_id||0
		this.orderPro();
	},
	onShow() {
		// this.back()
		let address = getApp().globalData.address
		console.log(address);
		if(address)this.address = address
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
		numchange(e){
			this.num = e
		},
		back() {
			//获取订单详情，如果没有id或id不合法，则返回上上层
			this.$u.api
				.one_order_pro_list({
					cast_id: this.id,
					power_id: this.power_id
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
				.mortgage_order({
					cast_id: this.id
				})
				.then(res => {
					if (res.code == 200) {
						this.address = res.data.address
						this.usable_max_num = res.data.usable_max_num
						this.product_cast = res.data.product_cast;
						this.authors = res.data.authors;
						this.product_id = res.data.pay.cast_id;
						this.pay = res.data.pay
						this.new_type = res.data.product_cast.new_type
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
			// setTimeout(() => {
			// 	// uni.reLaunch({
			// 	// 	url:"../../tabbar/bazaar/bazaar-yxg"
			// 	// })
			// }, 1000)
		},
		// 立即支付
		payBtn() {
			let data = {
				cast_id: this.product_id,
				pay_type: this.pay_type,
				num:this.num,
				power_id: this.power_id
			}
			if(this.product_cast.has_goods==1){
				if(!this.address)return this.$refs.uToast.show({title: "请选择收货地址",type: 'error'})
				data['address_id'] = this.address.id
			}
			this.$u.api.mortgage_orderAdd(data).then(res => {
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
					}
					
				}
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
				.one_sale_order_add({
					cast_id: that.id,
					num: that.num,
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
			this.$u.api.shop_one_air_pay({
				'order_id': this.orderId,
				'security': this.security,
				num:this.num,
				power_id: this.power_id
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
				.one_balance_pay({
					order_id: this.orderId,
					security: this.security,
					num:this.num,
					power_id: this.power_id
				})
				.then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}else{
								this.gowaitpay()
							}
				})
				.catch(err => {});
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

.page-black {

	.head {
		// background-color: #292b2b;

		.head_title {
			// color: #ffffff;
		}

		.author_text {
			// color: #999999 !important;
		}

		.author_name {
			// color: #ffffff !important;
		}
	}

	.certification {
		// background-color: #292b2b;
	}

	.info_item + .info_item {
		// border-top: 1px solid #363737 !important;
	}

	.item_valuetext {
		// color: #ffffff;
	}
}

.head {
	margin: 30rpx 30rpx 20rpx 30rpx;
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
				// color: #111111;
				margin-left: 24rpx;
			}
		}
	}
}

.bot_btn {
	margin: 92rpx 0 80rpx;
}

.certification {
	// background-color: #fff;
	margin: 24rpx 30rpx;
	border-radius: 20rpx;
	padding: 0 30rpx;

	.info_item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item_name {
			// color: #999999;
			font-size: 27rpx;
			width: 280rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.item_value {
			display: flex;
			align-items: center;
			// color: #333333;
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
		// border-top: 1px solid #f2f2f2;
	}
}
</style>
