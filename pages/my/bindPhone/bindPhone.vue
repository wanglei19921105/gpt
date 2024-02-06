<template>
	<view class="page" :class="getThemeClass">
		<!-- 手机号 -->
		<view class="title">手机号</view>
		<!-- 请填写您的真实姓名 -->
		<input class="myinput card-bg" v-model="params.phone" type="text" placeholder="请输入手机号"
			placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"/>
		<view class="input_flex card-bg">
		<!-- 请输入短信验证码 -->
		<u-input class="input_code" v-model="params.sms_code" :border="false" height="88"
			:placeholder="i18n.register4"  :placeholderStyle="`color: ${getTextPlaceholderColor}`" :customStyle="{color:'#ffffff'}" />
		<countdownP uniquekey="register" :phone="params.phone" :btnStyle="{backgroundColor:'transparent'}" type="1"
			:countryCode="toString($store.state.areacode)" >
		</countdownP>
		</view>
		<view class="title">登陆密码</view>
		<input class="myinput card-bg" v-model="params.pwd" type="password" placeholder="请输入登陆密码"
				placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"/>
		<view class="title">支付密码</view>
		<input class="myinput card-bg" v-model="params.paypwd" type="password" placeholder="请输入支付密码"
			placeholder-style="font-size:28rpx" @focus="topay" placeholder-class="text-placeholder"/>
		<!-- 立即绑定 -->
		<botBtnp style="margin-top: 200rpx;" btnText="立即绑定" @click="verifiedBtn"></botBtnp>
		<u-toast ref="uToast" />
		<paypass ref="yspay" @cancel="cancelpay" @submit="submitpay"></paypass>
	</view>
</template>
<script>
	import paypass from "@/components/ys-paypass/ys-paypass.vue";
	export default {
		components:{
			paypass
		},
		data() {
			return {
				params: {
					phone:'',
					pwd:'',
					paypwd:'',
					sms_code:'',
					bindPhone:1
				}
			};
		},
		onLoad(data) {
			if (data.token) {
				uni.setStorageSync('token', data.token)
			}
			//this.getUserinfo()
		},
		methods: {
			topay(){
				console.log(1)
				this.$refs.yspay.show();
			},
			cancelpay(){
				console.log('取消支付');
			},
			submitpay(ex){
				this.params.paypwd = ex.value
				console.log('支付密码为：'+ex.value);
			},
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
				if (!this.params.pwd) {
					this.$refs.uToast.show({
						title: '请填写登陆密码',
						type: 'error'
					});
					return false;
				}
				if (!this.params.paypwd) {
					this.$refs.uToast.show({
						title: '请填写支付密码',
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
							turation:2000,
							icon:"none"
						})
						uni.switchTab({
							url:'/pages/tabbar/home/home'
						})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: "none"
						})
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
