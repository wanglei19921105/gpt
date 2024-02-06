<template>
	<view :class="getThemeClass">
		<u-popup 
			v-model="popupData.show" 
			mode="center" 
			border-radius="20" 
			width="596rpx" 
			height="504rpx"
			:closeable="true" 
			:close-icon-color="getTextContentColor" 
			@close="close" 
			@open="open" 
			:mask-close-able="false" 
		>
			<!-- 安全密码 -->
			<view class="popup_title">
				安全密码
			</view>
			<input class="popup_input text-main" v-model="password" type="password" placeholder="请输入您的安全密码"
				:placeholder-style="`color: ${getTextPlaceholderColor}`" />
			<botBtn padding="20rpx 80rpx" radius="50rpx" @tap="$u.throttle(goOrder(popupData.url), 1000)">确定</botBtn>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		props: {
			stauts: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		name: "pswd-pay",
		data() {
			return {
				password: '',
				popupData: {}
			};
		},
		watch: {
			stauts: {
				handler(newVal) {
					this.popupData = newVal
				},
				deep: true,
				immediate: true
			},
			// 监听密码输入
			password(newVal){
				this.$store.commit('setSecurity', newVal)
			}
		},
		methods: {
			//立即支付
			goOrder(i) {
				// 判断为空
				if (!this.password) {
					this.$refs.uToast.show({
						title: '请输入密码',
						type: 'warning'
					});
					return false;
				}
				this.$emit('status',true)
				setTimeout(()=>{
					this.popupData.show = false
				},100)
				
				
				if (i == 1) {
					uni.navigateTo({
						url: '/pages/frontPage/order-def/order-def'
					})
					this.popupData.show = false
				}
				// 2.跳转NFT商品详情-已售罄
				if (i == 2) {
					this.openWin('/pages/market/casting-buy/casting-buy?go=' + 2)
					this.popupData.show = false
				}
				// 跳转NFT铸造支付页面
				if (i == 3) {
					this.openWin('/pages/casting/casting-pay/casting-pay')
					this.popupData.show = false
				}
			},
			// 监听弹窗关闭
			close() {
				this.$emit('closeMain', this.popupData.show)
				setTimeout(()=>{
					this.password = ''
					this.$emit('status',false)
				},200)
			},
			// 监听弹窗打开
			open(){
				// this.password = ''
				this.$emit('open', this.popupData.show)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		/deep/.u-mode-center-box {
			// background-color: #303131;
			background-color: #1E1E1E;
		}

		.popup_title {
			color: #FFFFFF;
		}

		.popup_input {
			background-color: #263856;
			// color: #FFFFFF;
		}

		// .pay_btn {
		// 	background-color: #F7924C;
		// }
	}

	.popup_title {
		height: 128rpx;
		border-bottom: 1px solid #E9EEF3;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		color: #343434;
		font-weight: bold;
	}

	/deep/.u-close--top-right {
		top: 26px;
		right: 18px;
	}

	.popup_input {
		background-color: #F5F5F5;
		margin: 64rpx 34rpx;
		height: 94rpx;
		border-radius: 8rpx;
		text-indent: 30rpx;
		font-size: 30rpx;
	}

	.pay_btn {
		height: 82rpx;
		margin: 0 164rpx;
		background-color: #764E39;
		line-height: 82rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #fff;
		font-size: 30rpx;
	}
</style>
