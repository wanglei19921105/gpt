<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar title="合成藏品"></unavbar> -->
		<view class="gap-30"></view>
		<!-- 商品展示 -->
		<empty v-if="!list.length"></empty>
		<view class="compound-card card-bg" v-for="(item,index) in list" :key="index" @click="godetail(item.id)">
			<view class="plan-count-down-text-box count-gray" v-if="item.status === 1">已结束</view>
			<image :src="item.cover" mode="aspectFill" class="compound-img"></image>
			<view class="compound-card-content">
				<view class="size-32 text-bold compound-txt text-main">{{item.title}}</view>
				<!-- <view class="size-24 compound-time text-content">时间：{{item.start_at}} - {{item.end_at}}</view> -->
				<view class="compound-time flex justify-between align-center card-bg">
					<view class="size-20">
						<view class="color-9 u-p-b-10">优先合成时间:</view>
						<view v-if="item.pre_at != null">{{item.pre_at}}</view>
						<view v-else>——</view>
					</view>
					<uni-icons type="arrow-right" size="20" color="#A4A6AC"></uni-icons>
					<view class="size-20">
						<view class="color-9 u-p-b-10">开始时间:</view>
						<view class="">{{item.start_at}}</view>
					</view>
					<uni-icons type="arrow-right" size="20" color="#A4A6AC"></uni-icons>
					<view class="size-20">
						<view class="color-9 u-p-b-10">结束时间:</view>
						<view class="">{{item.end_at}}</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
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
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/market/compound/compound-launch'
			})
		},
		methods:{
			loadData(flag){
				if(flag)this.page=1
				this.$u.api.mix_index({
					page: this.page,
					limit: 15,
					type:1
				}).then(res=>{
					uni.stopPullDownRefresh()
					this.list = flag ? res.data.list.data : this.list.concat(res.data.list.data)
					this.loadStatus = res.data.list.next_page_url? 'more' : 'noMore'
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
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		position: relative;
		
		.compound-img{
			width: 690rpx;
			border-radius: 30rpx;
		}
		
		.compound-card-content{
			padding: 30rpx;
			.compound-time{
				margin-top: 20rpx;
				padding: 24rpx 32rpx;
				width: 646rpx;
				// background: #FCFFFF;
				border-radius: 20rpx;
				border: 1rpx solid #E8E8E8;
			}
		}
	}
	.plan-count-down-text-box{
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		z-index: 1;
		width: max-content;
		padding: 10rpx 30rpx;
		color: #333;
		display: flex;
		align-items: center;
		transition: transform 0.1s;
		border-radius: 20rpx 8rpx 20rpx 8rpx;
		&.count-gray {
			background: linear-gradient(90deg, #CED0D4 0%, #EBEBEE 100%);
		}
	}
</style>