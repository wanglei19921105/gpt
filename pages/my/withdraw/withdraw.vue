<template>
	<view class="page" :class="getThemeClass">
		<view class="recharge_card card-bg flex align-center">
			<image src="../../../static/images/my/dark/USDT.png" mode="widthFix" class="logo"></image>
			<text class="size-30">USDT支付</text>
		</view>
		<view class="u-m-l-28 size-28">链名称</view>
		<view class="card-bg code_card text-content" style="width: 240rpx;">{{draw.usdt_network}}</view>
		<view class="u-m-l-28 size-28">提现地址</view>
		<view class="card-bg recharge_card">
			<input type="text" placeholder="请输入提现地址" class="size-24" v-model="params.usdt_address">
		</view>
		<view class="u-m-l-28 size-28">提现金额<text class="size-22">（最小提现金额：{{draw.draw_min}},最大提现金额{{draw.draw_max}}）</text> </view>
		<view class="card-bg recharge_card flex align-center">
			<image src="../../../static/images/my/dark/USDT.png" mode="widthFix" class="logo"></image>
			<input type="number" placeholder="请输入提现的USDT金额" class="size-24" v-model="params.draw_num">
		</view>
		<view class="u-m-l-28 size-24 text-content">*提现需要扣除提现金额的{{draw.draw_rate}}%作为手续费</view>
		<view class="submitBtn" style="margin-top: 100rpx;" @click="withdrawalBtn">确认提现</view>
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				draw:'',
				params:{
					draw_num:'',
					usdt_address:'',
					security:''
				},
				payStatus: {
					show: false
				},
				flag: false, //密码弹框 点击了立即支付后，变true
				status: false,
			};
		},
		computed: {
			setSecurity() {
				return this.$store.state.security
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../withdraw-record/withdraw-record'
			})
		},
		watch: {
			setSecurity(val) {
				console.log(val);
				this.params.security = val
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					this.submit()
				}
			},
		},
		onLoad() {
			this.walletShow()
		},
		methods: {
			submit(){
				this.$u.api.draw_usdt(this.params).then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							title:'提交成功，等待到账',
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1500)
					}else if(res.message=='请先实名认证'){
						setTimeout(()=>{
							uni.navigateTo({
								url:"../verified/verified"
							})
						},1500)
					}
				})
			},
			withdrawalBtn() { //确认提现
				if (Number(this.params.draw_num)  > Number(this.draw.draw_max) ) {
					this.$refs.uToast.show({
						// 超出最大提现金额
						title: this.i18n.withdraw7,
						type: 'error',
					})
					return false
				}else if (Number(this.params.draw_num) < Number(this.draw.draw_min)){
					this.$refs.uToast.show({
						// 低于最少金额
						title: this.i18n.withdraw8+this.draw.draw_min,
						type: 'error',
					})
					return false
				}
				this.payStatus.show = true
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				this.flag = true
				if (i) {
					this.status = true
				} else {
					this.status = false
				}
			},
			walletShow() {
				this.$u.api.wallet_show().then(res => {
					if (res.code == 200) {
						this.draw = res.data.draw
					}
				}).catch(err => {
			
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.submitBtn{
		width: 646rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #2283EC;
		color: #FFFFFF;
		margin: 0 auto;
		text-align: center;
		line-height: 100rpx;
	}
	.code_card{
		margin: 28rpx;
		padding: 26rpx 36rpx;
		border-radius: 20rpx;
		width: 280rpx;
		image{width: 210rpx;border-radius: 10rpx;}
	}
	.recharge_card{
		margin: 28rpx;
		padding: 26rpx 36rpx;
		border-radius: 50rpx;
		.logo{width: 40rpx;border-radius: 10rpx;margin-right: 18rpx;}
	}
</style>
