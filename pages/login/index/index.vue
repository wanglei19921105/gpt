<template>
	<view class="page" :style="{backgroundColor:getBgColor}" :class="getThemeClass">
		<!-- <view class="" :style="{height: `${navHeight}px`}"></view> -->
		<!-- 登录GPTAPP -->
		<!-- <view class="title text-main">{{i18n.login1}}</view> -->
		<!-- 欢迎使用GPTAPP -->
		<!-- <view class="title_h1">{{i18n.login2}}</view> -->
		<!-- 头像框 -->
		<view class="text-center">
			<image src="../../../static/logo.png" mode="" class="Head_image"></image>
		</view>
		<view class="title_h1" :style="{color: getTextColor}">终于等到你，马上登录</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<!-- <text @click="openWin('../country/country')">+{{this.$store.state.areacode}}</text> -->
			<!-- 请输入账号 -->
			<image src="../../../static/images/sjh.png" mode="" class="iconsjh"></image>
			<u-input class="u_input1 text-main"  v-model="params.login_account" type="text" :border="false" height="88"
				placeholder="请输入登录的手机号" :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}" /><!-- @input="inputDetails" -->
		</view>
		<view class="input_num border-color" :style="{backgroundColor:getCardColor}">
			<image src="../../../static/images/mima.png" mode="" class="iconsjh"></image>
			<u-input class="u_input border-color text-main" v-model="params.password" type="password" :border="false" height="88"
				:placeholder="i18n.login4"  :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color: getTextColor}"/>
		</view>
		<view class="fun_flex text-tips">
			<!-- <view @click="openWin('../register/register')">{{i18n.login6}}</view> -->
<!--			<view @click="openWin('../index/logInRegister')">去注册</view>-->
			<view @click="openWin('../../my/revise-pwd/revise-pwd')">{{i18n.login8}}</view>
			<!-- <view @click="openWin('../../login/fastLogin/fastLogin')">验证码登录</view> -->
		</view>
		<!-- 登录 -->
		<botBtn
			:btnText="i18n.login7"
			:radius="radius"
			@click="login"
			padding="25rpx 280rpx"
		></botBtn>
		<view class="u-m-b-30"></view>
		<!-- #ifdef APP-PLUS -->
			<botBtn
				btnText="微信一键登录"
				:radius="radius"
				@click="WXlogin"
				padding="25rpx 250rpx"
			></botBtn>
		<!-- #endif -->

		<!-- 忘记密码 -->
		<!-- 第三方授权登录 -->
		<view class="authorize_title">
			<!-- <view @click="openWin('../../my/revise-pwd/revise-pwd')">忘记密码？</view> -->
			<!-- <view class="line line_left"></view>
			{{i18n.login9}}
			<view class="line line_right"></view> -->
		</view>
		<!-- 微博登录 -->
		<!-- <view class="weibo_login">
			<image class="weibo_img" src="../../../static/images/weibo.png" mode="widthFix" @click="weiboLogin"></image>

			<view class="weibo_text">{{i18n.login10}}</view>
		</view> -->
		<!-- #ifdef H5 -->
		<view class="text-center padding-lr margin-bottom" v-if="inWechat">
			<view class="flex quicklogin">
				<view class="flex-sub quick-item" @click="h5login()">
					<view class="quick-weixin">
						<text class="ifont icon-weixin"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->
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
			<view class="color_ash text-content">{{i18n.login14}}</view>
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
					password: ''
				},
				checked: false,
				navHeight: 0,
				inWechat:false,
				radius:'50rpx',
				// imgUrl:require('../../../static/images/Loginbg.png')
				// show: true
				system: 'Android',
			};
		},
		onShow() {
			this.navHeight = uni.getSystemInfoSync().windowTop
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.system = plus.os.name
			// #endif
			// 获取 User Agent
			let userAgent = navigator.userAgent.toLowerCase();

			// 判断是否在微信中打开
			if (userAgent.indexOf('micromessenger') !== -1 || userAgent.indexOf('hbuilderx')!==-1) {
			    this.inWechat = true;
			}
		},
		methods: {
			WXlogin(){
				if (!this.checked) {
					this.$refs.uToast.show({
						// 请勾选已阅读用户协议及隐私政策
						title: this.i18n.login18,
						type: 'error'
					});
					return false;
				}
				let thit = this;
				uni.showLoading({
					title: '请稍后...'
				})
				uni.login({
					provider:'weixin',
					success:(res)=>{
						console.log(res);
						thit.$u.api.loginWechat({
							accessToken:res.authResult.access_token,
							openId:res.authResult.openid
						}).then(res=>{
							console.log(res);
							uni.hideLoading()
							if (res.data.token) {
								uni.setStorageSync('token', res.data.token);
								setTimeout(() => {
									uni.switchTab({
										url:'/pages/tabbar/home/home'
									})
								}, 1000)
							} else{
								uni.showToast({
									title: '请绑定手机号',
									icon: "none"
								})
								uni.navigateTo({
									// url:'/pages/login/index/logInRegister?unionid=' + res.data.info
                  url:'/pages/login/index/logInMain?unionid=' + res.data.info
								})
							}
						})
					},
					fail:(res)=>{
						console.log(res);
					}
				})
			},
			autoLogin() {
				if (Boolean(uni.getStorageSync("userpwd"))) {
					const userpwd = uni.getStorageSync("userpwd")
					this.params = JSON.parse(userpwd)
					this.login()
				}
			},
			h5login(){
				if (!this.checked) {
					this.$refs.uToast.show({
						// 请勾选已阅读用户协议及隐私政策
						title: this.i18n.login18,
						type: 'error'
					});
					return false;
				}
				let redirect = this.$myAppConfig.baseUrl + '/quick';
				let invite_code = uni.getStorageSync('invite_code');
				if(invite_code){
					redirect += '?invite_code=' + invite_code;
				}
				window.top.location.href = redirect;
			},
			inputDetails(event){
				var value = event;
				if(!value || value == " "){
				return '';
				}
			//匹配汉字的正则表达式
				const rule = /[\W]/g;//如果你们需要字母或者数字，就改这儿！
				this.$nextTick(function () {
				this.params.login_account = value.replace(rule,'');
				})
			},
			// 勾选同意 用户协议/隐私政策
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
				if (!this.params.password) {
					this.$refs.uToast.show({
						// 请填写密码
						title: this.i18n.login17,
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

				// 设置语言 1.中文 2.英文
				this.$store.commit('SetLang', '1');

				this.$u.api.login_make(this.params).then(res => {
					if (res.code == 200) {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('userpwd', JSON.stringify(this.params))
						uni.setStorageSync('usr', JSON.stringify({
							id: res.data.user.id,
							mobile: this.params.login_account,
							name: res.data.user.nickname,
							avatar: res.data.user.avatar,
						}))
						this.changeAccount({
							id: res.data.user.id,
							mobile: this.params.login_account,
							name: res.data.user.nickname,
							avatar: res.data.user.avatar,
							password: this.params.password,
						})
						uni.setStorageSync('id', res.data.user.id)

						// app.initNim({ account: res1.imAccid, token: res1.imToken })//im登录


						this.getImToken()
					}
				})
			},
			getImToken(){
				this.$u.api.imToken({
					platform: 5
				}).then(res=>{
					uni.setStorageSync('openImToken',res.data.info.token)
					uni.setStorageSync('openImUserid',res.data.info.userID)
					this.$refs.uToast.show({
						title: this.i18n.login19,
						type: 'success',
						duration: 1000,
					});
					setTimeout(() => {
						uni.switchTab({
							url: '../../tabbar/home/home'
						})
					}, 1000)
					this.$im.initIm()
				})
			},
			// 微博登录
			weiboLogin() {
				// uni.request({
				// 	url:'https://api.weibo.com/oauth2/authorize',
				// 	data:{
				// 		'client_id':'1500590007',
				// 		'redirect_uri': uni.$myAppConfig.baseUrl,
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 	},
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
				let url =
					`https://api.weibo.com/oauth2/authorize?client_id=1500590007&response_type=code&redirect_uri=${uni.$myAppConfig.baseUrl}/wap`;
				window.location.href = url
			}

		}
	}
</script>

<style lang="scss" scoped>

	.page{
		height: 100vh;
		background-size: 100% 100%;
	}

	.box {
		padding-bottom: 20rpx;
	}
	.text-center {
		text-align: center;
	}
	.padding-top {
		padding-top: 30upx;
	}
	.padding-lr {
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.margin-bottom{
		margin-bottom: 30upx;
	}
	.flex {
		display: flex;
	}
	.flex-sub {
		flex: 1;
	}
	.ifont{width: 100upx; height: 100upx; font-size: 100upx; line-height: 100upx;}
	.quicklogin{padding-left: 100upx; padding-right: 100upx;}


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
		margin: 32rpx auto 119rpx;
	}

	.u_input {
		// margin: 48rpx 52rpx 0;
		// background: #F3F1EE;
		padding: 0rpx 20rpx 0rpx 0rpx !important;
		border-radius: 50rpx;
	}

	.u_input1 {
		margin-top: 0;
		border: none;
		padding: 0 20rpx 0 0rpx !important;
	}

	.fun_flex {
		display: flex;
		justify-content: space-between;
		margin: 36rpx 76rpx 112rpx;
		// color: #764E39;
		font-size: 26rpx;
	}
	.input_num {
		margin: 48rpx 52rpx 0 52rpx;
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

	.forget_pwd {
		text-align: right;
		margin-right: 80rpx;
		margin-top: 20rpx;
	}

	.authorize_title {
		display: flex;
		justify-content: center;
		// color: #666666;
		font-size: 24rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		align-items: center;

		.line {
			width: 54rpx;
			height: 2rpx;
			margin: 0 24rpx;
		}

		// .line_left {
		// 	background: linear-gradient(-90deg, #E6BB81 0%, #FFFFFF 100%);
		// }

		// .line_right {
		// 	background: linear-gradient(90deg, #E6BB81 0%, #FFFFFF 100%);
		// }
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
			// color: #333333;
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
</style>
