<template>
	<view>
		<view class="captcha card-bg" :style="boxStyle" :class="getThemeClass">
			<input class="myinput text-main" :style="iptstyle" type="text" :placeholder="placeholder" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder"
				v-model="sms_code" />
			<view class="color-main" :style="Vcstyle" @tap="getCode">{{tips}}</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"
			:keep-running="true" :unique-key="uniquekey">
		</u-verification-code>
		<u-loading class="uloading" mode="circle" :show="show"></u-loading>
		<u-popup v-model="show1" mode="center" border-radius="20" width="690rpx" height="">
			<view class="text-center padding-32 card-bg">
				<image :src="img" mode="" style="width: 480rpx; height: 144rpx;"></image>
				<!-- <image src="../static/images/box2.png" mode=""></image> -->
				<view class="padding-32">
					<input type="text" name="" id="" v-model="sum" style="height: 50rpx;font-size: 50rpx;border-bottom: 1rpx solid #666;letter-spacing:20rpx;">
				</view>
				<u-button @click="go" class="sumbtn color-main card-bg">提交</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "countdown",
		props: {
			placeholder: {
				type: String,
				default: () => {
					return '请输入您的验证码'
				}
			},
			uniquekey: {
				type: String,
				default: () => {
					return ''
				}
			},
			smsType: {
				type: String,
				default: () => {
					return ''
				}
			},
			phone: {
				type: String,
				default: () => {
					return ''
				}
			},
			type: {
				type: Number,
				default: () => {
					return 1
				}
			},
			email: {
				type: String,
				default: () => {
					return ''
				}
			},
			iptstyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			Vcstyle:{
				type:Object,
				default: () => {
					return {}
				}
			},
			boxStyle:{
				type:Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				params: {
					phone: '',
					type: 1,
					country_code: ''
				},
				tips: '',
				seconds: 60,
				sms_code: '',
				show: false,
				show1:false,
				img:'',
				sum:'',
				sumkey:''
			};
		},
		watch: {
			sms_code(newVal) { //监听验证码输入，实时传入vuex
				this.$store.commit('setSmscode', newVal)
				this.sms_code = newVal
			},
			phone:{
				handler(newVal){
					this.params.phone = newVal
					console.log(newVal);
				},
				immediate: true,
				deep:true
			}
		},
		computed: {
			phoneNum() {
				return this.phone
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			go(){
				this.$u.api.send_code({
					phone: this.params.phone,
					type: this.smsType,
					captcha:this.sum,
					key:this.sumkey,
					country_code: '+' + this.$store.state.areacode
				}).then(res=>{
					// this.show1 = false
					this.show = true
					if(res.code == 200){
						setTimeout(() => {
							uni.hideLoading();
							this.show = false
							this.show1 = false
							this.$u.toast(this.i18n.register12);
							this.$refs.uCode.start();
						}, 2000);
					}
				})
				setTimeout(() => {
					uni.hideLoading();
					this.show = false
					this.show1 = false
				}, 2000);
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					// type = 1是手机号验证码，默认是1
					// type = 2是邮箱验证码
					if (this.type === 1) {
						this.$u.api.send_code({
							'phone': this.params.phone,
							'type': this.smsType
						}).then(res => {
           		this.show = true;
							if (res.code == 200) {
								setTimeout(() => {
									uni.hideLoading();
                	this.show = false;
									this.$u.toast('验证码已发送');
									this.$refs.uCode.start();
								}, 2000);
							}
						}).catch(err => {})
						// this.$u.api.captcha().then(res => {
						// 	console.log(res.data.captcha);
						// 	this.show1 = true
						// 	this.img = res.data.captcha.img
						// 	this.sumkey = res.data.captcha.key
						// })
						// this.show = true
					}

					if (this.type === 2) {
						this.$u.api.send_email_code({
							'email': this.email,
							'type': "1"
						}).then(res => {
							if (res.code == 200) {
								setTimeout(() => {
									uni.hideLoading();
									// 这里此提示会被this.start()方法中的提示覆盖
									this.$u.toast('验证码已发送');
									// 通知验证码组件内部开始倒计时
									this.$refs.uCode.start();
								}, 2000);
							}
						}).catch(err => {})
					}

				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .page-black {
	// 	background-color: #292B2B !important;
	// 	color: #F7924C !important;

	// 	.myinput {
	// 		color: #FFFFFF !important;
	// 	}

	// }

	.captcha {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 34rpx;
		// color: #764E39;
		font-size: 28rpx;
		border-radius: 20rpx;
		// background-color: #fff;

		.myinput {
			margin: 0;
			flex: 1;
			// color: #333;
		}
	}

	.input_pla {
		// color: #AAAAAA;
		font-size: 28rpx;
	}
	
	.get_code {
		height: 106rpx;
		line-height: 106rpx;
		// background-color: #fff;
		border: 1px solid;
		text-align: center !important;
		margin-left: 30rpx;
		flex: 1;
		font-size: 30rpx;
		// color: #E6BB81;
	}
	
	uni-button:after {
		border: none;
	}
	
	.uloading {
		position: absolute;
		left: 50%;
		top: 50%;
	}
	.sumbtn{
		// background-color: #E6BB81;
	}
</style>
