<template>
	<!-- 验证码登录  -->
	<view class="page light-bg-f" :style="{backgroundColor:getBgColor}"  :class="getThemeClass">
		<!-- <unavbar></unavbar> -->
		<!-- 登录GPTAPP -->
		<!-- <view class="title">{{i18n.login1}}</view> -->
		<!-- 欢迎使用GPTAPP -->
		<!-- <view class="title_h1">{{i18n.login2}}</view> -->
		<view class="text-center">
			<image src="../../../static/logo.png" mode="" class="Head_image"></image>
		</view>
		<view class="title_h1" :style="{color: getTextColor}">终于等到你，马上登录</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/sjh.png" mode="" class="iconsjh"></image>
			<!-- 请输入账号 -->
			<u-input class="u_input1" v-model="params.login_account" type="text" :border="false" height="88"
				:placeholder="i18n.login3" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}"/>
		</view>
		<view class="input_flex" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/yzm.png" mode="" class="iconsjh"></image>
			<!-- 请输入短信验证码 -->
			<u-input class="input_code border-color" v-model="params.sms_code" :border="false" height="88"
				:placeholder="i18n.register4" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" />
			<!-- 获取验证码 -->
			<countdownP :btnStyle="{backgroundColor: getCardColor,color:getTextColor}" uniquekey="fastLogin" :phone="params.login_account" type="5"></countdownP>
		</view>
		<view class="fun_flex text-tips">
			<!-- 账号登录 -->
			<view @click="openWin('../index/index')">{{i18n.quicklogin1}}</view>
			<!-- 注册账号 -->
			<!-- <view @click="openWin('../register/register')">去注册</view> -->
		</view>
		<!-- 登录 -->
		<botBtn :btnText="i18n.login7" padding="25rpx 280rpx" :radius="radius" @click.native="login"></botBtn>
		<view class="gap-20"></view>
		<view class="footer_protocol">
			<image :src="checked?'../../../static/images/darkcheck.png':''"
				mode="widthFix" @click="checkedCli()">
			</image>
			<!-- 我已阅读并同意 -->
			<!-- <view class="color_ash text-content">{{i18n.login11}}</view> -->
			<view class="color_ash text-content">勾选代表同意</view>
			<!-- 《用户协议》 -->
			<view class="color_black" @click="openWin('../protocol/protocol')">《{{i18n.login12}}》</view>
			<!-- 和 -->
			<view class="color_ash text-content">和</view>
			<!-- 《隐私政策》 -->
			<view class="color_black" @click="openWin('../policy/policy')">《{{i18n.login13}}》</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					login_account: '',
					sms_code: ''
				},
				radius:'50rpx',
				value: '',
				checked: false,
			};
		},
		computed: {

		},
		methods: {
			// 勾选用户协议/隐私政策
			checkedCli() {
				if (!this.checked) {
					this.checked = true
				} else {
					this.checked = false
				}
			},
			// 登录
			login() {
				// 当前国际区号是否中国
				if (this.$store.state.areacode == 86) {
					console.log(1)
					if (!this.$u.test.mobile(this.params.login_account)) {
						this.$refs.uToast.show({
							// 请填写正确的账号
							title: this.i18n.login15,
							type: 'error'
						});
						return false;
					}
				} else {
					if (!this.params.login_account) {
						this.$refs.uToast.show({
							// 请填写账号
							title: this.i18n.login16,
							type: 'error'
						});
						return false;
					}
				}
				if (!this.params.sms_code) {
					this.$refs.uToast.show({
						// 请填写短信验证码
						title: this.i18n.register14,
						type: 'error'
					});
					return false;
				}
				if (!this.checked) {
					this.$refs.uToast.show({
						// 请勾选已阅读用户协议及隐私政策
						title: this.i18n.login18,
						type: 'error'
					});
					return false;
				}

				this.$u.api.login_make1(this.params).then(res => {
					if (res.code == 200) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('id', res.data.user.id)
						this.$refs.uToast.show({
							// 登录成功
							title: this.i18n.login19,
							type: 'success',
							duration: 1000,
						});
						setTimeout(() => {
							uni.switchTab({
								url: '../../tabbar/home/home'
							})
						}, 1000)
					}
				}).catch(err => {

				})
			},
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
		width: fit-content;
		font-size: 42rpx;
		font-weight: bold;
		margin: 32rpx auto 119rpx;
	}
	.Head_image{
		width: 140rpx;
		height: 140rpx;
		margin: 0 auto;
		margin-top: 190rpx;
		background: #FFFFFF;
		border: 1rpx solid #707070;
		border-radius: 50%;
	}
	.u_input {
		margin: 60rpx 74rpx 0 74rpx;
	}

	.u_input1 {
		margin-top: 0;
		border: none;
		padding: 0 20rpx 0 0 !important;
	}

	.fun_flex {
		display: flex;
		justify-content: space-between;
		margin: 36rpx 76rpx 50rpx;
		// color: #764E39;
		font-size: 26rpx;
	}

	.input_num {
		margin: 48rpx 52rpx;
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		// background: #F3F1EE;
		border-radius: 50rpx;
		// border-radius: 10rpx;
		text-indent: 34rpx;
		// border: 1px solid;
		.iconsjh{
			width: 40rpx;
			height: 40rpx;
			display: block;
			margin-left: 48rpx;
		}
	}

	.authorize_title {
		display: flex;
		justify-content: center;
		color: #666666;
		font-size: 24rpx;
		margin-top: 106rpx;
		align-items: center;

		.line {
			width: 54rpx;
			height: 2rpx;
			margin: 0 24rpx;
		}

		.line_left {
			background: linear-gradient(-90deg, #E6BB81 0%, #FFFFFF 100%);
		}

		.line_right {
			background: linear-gradient(90deg, #E6BB81 0%, #FFFFFF 100%);
		}
	}

	.weibo_login {
		text-align: center;
		margin: 68rpx;

		.weibo_img {
			width: 90rpx;
			height: 90rpx;
		}

		.weibo_text {
			font-size: 24rpx;
			color: #333333;
			margin-top: 28rpx;
		}
	}

	.footer_protocol {
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 30rpx;
			height: 30rpx !important;
			margin-right: 30rpx;
			border: 1rpx solid #dfc9a4;
			border-radius: 50%;
			background-size: 100% 100%;
		}

		.color_ash {
			// color: #999999;
		}

		.color_black {
			// color: #333333;
		}
	}

	.input_flex {
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		background-color: #F3F1EE;
		margin: 0 52rpx 48rpx;
		.iconsjh{
			width: 40rpx;
			height: 40rpx;
			display: block;
			margin-left: 48rpx;
		}
		.input_code {
			padding: 0 20rpx 0 34rpx !important;
			flex: 2;
		}
	}
</style>
