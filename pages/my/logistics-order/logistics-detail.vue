<template>
	<view class="page" :class="getThemeClass">
		<view class="logis-detail">
			<view class="main-card">
				<view class="font-28">
					<text class="u-m-r-60">{{address[0]}}</text>
					<text>{{address[1]}}</text>
				</view>
				<view class="font-24 text-content u-m-t-24">{{address[2]}}{{address[3]}}</view>
			</view>
			<view class="main-card u-m-t-30">
				<view class="flex">
					<image :src="info.cover" mode="aspectFill" class="logis-cover flex-shink u-m-r-30"></image>
					<view class="flex-1 logis-cont flex flex-direction justify-between">
						<view class="flex justify-between align-center">
							<view class="line-1 font-30 text-bold" style="width: 350rpx;">{{info.title}}</view>
							<view class="font-26 text-tips">x 1</view>
						</view>
						<view class="font-32">{{info.total}}USDT</view>
					</view>
				</view>
<!--				<view class="flex justify-between align-center font-26 u-m-t-50">-->
<!--					<view class="text-tips">作者</view>-->
<!--					<view class="flex align-center">-->
<!--						<image :src="info.authors.avatar" mode="aspectFill" class="logis-avatar u-m-r-12"></image>-->
<!--						<view class="">{{info.authors.nickname}}</view>-->
<!--					</view>-->
<!--				</view>-->
				<view class="flex justify-between align-center font-26 u-m-t-50">
					<view class="text-tips">订单编号</view>
					<view class="flex align-center" @click="copy(info.out_trade_no)">
						<view class="u-m-r-12">{{info.out_trade_no}}</view>
						<u-icon name="attach"></u-icon>
					</view>
				</view>
				<view class="flex justify-between align-center font-26 u-m-t-50">
					<view class="text-tips">创建时间</view>
					<view class="u-m-r-12">{{info.created_at}}</view>
				</view>
				<view class="flex justify-between align-center font-26 u-m-t-50">
					<view class="text-tips">发货时间</view>
					<view class="u-m-r-12">{{info.deliver_at}}</view>
				</view>
				<view class="flex justify-between align-center font-26 u-m-t-50">
					<view class="text-tips">物流平台</view>
					<view class="u-m-r-12">{{info.deliver_express}}</view>
				</view>
				<view class="flex justify-between align-center font-26 u-m-t-50">
					<view class="text-tips">物流单号</view>
					<view class="flex align-center" @click="copy(info.deliver_number)">
						<view class="u-m-r-12">{{info.deliver_number}}</view>
						<u-icon name="attach"></u-icon>
					</view>
				</view>
				<view class="flex justify-between align-center font-26 u-m-t-50">
					<view class="text-tips">收货时间</view>
					<view class="u-m-r-12">{{info.finish_at}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				info:{
					authors: {}
				},
				address:[]
			}
		},
		onLoad(data) {
			this.id = data.id
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.myOrders_detail({
					id: this.id
				}).then(res=>{
					this.info = res.data.info
					this.address = res.data.info.address_info.split('-')
				})
			},
			copy(data){
				uni.setClipboardData({
					data
				})
			}
		}
	}
</script>

<style lang="scss">
	.logis-detail{
		padding: 30rpx 28rpx 0 28rpx;
		.logis-cover{
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
		}
		.logis-cont{
			height: 160rpx;
			padding: 20rpx 0;
		}
		.logis-avatar{
			width: 36rpx;
			height: 36rpx;
			border-radius: 50%;
		}
	}
</style>
