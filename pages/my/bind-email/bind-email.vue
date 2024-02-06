<template>
	<view class="page" :class="getThemeClass">
		<!-- 绑定邮箱 -->
		<!-- <unavbar :title="i18n.mailbox1"></unavbar> -->
		<!-- 邮箱账号 -->
		<view class="title">{{i18n.mailbox2}}</view>
		<!-- 请输入您的邮箱账号 -->
		<input class="myinput card-bg" type="text" v-model="params.email" :placeholder="status?user.email:i18n.mailbox3"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" :disabled="status!==0" />
		<!-- 验证码 -->
		<view class="title" v-show="!status">{{i18n.mailbox4}}</view>
		<!-- 请输入您的邮箱验证码 -->
		<countdown v-show="!status" style="margin: 0 30rpx;" uniquekey="bind-email" :placeholder="i18n.mailbox5"
			:type="2" :email="params.email">
		</countdown>
		<!-- 更改邮箱：绑定邮箱 -->
		<botBtnp style="margin-top: 150rpx;" :btnText="status?i18n.mailbox6:i18n.mailbox1"
			@click.native="bindEmail">
		</botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					email: '',
					sms_code: ''
				},
				disabled: false,
				user: {},
				status: 1
			};
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
		onShow() {
			this.getUserinfo()
		},
		methods: {
			getUserinfo() { //我的(首页)--接口
				this.$u.api.center_index().then(res => {
					this.user = res.data.user
					this.status = res.data.user.email_status
				}).catch(err => {})
			},
			bindEmail() {
				if (this.status == 1) {
					this.status = 0;
					return false
				}
				if (!this.params.email) {
					this.$refs.uToast.show({
						// 请填写邮箱账号
						title: this.i18n.mailbox8,
						type: 'error'
					});
					return false
				}
				if (!this.$u.test.email(this.params.email)) {
					this.$refs.uToast.show({
						// 请填写正确的邮箱账号
						title: this.i18n.mailbox7,
						type: 'error'
					});
					return false
				}
				if (!this.params.sms_code) {
					this.$refs.uToast.show({
						// 请填写验证码
						title: this.i18n.loginpwd8,
						type: 'error'
					});
					return false
				}
				this.$u.api.email_make(this.params).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 绑定成功
							title: this.i18n.alipay8,
							type: 'success'
						});
						this.getUserinfo()
					}
				}).catch(err => {})
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
	// 		color: #FFFFFF;
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
	// 	// color: #AAAAAA;
	// 	font-size: 28rpx;
	// }
</style>
