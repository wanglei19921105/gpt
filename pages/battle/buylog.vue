<template>
	<view style="padding: 30rpx;" class="page" :class="getThemeClass">
		<view class="main-card card-bg u-m-b-24" v-for="(item,index) in list" :key="item.id">
			<view class="flex justify-between align-center text-bold size-30">
				<view class="">订单号：{{item.out_trade_no}}</view>
				<view class="">{{item.num}}USDT</view>
			</view>
			<view class="flex justify-between align-center u-m-t-30 size-26 text-content">
				<view class="">{{item.created_at}}</view>
				<view class="">x {{item.buy_num}}</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				loadStatus:'loading',
				list:[]
			}
		},
		onLoad() {
			this.loadData(true)
		},
		onReachBottom() {
			if(this.loadStatus=='noMore')return
			this.page++
			this.loadData()
		},
		methods:{
			loadData(flag){
				if(flag)this.page=1
				this.loadStatus = 'loading'
				this.$u.api.ticket_logs({
					page:this.page
				}).then(res=>{
					this.list = flag?res.data.list.data:this.list.concat(res.data.list.data)
					this.loadStatus = res.data.list.next_page_url?'more':'noMore'
				})
			}
		}
	}
</script>

<style>
</style>