<template>
	<view class="vslog">
		<view class="flex align-center size-22 text-white u-m-b-30" style="opacity: 0.6;padding: 0 24rpx;">
			<view class="flex-2">对手信息</view>
			<view class="flex-1 text-center">对手出招</view>
			<view class="flex-1 text-center">我的出招</view>
			<view class="flex-1 text-center">结果</view>
			<view class="flex-2 text-center">时间</view>
		</view>
		<view class="vslog-card flex align-center text-white" v-for="(item,index) in list" :key="item.id">
			<view class="flex align-center flex-2">
				<image :src="item.other_avatar" class="vslog-avatar" mode="aspectFill"></image>
				<view class="line-1 u-m-l-15">{{item.other_nickname}}</view>
			</view>
			<view class="flex-1 text-center">
				<image src="/static/images/battle/stone.png" class="vslog-icon" v-if="item.other_num==2"></image>
				<image src="/static/images/battle/scissor.png" class="vslog-icon" v-if="item.other_num==1"></image>
				<image src="/static/images/battle/cloth.png" class="vslog-icon" v-if="item.other_num==3"></image>
			</view>
			<view class="flex-1 text-center">
				<image src="/static/images/battle/stone.png" class="vslog-icon" v-if="item.self_num==2"></image>
				<image src="/static/images/battle/scissor.png" class="vslog-icon" v-if="item.self_num==1"></image>
				<image src="/static/images/battle/cloth.png" class="vslog-icon" v-if="item.self_num==3"></image>
			</view>
			<view class="flex-1 text-center size-20 opc-7" v-if="item.is_victories==0">平局</view>
			<view class="flex-1 text-center size-20 opc-7" style="color: #39b54a;" v-if="item.is_victories==1">胜利</view>
			<view class="flex-1 text-center size-20 opc-7" style="color: #FB3A3A;" v-if="item.is_victories==2">失败</view>
			<view class="text-center size-22 opc-7 flex-2">
				<view class="txt-blue" v-if="item.type==2">邀请对战</view>
				<view class="txt-red" v-if="item.type==1">匹配对战</view>
				<view class="u-m-t-10">{{item.created_at}}</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				page:1,
				loadStatus:'loading',
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
				if(flag)this.page = 1
				this.loadStatus = 'loading'
				this.$u.api.battle_logs({
					page: this.page
				}).then(res=>{
					this.list = flag?res.data.list.data:this.list.concat(res.data.list.data)
					this.loadStatus = res.data.list.next_page_url?'more':'noMore'
				})
			},
		}
	}
</script>

<style lang="scss">
	.vslog{
		width: 100vw;
		min-height: calc(100vh - var(--window-top));
		background-image: url("../../static/images/battle/battle-bg.png");
		background-size: cover;
		padding: 30rpx;
		.vslog-card{
			background-color: #2A237A;
			border-radius: 12rpx;
			margin-bottom: 12rpx;
			padding: 24rpx;
			.vslog-avatar{
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
			}
			.vslog-icon{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.txt-blue{
		color: #3A6AFB;
	}
	.txt-red{
		color: #FB3A3A;
	}
</style>