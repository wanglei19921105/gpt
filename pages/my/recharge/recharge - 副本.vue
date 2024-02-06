<template>
	<view class="page" :class="getThemeClass">
		<!-- 余额充值 -->
		<!-- <unavbar :title="i18n.recharge1"></unavbar> -->
		<!-- 充值方式 -->
		<view class="recharge_card card-bg">
			<view class="receive_left">
				<image :src="payIcon" mode="widthFix"></image>
				<view class="recharge_name">{{ payName }}</view>
			</view>
			<!-- 充值方式 -->
			<view class="receive_right text-tips" @click="popupPay">
				{{ i18n.recharge4 }}
				<u-icon class="uicon" color="#C9C9C9" name="arrow-right"></u-icon>
			</view>
		</view>
		
		<view class="auction_card card-bg" v-if="payId == 8">
			<view class="u-font-28 text-bold u-m-b-30">1.收币地址</view>
			<view class="flex justify-between align-center u-p-l-36 card-tag-bg" style="border-radius: 44rpx;">
				<view class="line-1 flex-1">{{recharge.usdt_address || ''}}</view>
				<view class="u-m-l-30 flex-shink recharge_copybtn bg-cayn text-default u-font-28 move-btn" @click="copy">复制地址</view>
			</view>
			<view class="u-font-28 text-bold u-m-b-30 u-m-t-30">1.收币二维码</view>
			<view class="flex flex-direction align-center justify-center" @click="lookqrcode">
				<image :src="recharge.usdt_pic" class="rech-qrcode"></image>
				<view class="text-center font-22 text-placeholder u-m-t-10">（点击二维码保存）</view>
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
				<input type="number" @input="input" v-model="bid" :placeholder="i18n.recharge6"
					placeholder-style="font-weight:500;color:#C9C9C9;" />
			</view>
			<view style="width: 100%;height: 2rpx;" class="line"></view>
			<!-- 最小充值 -->
			<view class="" v-if="payId == 8">
				<view class="hint text-tips">
					换算概率：<text class="text-main">1U={{recharge.usdt_price}}USDT</text>
				</view>
				<view class="hint text-tips">
					需要USDT金额：<text class="text-main">{{total}}U</text>
				</view>
			</view>
			<view class="hint text-tips" v-else>
				{{i18n.recharge7}}：<text class="text-main">{{recharge.recharge_min}}USDT</text>
			</view>
			
		</view>

		<!-- 支付方式 -->
		<!-- <payWay @payway="selPay"></payWay> -->

		<!-- 确认充值 -->
		<botBtnp :btnText="i18n.recharge8" style="margin-top: 50rpx;" @click.native="rechargeBtn"></botBtnp>

		<u-popup v-model="showPay" mode="bottom" border-radius="14">
			<view class="popup_item card-bg">
				<template v-for="(item, index) in payList">
					<!-- #ifdef APP -->
					<template v-if="item.isAppShow">
						<view :key="item.id" @click="changePayType(index)">{{ item.name }}</view>
					</template>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<template v-if="item.isH5Show">
						<view :key="item.id" @click="changePayType(index)">{{ item.name }}</view>
					</template>
					<!-- #endif -->
				</template>
			</view>
			<view class="cancel card-bg text-content" @click="popupPay">
				<!-- 取消 -->
				{{ i18n.recharge9 }}
			</view>
		</u-popup>
		
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
				bid: null,
				recharge: {},
				order: {},
				
				total: 0,
				qrcode: null,
				
				payName: '',
				payType: -1,
				payIcon: '',
				payId: 0,
				showPay: false,
				isGoPay: false,
				paySwitch: {
					wechat_wap: '0',
					wechat_app: '0',
					ali_wap: '0',
					ali_app: '0',
					sand_fast: '0',
					dlb: '0',
					usdt: '0',
				}
			};
		},
		onLoad() {
			this.walletShow()
		},
		methods: {
			rechargeBtn() {
				//确认充值按钮
				if(this.payType === -1){
					this.$refs.uToast.show({
						title: '暂无支付方式！',
						type: 'error'
					});
					return
				}
				if (!this.bid || this.bid < Number(this.recharge.recharge_min)) {
					this.$refs.uToast.show({
						// 充值不能小于  USDT
						title: this.i18n.recharge10 + Number(this.recharge.recharge_min) + this.i18n.recharge11,
						type: 'error'
					});
					return
				}
				this.$u.api
					.recharge_edit({
						recharge_num: this.bid,
						pay_type: this.payType
					})
					.then(res => {
						if (res.code == 200) {
							this.order = res.data.order;
							if (this.payId == 1) {
								this.wxPay(this.payType);
							} else if(this.payId == 2) {
								this.aliPay(this.payType);
							} else if(this.payId == 5){
								this.sdkjPay(this.payType)
							} else if(this.payId == 6){
								this.dlbPay(this.payType)
							} else if(this.payId == 7){
								this.sdbkPay(this.payType, res.data.card)
							} else if(this.payId == 8){
								this.usdtPay()
							}
						}
					})
					.catch(err => {});
			},
			wxPay(type) {
				this.$u.api
					.recharge_pay_wechat({
						order_id: this.order.id,
						pay_type: type
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
					});
			},
			aliPay(type) {
				this.$u.api
					.recharge_pay_ali({
						order_id: this.order.id,
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
					});
			},
			sdkjPay(type){
				this.$u.api.recharge_pay_sand({
					'order_id': this.order.id,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			dlbPay(type){
				this.$u.api.recharge_pay_dlb({
					'order_id': this.order.id,
					'pay_type': type
				}).then(res => {
					this.isGoPay = true
					this.$pay.otherH5Pay(res.data.result)
				})
			},
			sdbkPay(type, card){
				if(card.card_no){
					let formdata = {
						order_id: this.order.id,
						pay_type: type
					}
					this.$refs.bindpay.openSms(card, 'recharge_pay_sandhtpay', formdata, 1)
				}else{
					this.$refs.bindpay.openbind()
				}
			},
			ysfPay(type){
				var r = hxruppay.checkIsAppInstalled();
				if(r){
					// this.$u.api.recharge_pay_sandac({
					// 	order_id: this.order.id,
					// 	pay_type: type
					// }).then(res=>{
					// 	let tn = JSON.parse(res.data.result).tn
					// 	hxruppay.payWithData({'tn':tn,'mode':'00'}, res => {
					// 		setTimeout(() => {
					// 			this.walletShow()
					// 		}, 1000)
					// 	});
					// })
				} else {
					uni.showToast({
						title:"请先安装云闪付APP",
						icon:"none"
					})
				}
			},
			usdtPay(){
				uni.redirectTo({
					url:"/pages/my/recharge/success"
				})
			},
			walletShow() {
				this.$u.api.wallet_show().then(res => {
					if (res.code == 200) {
						this.recharge = res.data.recharge
						this.paySwitch.usdt = res.data.recharge.usdt_open
						this.loadData()
					}
				}).catch(err => {

				})
			},
			loadData(){
				this.$u.api.open_status().then(res=>{
					this.paySwitch = {
						...this.paySwitch,
						...res.data.pay
					}
					this.changePayType(-1);
				})
			},
			lookqrcode(){
				uni.previewImage({
					urls: [this.recharge.usdt_pic]
				})
			},
			input(){
				if(this.rechargeMode<2)return
				if(this.bid){
					this.total = Number(this.bid)/Number(this.recharge.usdt_price).toFixed(4)
				}else{
					this.total = 0
				}
			},
			copy(){
				uni.setClipboardData({
					data: this.recharge.usdt_address
				})
			},
			// 支付方式
			// selPay(data) {
			// 	this.payway = data
			// 	if (data == 3) {
			// 		this.pay_type = 6
			// 	}
			// },
			changePayType(index) {
				let payIndex = index;
				if (payIndex === -1) {
					for (var i = 0; i < this.payList.length; i++) {
						// #ifdef APP
						if (this.payList[i].isAppShow) {
							payIndex = i;
							break;
						}
						// #endif
						// #ifdef H5
						if (this.payList[i].isH5Show) {
							payIndex = i;
							break;
						}
						// #endif
					}
				}
				if(payIndex === -1){
					this.payName = '暂无支付方式'
					this.payIcon = '/static/images/compound-close.png'
					return 
				}
				this.payIcon = this.payList[payIndex].icon;
				this.payName = this.payList[payIndex].name;
				this.payId = this.payList[payIndex].id
				// #ifdef APP
				this.payType = this.payList[payIndex].appPayType;
				// #endif
				// #ifdef H5
				this.payType = this.payList[payIndex].h5PayType;
				// #endif
				if(this.payId === 8){
					// setTimeout(()=>{
					// 	this.$refs.qrcode._makeCode();
					// }, 300)
				}
				this.showPay = false;
			},
			popupPay() {
				if (this.showPay) {
					this.showPay = false;
				} else {
					this.showPay = true;
				}
			},
			paySuccess() {
				this.isGoPay = false;
				this.myShowToast('请稍后查看支付结果~');
				this.bid = '';
				this.walletShow();
			},
		},
		computed: {
			payList() {
				let payArr = [
					{
						id: 1,
						appPayType: 1,
						h5PayType: 2,
						icon: require('@/static/images/weChatRecharge.png'),
						name: '微信支付',
						isAppShow: this.paySwitch.wechat_app === '1',
						isH5Show: this.paySwitch.wechat_wap === '1',
					},
					{
						id: 2,
						appPayType: 4,
						h5PayType: 5,
						icon: require('@/static/images/alipayTopUp.png'),
						name: '支付宝支付',
						isAppShow: this.paySwitch.ali_app === '1',
						isH5Show: this.paySwitch.ali_wap === '1',
					},
					{
						id: 5,
						appPayType: 8,
						h5PayType: 8,
						icon: require('@/static/images/sd.png'),
						name: '杉德快捷支付',
						isAppShow: this.paySwitch.sand_fast === '1',
						isH5Show: this.paySwitch.sand_fast === '1',
					},
					{
						id: 6,
						appPayType: 9,
						h5PayType: 9,
						icon: require('@/static/images/jd.png'),
						name: '京东快捷支付',
						isAppShow: this.paySwitch.dlb === '1',
						isH5Show: this.paySwitch.dlb === '1',
					},
					{
						id: 7,
						appPayType: 10,
						h5PayType: 10,
						icon: require('@/static/images/sd.png'),
						name: '杉德绑卡支付',
						isAppShow: false,
						isH5Show: false
					},
					{
						id: 8,
						appPayType: 10,
						h5PayType: 10,
						icon: require('@/static/images/usdtRecharge.png'),
						name: 'USDT',
						isAppShow:  this.paySwitch.usdt === '1',
						isH5Show: this.paySwitch.usdt === '1'
					}
				];
				return payArr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rech-qrcode{
		width: 210rpx;
		height: 210rpx;
	}
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
	
	.recharge_copybtn{
		width: 200rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		border-radius: 44rpx;
	}
</style>
