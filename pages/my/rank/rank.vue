<template>
	<view class="">
		<u-tabs :list="tabs" active-color="#F7924C" inactive-color="#666666" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view class="rank">
			<view class="rank-item flex justify-between align-center" v-for="(item,index) in list" :key="index">
				<view class="flex align-center">
					<image :src="item.avatar" mode="aspectFill" class="rank-avatar"></image>
					<view class="size-26">{{item.nickname}}</view>
				</view>
				<view class="rank-num" v-if="current==0">{{item.trade_total}}USDT</view>
				<view class="rank-num" v-if="current==1">{{item.trade_count}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabs:[{
					name:'购买金额'
				},{
					name:'购买数量'
				}],
				current:0,
				list:[]
			}
		},
		onLoad() {
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.rank({
					type:this.current
				}).then(res=>{
					this.list = res.data.ranking_list
				})
			},
			change(index) {
				this.current = index;
				this.loadData()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F9F9;
	}
	.rank{
		width: 690rpx;
		margin: 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		.rank-item{
			height: 110rpx;
			padding: 0 26rpx;
			.rank-avatar{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.rank-num{
				color: #DA8245;
				font-size: 30rpx;
			}
		}
	}
</style>