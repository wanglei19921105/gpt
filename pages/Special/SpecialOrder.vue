<template>
	<view class="page" :class="getThemeClass">
		<!-- 商品展示 -->
		<view class="compound-card card-bg" v-for="(item,index) in list" :key="index">
			<view class="size-24 text-content u-p-b-20 border-bottom u-m-b-20">下单时间：{{item.created_at}}</view>
			<view class="flex">
				<image :src="item.cover" mode="aspectFill" class="compound-img"></image>
				<view class="u-m-l-20" style="flex: 1;">
					<view class="size-32 text-bold text-main u-m-b-10">{{item.title}}</view>
					<view class="flex u-m-b-20">
						<view class="time">冻结期:{{item.sale_expire}}天</view>
						<view class="time u-m-l-20">回报率:{{item.rate_return}}%</view>
					</view>
					<view class="flex justify-between align-center">
						<view style="color: #E21362;">
							<text class="size-44 text-bold">{{item.price}}</text>
							<text>USDT</text>
						</view>
						<view class="size-20 text-content">x{{item.sale_num}}</view>
					</view>
				</view>
			</view>
			<view class="compound-card-content">
				<view class="flex align-center justify-between size-24 text-content u-m-b-16">
					<view class="">订单编号：</view>
					<view class="">{{item.out_trade_no}}</view>
				</view>
				<view class="flex align-center justify-between size-24 text-content u-m-b-16">
					<view class="">待解冻时间：</view>
					<view class="">{{item.thawing_time}}</view>
				</view>
				<view class="flex align-center justify-between size-24 text-content">
					<view class="">预期收益：</view>
					<view style="color: #E21362;">
						<text class="size-30 text-bold">{{item.expected_returns}}</text>
						<text>USDT</text>
					</view>
				</view>
			</view>
		</view>
		<empty v-if="!list.length"></empty>
		<!-- <uni-load-more :status="loadStatus"></uni-load-more> -->
		<view class="gap-30"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page: 1,
				loadStatus: 'more',
				list: []
			}
		},
		onLoad() {
			this.loadData(true)
		},
		onPullDownRefresh() {
			this.loadData(true)
		},
		onReachBottom() {
			// if(this.listStatus === 'loadmore'){
				this.page++
				this.loadData(false)
			// }
		},
		methods:{
			loadData(flag){
				if(flag)this.page=1
				this.$u.api.vip_zone_orders({
					page: this.page,
					limit: 15,
					type:1
				}).then(res=>{
					uni.stopPullDownRefresh()
					this.list = flag ? res.data.list.data : this.list.concat(res.data.list.data)
					// this.loadStatus = res.data.list.next_page_url? 'more' : 'noMore'
				})
			},
			godetail(id){
				uni.navigateTo({
					url:"/pages/market/compound/compound-detail?id="+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0rpx 30rpx;
	}
	.compound-card{
		width: 690rpx;
		border-radius: 20rpx;
		margin-top: 30rpx;
		padding: 30rpx;
		.border-bottom{
			border-bottom: 1rpx solid #323135 !important;
		}
		.time{
			background: rgba(115, 246, 162, 0.15);
			color: #73F6A2;
			font-size: 20rpx;
			padding: 9rpx 16rpx;
			border-radius: 10rpx;
		}
		.compound-img{
			width: 170rpx;
			height: 170rpx;
			border-radius: 16rpx;
		}
		.compound-card-content{
			background-color: #242424;
			padding: 24rpx 30rpx;
			border-radius: 20rpx;
			margin-top: 30rpx;
		}
	}
</style>