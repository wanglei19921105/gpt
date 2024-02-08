<template>
	<view class="page" :style="{backgroundColor:getBgColor}" :class="getThemeClass">
		<!-- 头像框 -->
		<view class="text-center">
			<image src="../../../static/logo.png" mode="" class="Head_image"></image>
		</view>
		<view class="title_h1" :style="{color: getTextColor}">忘记密码？请重新设置</view>
		<!-- 忘记密码 -->
		<!-- <unavbar :title="i18n.loginpwd1"></unavbar> -->
		<!-- 账号 -->
		<!-- <view class="title">{{i18n.loginpwd2}}</view> -->
		<!-- 请输入您的账号 -->
		<!-- <input class="myinput card-bg" type="text" :disabled="disabled" :placeholder="i18n.loginpwd3" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"
			v-model="params.login_account" /> -->
		<view class="u-flex u-m-l-50 u-m-r-50 align-center u-m-t-50 u-m-b-50 input_num" :style="{backgroundColor:getCardColor}">
			<text v-if="$store.state.isInternationalSMS" @click="openWin('/pages/login/country/country')" class="text-content" style="flex-shrink: 0; margin-right: 30rpx;">+{{$store.state.areacode}}</text>
			<image src="../../../static/images/sjh.png" mode="" class="iconsjh"></image>
			<input class="myinput" style="margin: 0;" type="text" :disabled="disabled" placeholder="请输入手机号" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"
				v-model="params.login_account" />
		</view>
		<view class="input_flex" :style="{backgroundColor:getCardColor}">
			<!-- 验证码 -->
			<image src="../../../static/images/yzm.png" mode="" class="iconsjh"></image>
			<!-- <view class="title">{{i18n.loginpwd4}}</view> -->
			<countdown :iptstyle="{}" :Vcstyle="{color:getTextColor}" :boxStyle="{borderRadius: '50rpx',backgroundColor: getCardColor}" uniquekey="revise-pwd" smsType="2" :phone="params.login_account">
			</countdown>
		</view>
		<!-- 新登录密码 -->
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<!-- <view class="title">{{i18n.loginpwd5}}</view> -->
			<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
			<u-input class="myinput" type="password" placeholder="6位的登录密码（字母加数字）" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" placeholder-class="text-placeholder"
				v-model="params.password" maxlength="6"/>
		</view>
		<!-- 确认您的新登录密码 -->
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<!-- <view class="title">{{i18n.loginpwd6}}</view> -->
			<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
			<u-input class="myinput" type="password" placeholder="请确认登录密码" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" placeholder-class="text-placeholder"
				v-model="params.password_confirmation" maxlength="6"/>
		</view>
		<!-- 保存 -->
		<botBtnp style="margin-top: 120rpx;" :btnText="i18n.pwd7" :radius="radius" @click.native="save"></botBtnp>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					login_account: '',
					sms_code: '',
					password: '',
					password_confirmation: ''
				},
				disabled:false,
				radius:'50rpx',
				imgUrl:require('../../../static/images/Logonbg.png')
			};
		},
		onLoad(data) {
			if(data.phone){
				this.disabled = true
				this.params.login_account = data.phone
			}else{
				this.disabled = false
			}
			console.log(this.disabled);
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
				if (!this.params.login_account) {
					this.$refs.uToast.show({
						// 请输入手机号
						title: '请输入手机号',
						type: 'error'
					});
					return false;
				}
				if (!this.$u.test.mobile(this.params.login_account)) {
					this.$refs.uToast.show({
						// 请填写正确的手机号
						title: '请填写正确的手机号',
						type: 'error'
					});
					return false;
				}
				if (!this.params.sms_code) {
					this.$refs.uToast.show({
						// 请填写验证码
						title: this.i18n.loginpwd8,
						type: 'error'
					});
					return false;
				}
				// if (!this.params.password) {
				// 	this.$refs.uToast.show({
				// 		// 请设置登录密码
				// 		title: this.i18n.loginpwd9,
				// 		type: 'error'
				// 	});
				// 	return false;
				// }
				const password = this.params.password;
				if (!password || password.length !== 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
						this.$refs.uToast.show({
								title: '密码必须为6位，包含至少1个数字和1个字母',
								type: 'error'
						});
						return false;
				}
				if (this.params.password != this.params.password_confirmation) {
					this.$refs.uToast.show({
						// 请填写登录密码
						title: "两次密码不一致！",
						type: 'error'
					});
					return false;
				}
				this.$u.api.forget_make(this.params).then(res => {
					if (res.code == 200) {
						uni.removeStorageSync('token');
						this.$refs.uToast.show({
							// 修改成功
							title: this.i18n.pwd12,
							type: 'success',
							duration: 1000,
						});
						setTimeout(() => {
							// uni.navigateTo({
							// 	url: '../../login/index/index'
							// })
							uni.reLaunch({
								url: '/pages/login/index/logInMain'
							})
						}, 1000)
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		// height: 100vh;
		// background-color: #FBF7F2 !important;
		background-size: 100% 100%;
	}
	.page-black {
		// background-color: #1E2020;

		.myinput {
			// background-color: #292B2B;
			// color: #FFFFFF;
		}

		.title {
			// color: #FFFFFF;
		}
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
	.title_h1 {
		width: fit-content;
		font-size: 42rpx;
		font-weight: bold;
		margin: 32rpx auto 119rpx;
	}
	.title {
		margin: 40rpx 0 24rpx 32rpx;
		// color: #333333;
		font-size: 26rpx;
	}
	.input_flex{
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		// background-color: #F3F1EE;
		margin: 0 52rpx 48rpx;
		.iconsjh{
			width: 40rpx;
			height: 40rpx;
			display: block;
			margin-left: 48rpx;
		}
	}
	.input_num{
		height: 88rpx;
		margin: 0 52rpx;
		// color: #2D3746;
		display: flex;
		// justify-content: center;
		align-items: center;
		border-radius: 50rpx;
		margin: 0 52rpx 48rpx;
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
	.myinput {
		// margin: 48rpx 52rpx 0;
		// background-color: #F3F1EE;
		// border-radius: 50rpx;
		// height: 88rpx;
		padding-right:20rpx !important;
	}

	.input_pla {
		// color: #AAAAAA;
		font-size: 28rpx;
	}
</style>
