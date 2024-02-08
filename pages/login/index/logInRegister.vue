<template>
	<view class="page light-bg-f" :style="{backgroundColor:getBgColor}" :class="getThemeClass">

    <view class="top MarginT_30rpx Width100" @click="returnPage">
      <u-icon name="arrow-left" style="margin-left: 30rpx;" color="#ffffff" size="36"></u-icon>
    </view>

    <view class="Width100 TextCenter LogoBox">
      <image :src="$.imgSrc + '/logo1.png'" mode="aspectFit" class="Logo InlineBlock"></image>
      <text class="Block FontS_28rpx Color_FFFFFF MarginT_44rpx">欢迎加入，造福全人类的AGI</text>
    </view>
    <view class="InputBox MarginAuto MarginT_64rpx">
      <text class="Block FontS_32rpx Color_FFFFFF">手机号</text>
      <view class="Input MarginT_16rpx">
        <input type="text" v-model="params.phone" @input="inputDetails" placeholder="请输入手机号" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx">
        <view class="BG1"></view>
      </view>
    </view>
    <view class="InputBox MarginAuto MarginT_64rpx">
      <text class="Block FontS_32rpx Color_FFFFFF">验证码</text>
      <view class="Input MarginT_16rpx">
        <input type="text" placeholder="请输入短信验证码" v-model="params.sms_code" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx FloatL">
        <countdownP :btnStyle="{backgroundColor: getCardColor,color:getTextColor}" uniquekey="register"
                    :phone="params.phone" type="1" :countryCode="toString($store.state.areacode)">
        </countdownP>
<!--        <text class="Block FloatR FontS_28rpx Color_FFFFFF">获取验证码</text>-->
        <view class="ClearB"></view>
        <view class="BG1"></view>
      </view>
    </view>
    <view class="InputBox MarginAuto MarginT_48rpx">
      <text class="Block FontS_32rpx Color_FFFFFF">设置登录密码</text>
      <view class="Input MarginT_16rpx">
        <input v-show="isShowPsw" type="text" v-model="params.password" placeholder="请设置8-16位的密码字母加数字" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx FloatL">
        <input v-show="!isShowPsw" type="password" v-model="params.password" placeholder="请设置8-16位的密码字母加数字" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx FloatL">
        <image @click="showPsw" v-show="isShowPsw" :src="$.imgSrc + '/images/showpsw1.png'" mode="aspectFit" class="Icon FloatR"></image>
        <image @click="showPsw" v-show="!isShowPsw" :src="$.imgSrc + '/images/hidepsw1.png'" mode="aspectFit" class="Icon FloatR"></image>
        <view class="ClearB"></view>
        <view class="BG1"></view>
      </view>
    </view>
    <view class="InputBox MarginAuto MarginT_48rpx">
      <text class="Block FontS_32rpx Color_FFFFFF">设置支付密码</text>
      <view class="Input MarginT_16rpx">
        <input v-show="isShowPswPay" v-model="params.security" type="number" placeholder="请设置6位数字的支付密码" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx FloatL">
        <input v-show="!isShowPswPay" v-model="params.security" type="password" placeholder="请设置6位数字的支付密码" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx FloatL">
        <image @click="showPswPay" v-show="isShowPswPay" :src="$.imgSrc + '/images/showpsw1.png'" mode="aspectFit" class="Icon FloatR"></image>
        <image @click="showPswPay" v-show="!isShowPswPay" :src="$.imgSrc + '/images/hidepsw1.png'" mode="aspectFit" class="Icon FloatR"></image>
        <view class="ClearB"></view>
        <view class="BG1"></view>
      </view>
    </view>
    <view class="InputBox MarginAuto MarginT_48rpx">
      <text class="Block FontS_32rpx Color_FFFFFF">邀请码</text>
      <view class="Input MarginT_16rpx">
        <input type="text" v-model="params.invite_code" placeholder="请输入您的邀请码" class="Height100 FontS_28rpx Color_FFFFFF PaddingB_32rpx FloatL">
        <view class="ClearB"></view>
        <view class="BG1"></view>
      </view>
    </view>
    <view class="footer_protocol MarginT_20rpx">
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
    <view class="BtnBox Width100 TextCenter MarginT_52rpx">
      <view class="Btn InlineBlock TextCenter" :style="bgUrl1" @click="register">
        <text class="Block Color_0A1136 FontS_32rpx FontBold">注册</text>
      </view>
    </view>
    <view class="InputBox PaddingB_80rpx MarginAuto MarginT_24rpx TextCenter" @click="skipPage('/pages/login/index/logInMain')">
      <text class="Block Color_FFFFFF FontS_28rpx">已有账号 快去登录</text>
    </view>


    <!-- #ifdef APP-PLUS -->
    <view class="text-center padding-lr margin-bottom">
      <view class="flex quicklogin">
        <view class="flex-sub quick-item" @click="WXlogin()">
          <view class="quick-weixin">
            <text class="ifont icon-weixin"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view v-if="inWechat" class="Wechat PaddingB_80rpx MarginT_10rpx Width100 TextCenter" @click="h5login()">
      <image :src="$.imgSrc + '/images/wechat1.png'" mode="aspectFit" class="Block MarginAuto"></image>
      <text class="Block Color_FFFFFF FontS_28rpx TextCenter MarginT_16rpx">微信一键登录</text>
    </view>
    <!-- #endif -->
		<!-- <unavbar></unavbar> -->
		<!-- 注册GPTAPP -->
		<!-- <view class="title text-main">{{i18n.register1}}</view> -->
		<!-- 快速注册GPTAPP -->
		<!-- <view class="title_h1">{{i18n.register2}}</view> -->
		<!-- 头像框 -->

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
        checked: false,
        inWechat:false,
        yhkName: '',
				params: {
					country_code: '',
					phone: '',
					sms_code: '',
					password: '',
					security: '',
					invite_code: '',
					unionid: ''
				},
				$: this.$,
        Wechat: false,
        isShowPsw: false,
        isShowPswPay: false,
				nowechat: true,
				show: false,
				disabled: false,
				radius: '50rpx',
        bgUrl1: '',
				imgUrl: require('../../../static/images/Logonbg.png'),
			};
		},
		onLoad(data) {
      // #ifdef APP-PLUS
      this.system = plus.os.name
      // #endif
      // 获取 User Agent
      let userAgent = navigator.userAgent.toLowerCase();

      // 判断是否在微信中打开
      if (userAgent.indexOf('micromessenger') !== -1 || userAgent.indexOf('hbuilderx')!==-1) {
        this.inWechat = true;
      }
			const hasWechatLogin = uni.getStorageSync('wechat_login_tag') || null;

			if (hasWechatLogin) {
				this.checkWeChatCode();
			}
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
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/denglu_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.params.country_code = this.$store.state.areacode
		},
		methods: {
      // 勾选同意 用户协议/隐私政策
      checkedCli() {
        if (!this.checked) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      returnPage(){
        this.$.back()
      },
      showPsw(){
        this.isShowPsw = !this.isShowPsw
      },
      showPswPay(){
        this.isShowPswPay = !this.isShowPswPay
      },
      skipPage(url){
        this.$.open(url)
      },
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
        // invite_code:uni.getStorageSync('invite_code') ? uni.getStorageSync('invite_code') : '',
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

        if (!this.checked) {
          this.$refs.uToast.show({
            // 请勾选已阅读用户协议及隐私政策
            title: this.i18n.login18,
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
.Other{
  width: calc(100% - 168rpx);
  margin-top: 136rpx;
  .Line1{
    width: calc(50% - 100rpx);
    height: 2rpx;
    background:linear-gradient(to right, rgba(159,159,159,0.1), rgba(159,159,159,0.25), rgba(159,159,159,0.5), rgba(159,159,159,0.75), rgba(159,159,159,1));
  }
  .Line2{
    width: calc(50% - 100rpx);
    height: 2rpx;
    background:linear-gradient(to right, rgba(159,159,159,1), rgba(159,159,159,0.75), rgba(159,159,159,0.5), rgba(159,159,159,0.25), rgba(159,159,159,0.1));
  }
}
.Wechat{
  image{
    width: 80rpx;
    height: 80rpx;
  }
}
.Other{
  width: calc(100% - 168rpx);
  margin-top: 136rpx;
  .Line1{
    width: calc(50% - 100rpx);
    height: 2rpx;
    background:linear-gradient(to right, rgba(159,159,159,0.1), rgba(159,159,159,0.25), rgba(159,159,159,0.5), rgba(159,159,159,0.75), rgba(159,159,159,1));
  }
  .Line2{
    width: calc(50% - 100rpx);
    height: 2rpx;
    background:linear-gradient(to right, rgba(159,159,159,1), rgba(159,159,159,0.75), rgba(159,159,159,0.5), rgba(159,159,159,0.25), rgba(159,159,159,0.1));
  }
}
.InputBox{
  width: calc(100% - 154rpx);
  .Input{
    /deep/.get_code{
      background-color: transparent!important;
      color: #FFFFFF!important;
      line-height: 30rpx;
      height: 30rpx;
    }
    .Icon{
      width: 36rpx;
      height: 36rpx;
    }
    input{
      width: calc(100% - 200rpx);
      background: transparent!important;
    }
  }
}
.BG1{
  width: 100%;
  height: 2rpx;
  background:linear-gradient(to right, rgba(159,159,159,0.25), rgba(159,159,159,0.25), rgba(159,159,159,0.5), rgba(159,159,159,0.25), rgba(159,159,159,0.25));
}
.LogoBox{
  margin-top: 76rpx;
  image{
    width: 175rpx;
    height: 175rpx;
  }
}
.BtnBox{
  .Btn{
    width: 558rpx;
    height: 92rpx;
    text{
      line-height: 92rpx;
    }
  }
}

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
