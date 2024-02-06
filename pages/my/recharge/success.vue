<template>
	<view class="page" :class="getThemeClass">
		<view class="gap-100"></view>
		<view class="text-center">
			<image src="../../../static/images/recharge-success.png" class="recharge-successimg"></image>
			<view class="u-font-36 text-bold u-m-t-20">我已支付，等待到账</view>
		</view>
		<view class="recharge-successbtn bg-cayn text-default" @click="back">返回钱包</view>
		<view class="recharge-successbtn1 card-bg" @click="$u.route('/pages/my/contact/contact')">联系客服</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.recharge-successimg{
		width: 120rpx;
		height: 120rpx;
	}
	.recharge-successbtn{
		width: 646rpx;
		height: 100rpx;
		margin: 80rpx 52rpx 24rpx 52rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
	}
	.recharge-successbtn1{
		width: 646rpx;
		height: 100rpx;
		margin: 0 52rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
	}
</style>