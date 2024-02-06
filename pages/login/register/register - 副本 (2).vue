<template>
	<view class="page light-bg-f" :style="{backgroundColor:getBgColor}"  :class="getThemeClass">
		<!-- <unavbar></unavbar> -->
		<!-- 注册GPTAPP -->
		<!-- <view class="title text-main">{{i18n.register1}}</view> -->
		<!-- 快速注册GPTAPP -->
		<!-- <view class="title_h1">{{i18n.register2}}</view> -->
		<!-- 头像框 -->
		<view class="text-center">
			<image src="../../../static/logo.png" mode="" class="Head_image"></image>
		</view>
		<view class="title_h1" :style="{color: getTextColor}">快速注册GPTAPP</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<!-- 选择国家 -->
			<image src="../../../static/images/sjh.png" mode="" class="iconsjh"></image>
			<!-- 请输入账号 -->
			<u-input type="text" @input="inputDetails" class="u_input1" v-model="params.user_account" :border="false" height="88"
				placeholder="8-20位 字母+数字" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}"/>
		</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
			<!-- 请设置登录密码 -->
			<u-input class="u_input" v-model="params.password" type="password" :border="false" height="88"
				placeholder="6位的登录密码（字母加数字）" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" maxlength="6"/>			
		</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
			<!-- 请设置登录密码 -->
			<u-input class="u_input" v-model="params.password_confirmation" type="password" :border="false" height="88"
				placeholder="请确认登录密码" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" maxlength="6"/>			
		</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
			<!-- 请设置支付密码 -->
			<u-input class="u_input" v-model="params.security" type="password" :border="false" height="88"
				placeholder="6位数字的支付密码" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" />
		</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/yqm.png" mode="" class="iconsjh"></image>
			<!-- 请输入您的邀请码(选填) -->
			<u-input class="u_input" :disabled="disabled" v-model="params.invite_code" type="number" :border="false" height="88"
				:placeholder="i18n.register8" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" />			
		</view>
		<view class="fun_flex text-tips">
			<view @click="openWin('../index/index')">{{i18n.register9}}</view>
		</view>
		<!-- 立即注册 -->
		<botBtn
			:btnText="i18n.register10" 
			:radius="radius"
			@click="register"
			padding="25rpx 280rpx"
		></botBtn>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					user_account:'',
					password: '',
					password_confirmation:'',
					security: '',
					invite_code: '',
				},
				show: false,
				disabled:false,
				radius:'50rpx',
				imgUrl:require('../../../static/images/Logonbg.png')
			};
		},
		onLoad(data) {
			if(data.id){
				this.params.invite_code = data.id
				this.disabled = true
			}else{
				this.disabled = false
			}
		},
		onReady() {

		},
		onShow() {
			this.params.country_code = this.$store.state.areacode
		},
		methods: {
			country() {
				uni.navigateTo({
					url: '../country/country'
				})
				this.params.country_code = this.$store.state.areacode
			},
			inputDetails(event){
				var value = event;
				if(!value || value == " "){
				return '';
				}
			//匹配汉字的正则表达式
			const rule = /[^\w\.\/]/ig;	// /[^\w\.\/]/ig /[^a-zA-Z0-9]/g
				this.$nextTick(function () {
					this.params.user_account = value.replace(rule,'');
				})
				// console.log(this.params.user_account);
			},
			// 立即注册
			register() {
				if (!this.params.user_account) {
					this.$refs.uToast.show({
						title: '请输入正确的账号',
						type: 'error'
					});
					return false;
				}
				let accountRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

				if (!accountRegex.test(this.params.user_account)) {
					this.$refs.uToast.show({
						title: '账号格式不正确，请输入8-20位长度且至少包含一个字母',
						type: 'error'
					});
					return false;
				}
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
				if (!this.params.security) {
					this.$refs.uToast.show({
						// 请填写确认登录密码
						title: "请设置您的支付密码",
						type: 'error'
					});
					return false;
				}

				this.$u.api.register_make(this.params).then(res => {
					if (res.code == 200) {
						uni.setStorageSync('token', res.data.token);
						this.$refs.uToast.show({
							// 注册成功，2秒后自动登入首页
							title: this.i18n.register18,
							type: 'success',
						});
						setTimeout(() => {
							uni.switchTab({
								url: '../../tabbar/home/home'
							})
						}, 2000)
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		height: 100vh;
		background-size: 100% 100%;
	}
	.title {
		font-size: 30rpx;
		color: #9E9089;
		padding: 54rpx 0 0 64rpx;
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
		margin: 32rpx auto 47rpx;
	}

	.u_input {
		padding-right:20rpx !important;
		// margin: 48rpx 52rpx 0;		
		// background: #F3F1EE;
		border-radius: 50rpx;
	}

	.u_input1 {
		margin-top: 0;
		border: none;
		padding: 0 20rpx 0 0 !important;
	}

	.fun_flex {
		display: flex;
		justify-content: flex-end;
		margin: 36rpx 76rpx 112rpx;
		// color: #764E39;
		font-size: 26rpx;
	}

	.input_num {
		height: 88rpx;
		margin: 0 52rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #F3F1EE;
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
