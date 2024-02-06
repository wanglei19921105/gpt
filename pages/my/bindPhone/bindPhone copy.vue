<template>
	<view class="page" :class="getThemeClass">
		<!-- 手机号 -->
		<view class="title">手机号</view>
		<!-- 请填写您的真实姓名 -->
		<input class="myinput card-bg" v-model="params.phone" type="text" placeholder="请输入手机号"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"/>
		<!-- 验证码 -->
		<view class="title">验证码</view>
		<!-- 请填写您的身份证号 -->
		<view class="input_flex card-bg">
		<!-- 请输入短信验证码 -->
		<u-input class="input_code" v-model="params.sms_code" :border="false" height="88"
			:placeholder="i18n.register4"  :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color:'#ffffff'}" />
		<countdownP uniquekey="register" :phone="params.phone" :btnStyle="{backgroundColor:'transparent'}" type="1"
			:countryCode="toString($store.state.areacode)" :bindPhone="bindPhone">
		</countdownP>
		</view>
		<!-- 立即绑定 -->
		<botBtnp style="margin-top: 200rpx;" btnText="立即绑定" @click="verifiedBtn"></botBtnp>
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					phone:'',
					sms_code:''
				},
				bindPhone:1
			};
		},
		onLoad() {
			this.getUserinfo()
		},
		methods: {
			getUserinfo() { //我的(首页)--接口
				this.$u.api.center_index().then(res => {
				}).catch(err => {})
			},
			verifiedBtn() {
				if (!this.params.phone) {
					this.$refs.uToast.show({
						// 请填写手机号
						title: '请填写手机号',
						type: 'error'
					});
					return false;
				}
				if (!this.$u.test.mobile(this.params.phone)) {
					this.$refs.uToast.show({
						// 请填写正确的手机号
						title: '请填写正确的手机号',
						type: 'error'
					});
					return false;
				}
				if (!this.params.sms_code) {
					this.$refs.uToast.show({
						// 请填写短信验证码
						title: '请填写短信验证码',
						type: 'error'
					});
					return false;
				}
				this.$u.api.phone_make(this.params).then(res => {
					if(res.code==200){
						uni.showToast({
							title:"绑定成功",
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>

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

	.input_pla {
		// color: #AAAAAA;
		font-size: 28rpx;
	}
	.input_flex {
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		padding:5rpx 30rpx;
		// border-bottom: 1rpx solid #BFCBCB;
		margin: 0 30rpx 48rpx;
		.iconsjh{
			width: 40rpx;
			height: 40rpx;
			display: block;
			margin-left: 48rpx;
		}
		.input_code {
			padding: 0 20rpx 0 0 !important;
			flex: 2;
		}
	}
</style>
