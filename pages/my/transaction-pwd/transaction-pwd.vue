<template>
	<view class="page" :class="getThemeClass">
		<!-- 设置交易密码 -->
		<!-- <unavbar :title="i18n.pwd1"></unavbar> -->
		<!-- 账号 -->
		<view class="title">{{i18n.pwd2}}</view>
		<!-- 请输入您的账号 -->
		<!-- <input class="myinput card-bg" type="text" :value="phone" :placeholder="i18n.pwd3" disabled
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" /> -->
		<view class="u-flex u-m-l-30 u-m-r-30 align-center u-m-t-30 u-m-b-30">
			<text v-if="$store.state.isInternationalSMS" @click="openWin('/pages/login/country/country')" class="text-content" style="flex-shrink: 0; margin-right: 30rpx;">+{{$store.state.areacode}}</text>
			<input class="myinput card-bg" style="width: 100%; margin: 0;" type="text" disabled :placeholder="i18n.pwd3" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"
				:value="phone" />
		</view>
		<!-- 验证码 -->
		<view class="title">{{i18n.pwd4}}</view>
		<countdown style="margin: 0 30rpx;" uniquekey="transaction-pwd" smsType="3" :phone="phone"></countdown>
		<!-- 输入您的交易密码 -->
		<view class="title">{{i18n.pwd5}}</view>
		<view class="uinput_box card-bg">
			<u-input class="text-main-greatest" type="password" v-model="params.security" height="100" placeholder="6位数字支付密码"
				:placeholder-style="`font-size: 28rpx; color: ${getTextPlaceholderColor};`" />
		</view>
		<!-- 确认您的交易密码 -->
		<view class="title">{{i18n.pwd6}}</view>
		<view class="uinput_box card-bg">
			<u-input class="text-main-greatest" type="password" v-model="params.security_confirmation" height="100"
				:placeholder="i18n.pwd6" :placeholder-style="`font-size: 28rpx; color: ${getTextPlaceholderColor};`" />
		</view>
		<!-- 保存 -->
		<botBtnp style="margin-top: 200rpx;" :btnText="i18n.pwd7" @click="save"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					security: '',
					security_confirmation: '',
					sms_code: ''
				},
				phone: ''
			};
		},
		onShow() {
			this.getUserinfo()
		},
		computed: {
			getSmscode() {
				return this.$store.state.smscode
			}
		},
		watch: {
			getSmscode(val) {
				this.params.sms_code = val
			}
		},
		methods: {
			save() {
				if (!this.params.sms_code) {
					this.$refs.uToast.show({
						// 请输入验证码
						title: this.i18n.pwd8,
						type: 'error'
					});
					return false;
				}
				if (!this.params.security) {
					this.$refs.uToast.show({
						// 请输入交易密码
						title: this.i18n.pwd9,
						type: 'error'
					});
					return false;
				}
				if (!this.params.security_confirmation) {
					this.$refs.uToast.show({
						// 请再次输入密码
						title: this.i18n.pwd10,
						type: 'error'
					});
					return false;
				}
				if (this.params.security != this.params.security_confirmation) {
					this.$refs.uToast.show({
						// 两次输入密码不一致
						title: this.i18n.pwd11,
						type: 'error'
					});
					return false;
				}
				this.$u.api.security_make(this.params).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 修改成功
							title: this.i18n.pwd12,
							type: 'success'
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 0
							})
						}, 1500)
					}
				}).catch(err => {})
			},
			getUserinfo() { //我的(首页)--接口
				this.$u.api.center_index().then(res => {
					this.phone = res.data.user.phone
				}).catch(err => {})
			},

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
	// 	min-height: 100vh;

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.myinput {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;
	// 	}

	// 	.uinput_box {
	// 		background-color: #292B2B;
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
		text-indent: 30rpx;
	}

	.input_pla {
		// color: #AAAAAA;
		font-size: 28rpx;
	}

	.uinput_box {
		height: 100rpx;
		margin: 0 30rpx;
		margin: 24rpx 30rpx 40rpx;
		// background-color: #FFFFFF;
		padding: 0 24rpx;
		border-radius: 20rpx;
	}
</style>
