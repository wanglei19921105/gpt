<template>
	<view class="page" :class="getThemeClass">
		<!-- 订单详情 -->
		<!-- <unavbar :title="i18n.order1"></unavbar> -->
		<view class="head card-bg">
			<image :src="boxInfo.cover" mode="widthFix"></image>
			<view class="head_title">
				<!-- NFT盲盒名称 -->
				{{boxInfo.title}}
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order_info card-bg" :class="getThemeClass" v-if="false">
			<view class="info_item border-color">
				<!-- 订单状态 -->
				<view class="text-call">{{i18n.order2}}</view>
				<!-- 待支付 -->
				<view>{{i18n.order3}}</view>
			</view>
			<view class="info_item border-color">
				<!-- 创建时间 -->
				<view class="text-call">{{i18n.order4}}</view>
				<view>{{time}}</view>
			</view>
			<view class="info_item border-color">
				<view class="text-call">{{i18n.order5}}</view>
				<view class="color-red text-bold">{{boxInfo.price}}USDT</view>
			</view>
		</view>
		<orderInfo :infoData="infoData" :one="usable_max_num" @change="numchange"></orderInfo>
		<!-- 支付方式 -->
		<payWay @payway="selPay"></payWay>
		<!-- 立即支付 -->
		<botBtnp style="margin-top: 150rpx;" :btnText="i18n.order9" @click="pay"></botBtnp>
		<pwdPay :stauts="payStatus" @closeMain="closeMain" @status="padpay"></pwdPay>
		<u-toast ref="uToast" />
		
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
				payway: 1,
				boxInfo: {}, //订单详情
				num: null, //剩余数量
				time: '', //创建时间
				payStatus: {
					show: false
				},
				status: false,
				security: '', //安全密码
				pay_type: null, //支付方式1微信app2微信H53微信公众号4支付宝app5支付宝H56余额支付
				id: null, //盲盒id
				orderData: { //订单数据

				},
				
				usable_max_num: 1,
				payNumber: 1,
				infoData: {},
				
				isGoPay: false,
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.getOrder(this.id)
				this.getTime()
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
			getOrder(id) { //订单详情预览
				this.$u.api.order_box_list({
					id: id
				}).then(res => {
					if (res.code == 200) {
						this.boxInfo = res.data.blind_box
						this.num = res.data.num
						this.infoData = res.data.pay
					}
				}).catch(err => {

				})
			},
			auction() { //余额支付
				let that = this
				that.$u.api.boxbalance_pay({
					'order_id': that.orderData.id,
					'security': that.security
				}).then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}
				})
			},
			awardPay(){
				this.$u.api.blindbox_air_pay({
					'order_id': this.orderData.id,
					'security': this.security
				}).then(res => {
					if (res.code == 200) {
						this.paySuccess()
					}
				})
			},
			open(i) { //监听密码弹窗打开
				this.$u.api.box_order_add({ //盲盒下单
					'id': this.id,
					'pay_type': this.pay_type
				}).then(res => {
					if (res.code == 200) {
						this.orderData = res.data.order
					}
				}).catch(err => {
					this.payStatus.show = false
				})
			},
			// 监听密码弹窗关闭
			closeMain(val) {
					if (!val) { //关闭支付弹窗，当前商品移入到我买到的-未支付页面
						if (!this.flag) {
							console.log('***');
							// uni.navigateBack({
							// 	delta: 2
							// })
						}
					}
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				// console.log(i);
				this.flag = true;
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
			getTime() { //获取当前时间
				let da = Date.now()
				da = new Date(da)
				var year = da.getFullYear();
				var month = da.getMonth() + 1;
				var date = da.getDate();
				var hours = da.getHours();
				var minutes = da.getMinutes();
				var seconds = da.getSeconds();
				this.time = [year, month, date].join('-') + ' ' + [hours, minutes, seconds].join(':')
			},
			paySuccess(){
				this.isGoPay = false
				uni.showToast({
					title:this.i18n.castingbuy10,
					icon:"none"
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
			},
			// 支付方式
			selPay(data) {
				this.payway = data.type
				this.pay_type = data.paytype
			},
			pay() {
				this.$u.api.box_order_add({
					'id': this.id,
					'pay_type': this.pay_type
				}).then(res => {
					if (res.code == 200) {
						this.orderData = res.data.order
						
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
				this.$u.api.box_pay_sandYun({
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
					.box_pay_wechat({
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
					.box_pay_ali({
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
				this.$u.api.box_pay_sand({
					'order_id': this.orderId,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			dlbPay(type){
				this.$u.api.box_pay_dlb({
					'order_id': this.orderId,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			numchange(e){
				this.payNumber = e
			},
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		margin: 30rpx 30rpx 20rpx 30rpx;
		// background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
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

			// view:nth-child(1) {
			// 	color: #999999;
			// }

			.text_red {
				// color: #A11716;
				font-weight: bold;
			}
		}

		.info_item+.info_item {
			border-top: 1px solid;
		}
	}
</style>
