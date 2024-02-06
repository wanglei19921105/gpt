<template>
	<view class="page" :class="getThemeClass">
		<!-- NFT拍卖 -->
		<!-- <unavbar :title="i18n.auction1"></unavbar> -->
		<view class="head card-bg">
			<!-- 图片 -->
			<image :src="item.cover" style="border-radius: 30rpx;" mode="widthFix"></image>
			<!-- NFT铸品名称 -->
			<view class="name">{{item.title}}</view>
		</view>
		<!-- 起拍价： -->
		<view class="item_title">{{i18n.auction2}}：</view>
		<view class="input_flex card-bg">
			<!-- 设置售出价格 -->
			<input class="uinput" type="number" v-model="params.price" :placeholder="i18n.auction3"
				:placeholderStyle="`color: ${getTextPlaceholderColor}; font-size: 28rpx`" :customStyle="{color: getTextColor}" />
				<!-- USDT -->
			<view>{{i18n.auction4}}</view>
		</view>
		<!-- 拍卖数量： -->
		<!-- <view class="item_title">拍卖数量：</view>
		<view class="input_flex"> -->
		<!-- 版权品 -->
		<!-- <input v-if="tags == 1" @input="onInput" class="uinput" type="number" v-model="auctionNum"
				placeholder="设置拍卖数量" placeholder-style="color:#AAAAAA;font-size:28rpx" /> -->
		<!-- 衍生品 -->
		<!-- <input v-if="tags == 2 || !tags" class="uinput" type="number" placeholder="设置拍卖数量"
				placeholder-style="color:#AAAAAA;font-size:28rpx" />
		</view> -->

		<!-- 加价幅度： -->
		<view class="item_title">{{i18n.auction5}}：</view>
		<view class="input_flex card-bg">
			<!-- 设置加价幅度 -->
			<input class="uinput card-bg" type="number" v-model="params.plus_price" :placeholder="i18n.auction6"
				:placeholderStyle="`color: ${getTextPlaceholderColor}; font-size: 28rpx`" :customStyle="{color: getTextColor}" />
				<!-- USDT -->
			<view>{{i18n.auction4}}</view>
		</view>

		<!-- 保证金 -->
		<view class="item_title">{{i18n.auction7}}</view>
		<view class="input_flex card-bg" style="margin-bottom: 32rpx;">
			<!-- 设置保证金金额 -->
			<input class="uinput card-bg" type="number" v-model="params.bail" :placeholder="i18n.auction8"
				:placeholderStyle="`color: ${getTextPlaceholderColor}; font-size: 28rpx`" :customStyle="{color: getTextColor}" />
				<!-- USDT -->
			<view>{{i18n.auction4}}</view>
		</view>
		<!-- 提示 -->
		<!-- * 拍卖时间为48小时，时间停止后价高者得，成交价不得低于
			最低价 -->
		<view class="hint color-red">* {{i18n.auction9}}{{time}}{{i18n.auction10}}</view>
		<!-- 发起拍卖 -->
		<botBtnp style="margin-bottom: 94rpx;" :btnText="i18n.auction11" @click.native="auction"></botBtnp>
		<!-- 安全密码-弹框 -->
		<pwdPay :stauts="payStatus" @closeMain="closeMain" @status="padpay"></pwdPay>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 拍卖数量
				auctionNum: null,

				tags: null,
				// 安全密码支付-弹出框
				payStatus: {
					show: false,
					url: null
				},
				item: {},
				params: {
					products_id: null,
					price: null,
					plus_price: null,
					bail: null,
					num: 0,
					security: ''
				},
				status: false,
				time:''
			};
		},
		onLoad(option) {
			// this.item = JSON.parse(option.item)
			// this.params.products_id = this.item.id
			// this.actionShow(this.item.id)
			this.params.products_id = option.id
			this.actionShow(option.id)
			this.loadData()
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			}
		},
		watch: {
			setSecurity(val) {
				this.params.security = val
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					this.auction()
				}
			}
		},
		methods: {
			loadData(){
				this.$u.api.my_wallet_object_detail({id: this.params.products_id}).then(res => {
					// console.log(res);
					this.item = res.data.detail
				})
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
			// 实时监听input 值
			onInput(e) {
				if (this.tags == 1) {
					if (Number(e.detail.value) > 1) {
						this.$nextTick(function() {
							this.auctionNum = 1
						})
						this.$refs.uToast.show({
							// 拍卖数量最大只能为
							title: this.i18n.auction12,
							type: 'warning',
						})
					}
				}
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			},
			// 发起拍卖
			auction() {
				if (!this.params.price) {
					this.$refs.uToast.show({
						// 请输入起拍价
						title: this.i18n.auction13,
						type: 'warning',
					})
					return false
				}
				if (!this.params.plus_price) {
					this.$refs.uToast.show({
						// 请输入加价幅度
						title: this.i18n.auction14,
						type: 'warning',
					})
					return false
				}

				if (!this.params.bail) {
					this.$refs.uToast.show({
						// 请输入保证金
						title: this.i18n.auction15,
						type: 'warning',
					})
					return false
				}

				if (this.payStatus.show = false) {
					this.payStatus.show = true
				} else {
					this.payStatus.show = true
				}

				if (!this.params.security) {
					return false
				}

				this.$u.api.create_new_auction(this.params).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 发起拍卖成功
							title: this.i18n.auction16,
							type: 'success',
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../release/release?current=' + 2
							})
						}, 1000)
					}
				}).catch(err => {

				})
			},
			// 获取拍卖时间
			actionShow(id) {
				this.$u.api.action_show({
					'products_id': id
				}).then(res => {
					if (res.code == 200) {
						this.time = res.data.time
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page {
	// 	background-color: #F9F9F9;
	// }

	// .box {
	// 	background-color: #F9F9F9;
	// 	padding-bottom: 40rpx;
	// 	height: 100%;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.head {
	// 		background-color: #292B2B;

	// 		.name {
	// 			color: #FFFFFF;
	// 		}
	// 	}

	// 	.item_title {
	// 		color: #FFFFFF;
	// 	}

	// 	.input_flex {
	// 		background-color: #292B2B;

	// 		view {
	// 			color: #FFFFFF;
	// 		}
	// 	}

	// 	.uinput {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;
	// 	}
	// }
	.page{
		padding-top: 30rpx;
	}
	.head {
		margin: 0rpx 30rpx 30rpx;
		// background-color: #fff;
		border-radius: 0px 0px 30rpx 30rpx;

		image {
			width: 100%;
		}

		.name {
			font-size: 32rpx;
			// color: #111111;
			font-weight: bold;
			padding: 42rpx 32rpx;
		}
	}

	.item_title {
		margin: 44rpx 0 24rpx 30rpx;
		// color: #333333;
		font-size: 26rpx;
	}

	.uinput {
		border-radius: 20rpx;
		// background-color: #fff;
		padding-left: 28rpx;
		height: 100%;
		width: 100%;
	}

	.hint {
		// color: #B3272A;
		// color: red;
		font-size: 24rpx;
		margin: 32rpx 38rpx 106rpx;
		line-height: 1.8;
	}

	.input_flex {
		border-radius: 20rpx;
		margin: 24rpx 30rpx 46rpx;
		display: flex;
		height: 100rpx;
		line-height: 100rpx;
		// background-color: #fff;
		padding-right: 30rpx;
		// color: #111111;
		font-size: 28rpx;
	}
</style>
