<template>
	<view class="page" :class="getThemeClass">
		<!-- 上架 -->
		<!-- <unavbar :title="i18n.listed1"></unavbar> -->
		<!-- <unavbar title="流转上架"></unavbar> -->
		<view class="head card-bg">
			<!-- 图片 -->
			<image :src="item.cover" style="border-radius: 30rpx;" mode="widthFix"></image>
			<!-- NFT铸品名称 -->
			<view class="name">{{item.title}}</view>
		</view>
		<!-- 价格: -->
		<view class="title">
			{{i18n.listed2}}：
		</view>
		<view class="input_flex card-bg" style="margin-bottom: 32rpx;">
			<!-- 设置售出价格 -->
			<input class="uinput" type="number" :placeholder="i18n.listed3" v-model="params.price"
				placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
				<!-- USDT -->
			<view>{{i18n.auction4}}</view>
		</view>

		<!-- 上架数量: -->
		<!-- <view class="title" v-if="tags==1">
			上架数量：
		</view> -->
		<!-- tags0版权品，1衍生品 -->
		<!-- 版权品，上架数量默认为0，输入框不展示 -->
		<!-- 衍生品，可以上传多个-->
		<!-- <view class="input_flex" style="margin-bottom: 32rpx;" v-if="tags==1">
			<input class="uinput" type="text" v-model="params.num" placeholder="设置上架数量"
				placeholder-style="color:#AAAAAA;font-size:28rpx" />
			<view>个</view>
		</view> -->

		<view class="input_box card-bg">
			<!-- 手续费 -->
			<view class="input_flex border-color" style="margin-bottom: 32rpx;">
				<input class="uinput" type="text" :placeholder="i18n.listed4" disabled
					placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
				<view>{{fee}}%</view>
			</view>
			<view class="line"></view>
			<!-- 版权费 -->
			<view class="input_flex border-color" style="margin-bottom: 32rpx;">
				<input class="uinput" type="text" :placeholder="i18n.listed5" disabled
					placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
				<view>{{item.copyright_tax||0}}%</view>
			</view>
		</view>
		
		<!-- <view class="line"></view> -->
		<view class="input_flex card-bg" style="margin-bottom: 32rpx;">
			<input class="uinput" type="text" placeholder="到账金额" disabled
				placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
			<view>{{ actualPrice }}</view>
		</view>
		
		<!-- 售出 -->
		<botBtnp style="margin: 78rpx 0 40rpx;" :btnText="i18n.listed6" @click.native="sold"></botBtnp>
		<u-toast ref="uToast" />
		<pwdPay :stauts="payStatus" @closeMain="closeMain" @status="padpay"></pwdPay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 版权品上架数量
				auctionNum: null,
				id: null,
				// tags0版权品、1衍生品，我的藏品所有商品默认上架数量为0
				tags: null,
				params: {
					order_id: null,
					price: null,
					security: '',
					num: 0
				},
				payStatus: {
					show: false,
				},
				status: false,
				item: {}, //商品信息
				fee: 0,
				open_audit: 0,
			};
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			},
			actualPrice(){
				// return this.params.price
				let price = 0
				let olPrice = Number(this.params.price)
				let formalitiesPrice = Number(this.fee) || 0
				let copyrightPrice = Number(this.item.copyright_tax) || 0
				if(this.params.price){
					price = olPrice - ((olPrice * formalitiesPrice / 100) + (olPrice * copyrightPrice / 100))
				}
				return price.toFixed(2)
			},
		},
		watch: {
			setSecurity(val) {
				this.params.security = val
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					this.sold()
				}
			}
		},
		onLoad(option) {
			// this.item = JSON.parse(option.item)
			this.fee = option.fee
			this.params.order_id = option.id
			this.loadData()
		},
		onShow() {
			this.$u.api.open_status().then(res=>{
				this.open_audit = +res.data.sys.open_audit
			})
		},
		methods: {
			loadData(){
				this.$u.api.my_wallet_object_detail({id: this.params.order_id}).then(res => {
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
			// 售出按钮
			sold() {
				if (!this.params.price) {
					this.$refs.uToast.show({
						// 请输入售出价格
						title: this.i18n.listed7,
						type: 'warning',
					})
					return false
				}

				if (this.payStatus.show) {
					this.payStatus.show = false
				}

				this.payStatus.show = true

				if (!this.params.security) {
					return false
				}
				// 走接口
				this.$u.api.up({
					price: this.params.price,
					id: this.params.order_id,
					security: this.params.security
				}).then(res => {
					this.params.price = ''
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 上架成功
							title: this.i18n.listed8,
							type: 'success',
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../release/release?current=' + (this.open_audit + 1)
							})
						}, 1000)
					}
				}).catch(err => {

				})
			},
			onInput(e) {
				// tags 0 版权品
				// tags 1 衍生品
				if (this.tags == 0) {
					if (Number(e.detail.value) > 1 || Number(e.detail.value) < 1) {
						this.$nextTick(function() {
							this.params.num = 1
						})
						this.$refs.uToast.show({
							// 版权品上架数量只能为1
							title: this.i18n.listed9,
							type: 'warning',
						})
					}
				}
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			}
		},
	}
</script>

<style lang="scss" scoped>
	// page {
	// 	background-color: #F9F9F9;
	// }

	// .box {
	// 	background-color: #F9F9F9;
	// 	min-height: 100vh;
	// 	padding-bottom: 40rpx;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.head {
	// 		background-color: #292B2B;

	// 		.name {
	// 			color: #FFFFFF;
	// 		}
	// 	}

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.uinput {
	// 		background-color: #292B2B !important;
	// 		color: #FFFFFF;
	// 	}

	// 	.input_flex {
	// 		background-color: #292B2B;

	// 		view {
	// 			color: #FFFFFF;
	// 		}
	// 	}

	// 	.input_box {
	// 		background-color: #292B2B;
	// 	}

	// 	.line {
	// 		background-color: #363737 !important;
	// 	}
	// }
	.page {
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

	.title {
		// color: #333333;
		font-size: 26rpx;
		margin: 40rpx 30rpx 0;
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

		.uinput {
			border-radius: 20rpx;
			// background-color: #fff;
			padding-left: 28rpx;
			height: 100%;
			width: 100%;
		}
	}

	.input_box {
		overflow: hidden;
		border-radius: 20rpx;
		margin: 0 30rpx;
		// background-color: #fff;

		.input_flex {
			border-radius: 0;
			margin: 0 !important;
			padding: 0 30rpx;

			.uinput {
				padding: 0;
			}
		}

		.line {
			height: 1rpx;
			// background-color: #F2F2F2;
			width: 92%;
			margin: 0 auto;
		}
	}
</style>
