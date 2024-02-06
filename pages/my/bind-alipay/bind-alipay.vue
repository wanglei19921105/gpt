<template>
	<view class="page" :class="getThemeClass">
		<!-- 支付宝绑定 -->
		<!-- <unavbar :title="i18n.alipay1"></unavbar> -->
		<!-- 姓名 -->
		<view class="title">{{i18n.alipay2}}</view>
		<!-- 请输入您的真实密码 -->
		<input class="myinput card-bg" type="text" v-model="params.ali_name" :placeholder="status?draw.name:i18n.alipay3"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" :disabled="status" />
		<!-- 支付宝账号 -->
		<view class="title">{{i18n.alipay4}}</view>
		<!-- 请输入您的支付宝账号 -->
		<input class="myinput card-bg" type="text" v-model="params.ali_account" :placeholder="status?draw.account:i18n.alipay5"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" :disabled="status" />
		<!-- 修改账户:立即绑定 -->
		<botBtnp style="margin-top: 150rpx;" :btnText="status?i18n.alipay6:i18n.alipay7" @click.native="bind"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					ali_name: '',
					ali_account: '',
					type: '2', //1微信2支付宝
					img: ''
				},
				draw: {},
				status: true
			};
		},
		onShow() {
			this.getDrawinfo()
		},
		methods: {
			getDrawinfo() {
				this.$u.api.draw_info({
					'type': 2
				}).then(res => {
					if (res.code == 200) {
						if (res.data.info) {
							this.draw = res.data.info
							this.status = true
						} else {
							this.status = false
						}
					}
				}).catch(err => {})
			},
			bind() {
				if (this.status) {
					this.status = false
					return false;
				}
				if (!this.params.ali_name) {
					this.$refs.uToast.show({
						// 请输入您的真实姓名
						title: this.i18n.alipay3,
						type: 'error'
					});
					return false;
				}
				if (!this.params.ali_account) {
					this.$refs.uToast.show({
						// 请输入您的支付宝账号
						title: this.i18n.alipay5,
						type: 'error'
					});
					return false;
				}
				this.$u.api.bind_draw(this.params).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 绑定成功
							title: this.i18n.alipay8,
							type: 'success'
						});
						this.getDrawinfo()
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// 	background-color: #F9F9F9;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.myinput {
	// 		background-color: #292B2B;
	// 	}

	// 	.title {
	// 		color: #FFFFFF;
	// 	}
	// }

	.title {
		margin: 40rpx 0 24rpx 32rpx;
		// color: #333333;
		font-size: 26rpx;
	}

	.myinput {
		margin: 24rpx 30rpx 40rpx;
		// background-color: #fff;
		border-radius: 20rpx;
		height: 100rpx;
		padding-left: 30rpx;
	}

	// .input_pla {
	// 	color: #AAAAAA;
	// 	font-size: 28rpx;
	// }
</style>
