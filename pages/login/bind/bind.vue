<template>
	<view>
		<!-- <unavbar></unavbar> -->
		<!-- 账号绑定 - 暂已弃用 -->
		<view class="title_h1">{{i18n.accountbind1}}</view>
		<view class="input_num">
			<text @click="openWin('../country/country')">+{{this.$store.state.areacode}}</text>
			<!-- 请输入账号 -->
			<u-input class="u_input1" v-model="params.phoneNum" type="text" :border="true" height="106"
				:placeholder="i18n.register3" placeholderStyle="color:#CCCCCC" />
		</view>
		<view class="input_flex">
			<!-- 请输入短信验证码 -->
			<u-input class="input_code" v-model="params.captcha" :border="true" height="106"
				:placeholder="i18n.register4" border-color="#D1CBC8" placeholderStyle="color:#CCCCCC" />
			<countdownP uniquekey="bind"></countdownP>
		</view>
		<!-- 请设置登录密码 -->
		<u-input class="u_input" v-model="params.password" type="password" :border="true" height="106"
			:placeholder="i18n.register6" border-color="#D1CBC8" placeholderStyle="color:#CCCCCC" />
		<!-- 确认登录密码 -->
		<u-input class="u_input" v-model="params.password1" type="password" :border="true" height="106"
			:placeholder="i18n.register7" border-color="#D1CBC8" placeholderStyle="color:#CCCCCC" />
		<!-- 请输入您的邀请码（选填） -->
		<u-input class="u_input" v-model="params.Invitationcode" :border="true" height="106"
			:placeholder="i18n.register8" border-color="#D1CBC8" placeholderStyle="color:#CCCCCC" />
		<!-- 立即绑定 -->
		<botBtn :btnText="i18n.accountbind2" style="margin-top: 172rpx;" @click.native="bind"></botBtn>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				params: {
					phoneNum: null,
					captcha: null,
					password: '',
					password1: '',
					Invitationcode: ''
				},
			};
		},
		methods: {
			bind() {
				// 当前国际区号是否中国
				if (this.$store.state.areacode == 86) {
					console.log(1)
					if (!this.$u.test.mobile(this.params.phoneNum)) {
						this.$refs.uToast.show({
							// 请填写正确的账号
							title: this.i18n.login15,
							type: 'error'
						});
						return false;
					}
				} else {
					if (!this.params.phoneNum) {
						this.$refs.uToast.show({
							// 请填写账号
							title: this.i18n.login16,
							type: 'error'
						});
						return false;
					}
				}
				if (!this.params.captcha) {
					this.$refs.uToast.show({
						// 请填写短信验证码
						title: this.i18n.register14,
						type: 'error'
					});
					return false;
				}
				if (!this.params.password) {
					this.$refs.uToast.show({
						// 请填写登录密码
						title: this.i18n.register15,
						type: 'error'
					});
					return false;
				}
				if (!this.params.password1) {
					this.$refs.uToast.show({
						// 请填写确认登录密码
						title: this.i18n.register16,
						type: 'error'
					});
					return false;
				}
				if (this.params.password != this.params.password1) {
					this.$refs.uToast.show({
						// 两次输入密码不一致
						title: this.i18n.register17,
						type: 'error'
					});
					return false;
				}
				this.$refs.uToast.show({
					// 绑定成功，2秒后返回登录页面
					title: this.i18n.accountbind3,
					type: 'success',
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '../index/index'
					})
				}, 2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 30rpx;
		color: #9E9089;
		padding: 54rpx 0 0 64rpx;
	}

	.title_h1 {
		font-size: 50rpx;
		color: #333333;
		margin: 32rpx 0 132rpx 62rpx;
	}

	.u_input {
		margin: 60rpx 74rpx 0 74rpx;
	}

	.u_input1 {
		margin-top: 0;
		border: none;
		padding: 0 20rpx 0 0 !important;
	}

	.input_num {
		margin: 0 74rpx;
		height: 106rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		text-indent: 34rpx;
		border: 1px solid #D1CBC8;
	}

	.input_flex {
		display: flex;
		align-items: center;
		margin: 60rpx 76rpx 0;

		.input_code {
			flex: 2;
		}
	}
</style>
