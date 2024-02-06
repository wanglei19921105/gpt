<template>
	<view class="page light-bg-f" :style="{backgroundColor:getBgColor}" :class="getThemeClass">
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
		<view v-if="nowechat">
			<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
				<!-- 选择国家 -->
				<image src="../../../static/images/sjh.png" mode="" class="iconsjh"></image>
				<text @click="country()" v-if="$store.state.isInternationalSMS">+{{$store.state.areacode}}</text>
				<!-- 请输入账号 -->
				<u-input type="text" @input="inputDetails" class="u_input1" v-model="params.phone" :border="false"
					height="88" placeholder="请输入手机号" :placeholderStyle="`color: ${getTextPlaceholderColor}`"
					:customStyle="{color: getTextColor}" />
			</view>
			<view class="input_flex" :style="{backgroundColor:getCardColor}">
				<image src="../../../static/images/yzm.png" mode="" class="iconsjh"></image>
				<!-- 请输入短信验证码 -->
				<u-input class="input_code border-color" v-model="params.sms_code" :border="false" height="88"
					:placeholder="i18n.register4" :placeholderStyle="`color: ${getTextPlaceholderColor}`"
					:customStyle="{color: getTextColor}" />
				<countdownP :btnStyle="{backgroundColor: getCardColor,color:getTextColor}" uniquekey="register"
					:phone="params.phone" type="1" :countryCode="toString($store.state.areacode)">
				</countdownP>
			</view>
			<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
				<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
				<!-- 请设置登录密码 -->
				<u-input class="u_input" v-model="params.password" type="password" :border="false" height="88"
					placeholder="请设置8-16位的登录密码（字母加数字）" :placeholderStyle="`color: ${getTextPlaceholderColor}`"
					:customStyle="{color: getTextColor}" />
			</view>
			<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
				<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
				<!-- 请设置支付密码 -->
				<u-input class="u_input" v-model="params.security" type="password" :border="false" height="88"
					placeholder="6位数字的支付密码" :placeholderStyle="`color: ${getTextPlaceholderColor}`"
					:customStyle="{color: getTextColor}" />
			</view>
			<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
				<image src="../../../static/images/yqm.png" mode="" class="iconsjh"></image>
				<!-- 请输入您的邀请码(选填) -->
				<u-input class="u_input" :disabled="disabled" v-model="params.invite_code" type="number" :border="false"
					height="88" :placeholder="i18n.register8" :placeholderStyle="`color: ${getTextPlaceholderColor}`"
					:customStyle="{color: getTextColor}" />
			</view>
		</view>

		<!-- 立即注册 -->

		<botBtn v-if="Wechat" class="wechat-logo" @click="getWeChatCode">微信授权登录</botBtn>
		<botBtn v-else :btnText="i18n.register10" :radius="radius" @click="register" padding="25rpx 280rpx"></botBtn>
		<view class="weChatRecharge" @click="getWeChatCode" v-if="Wechat">
			<image class="weChatRecharge-image" src="/static/images/chatimage.svg" mode="widthFix"></image>
		</view>
		<view class="register-box" v-if="Wechat">
			<view class="fun_flex text-tips">
				<view @click="openWin('../index/index')">{{i18n.register19}}</view>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					country_code: '',
					phone: '',
					sms_code: '',
					password: '',
					security: '',
					invite_code: '',
					unionid: ''
				},
				Wechat: false,
				nowechat: true,
				show: false,
				disabled: false,
				radius: '50rpx',
				imgUrl: require('../../../static/images/Logonbg.png'),
			};
		},
		onLoad(data) {
			const hasWechatLogin = uni.getStorageSync('wechat_login_tag') || null;

			if (hasWechatLogin) {
				this.checkWeChatCode();
			}
			this.isWechat()
			//console.log(data);
			if (data.id) {
				uni.setStorageSync('invite_code', data.id);
				this.params.invite_code = data.id
				this.disabled = true
			} else {
				this.disabled = false
			}
			if (data.unionid) {
				this.params.unionid = data.unionid
			}
		},
		onShow() {
			this.params.country_code = this.$store.state.areacode
		},
		methods: {
			// 看地址中有没有code参数,如果没有code参数的话则请求微信官方的接口并获取包含code的回调链接
			getWeChatCode() {
				//用于退出登录回来不会再调一次授权登录
				uni.setStorageSync('wechat_login_tag', 'true');
				
				return window.top.location.href = this.$myAppConfig.baseUrl + '/quick?invite_code=' + this.params.invite_code;
			},
			// 重定向回来本页面检查有没有code
			checkWeChatCode() {
				let code = this.getUrlCode('code');
				let invite_code = uni.getStorageSync('invite_code')
				if (code) {
					this.handleToLogin(code, invite_code)
				}
			},
			// 正则匹配请求地址中的参数函数
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
				[, ''
				])[1].replace(/\+/g, '%20')) || null
			},
			// 把后端需要的code以及其他信息调用接口传过去
			//比如调用接口loginIn
			handleToLogin(code, invite_code) {
				this.$u.api.regWechat({
					code: code,
					invite_code: invite_code
				}).then(res => {
					console.log(res);
					uni.hideLoading()
					if (res.data.token) {
						uni.setStorageSync('token', res.data.token);
						uni.switchTab({
							url: '/pages/tabbar/home/home'
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			isWechat() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/micromessenger/i) == 'micromessenger' || ua.indexOf('hbuilderx')!==-1) {
					this.Wechat = true;
					this.nowechat = false;
				} else {
					this.Wechat = false;
					this.nowechat = true;
				}
			},


			country() {
				uni.navigateTo({
					url: '../country/country'
				})
				this.params.country_code = this.$store.state.areacode
			},
			// changeNav(){
			// 	uni.setNavigationBarColor({
			// 		frontColor: this.getTextColor.toLowerCase() === '#ffffff'? '#ffffff' : '#000000',
			// 	  backgroundColor: 'rgba(255, 255, 255, 1)'
			// 	})
			// },
			inputDetails(event) {
				var value = event;
				if (!value || value == " ") {
					return '';
				}
				//匹配汉字的正则表达式
				const rule = /[^\u4E00-\u9FA5]/g; //如果你们需要字母或者数字，就改这儿！
				this.$nextTick(function() {
					this.yhkName = value.replace(rule, '');
				})
				console.log(this.yhkName === '');
			},
			// 立即注册
			register() {
				console.log(this.params);
				// // 当前国际区号是否中国
				if (this.$store.state.areacode == 86) {
					if (!this.$u.test.mobile(this.params.phone)) {
						this.$refs.uToast.show({
							// 请填写正确的账号
							title: this.i18n.login15,
							type: 'error'
						});
						return false;
					}
				} else {
					if (!this.params.phone) {
						this.$refs.uToast.show({
							// 请填写账号
							title: this.i18n.login16,
							type: 'error'
						});
						return false;
					}
				}
				if (this.yhkName != '') {
					this.$refs.uToast.show({
						// 请填写短信验证码
						title: '请输入正确的账号',
						type: 'error'
					});
					return false;
				}
				if (!this.params.sms_code) {
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
	.page {
		height: 100vh;
		background-size: 100% 100%;
	}

	.title {
		font-size: 30rpx;
		color: #9E9089;
		padding: 54rpx 0 0 64rpx;
	}

	.Head_image {
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
		padding-right: 20rpx !important;
		// margin: 48rpx 52rpx 0;		
		// background: #F3F1EE;
		border-radius: 50rpx;
	}

	.u_input1 {
		margin-top: 0;
		border: none;
		padding: 0 20rpx 0 0 !important;
	}

	.register-box {
		width: 100%;
		position: absolute;
		bottom: 10%;
	}

	.weChatRecharge {
		padding: 80rpx 20rpx;
		display: flex;
		justify-content: center;
	}

	.weChatRecharge-image {
		width: 120rpx;
		height: 120rpx;
	}
	.wechat-logo{
		margin-top: 200rpx;
	}
	.fun_flex {
		display: flex;
		justify-content: center;
		// margin: 36rpx 76rpx 112rpx;
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
		.iconsjh {
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

		.iconsjh {
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