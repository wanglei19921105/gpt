<template>
	<view class="page" :class="getThemeClass">
		<unavbar :title="title+'团队'"></unavbar>
		<view class="card-bg flex align-center justify-between teamTitle">
			<view class="size-24 text-content">级别</view>
			<view class="size-24 text-content">用户名</view>
			<view class="size-24 text-content">佣金</view>
		</view>
		<view class="card-bg teamTitle u-p-t-40 u-p-r-20" style="padding-bottom: 0;">
			<view class="flex align-center justify-between u-p-b-60" v-for="(item,index) in list" :key="index">
				<view class="size-24" style="width: 33%;">{{title}}</view>
				<view class="size-24 line-1 text-center" style="width: 26%;">{{item.nickname}}</view>
				<view class="size-24 flex align-center justify-end line-1" style="width: 33%;">
					{{item.sum}}
				</view>
			</view> 
			<empty v-if="!list.length"></empty>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				type:1,
				list:[],
				page:1,
				loadStatus:'noMore',
			};
		},
		onLoad(data) {
			this.type = data.type
			if (data.type == 1) {
				this.title = '一级'
			}
			if (data.type == 2) {
				this.title = '二级'
			}
			if (data.type == 3) {
				this.title = '三级'
			}
			if (data.type == 4) {
				this.title = '四级'
			}
			if (data.type == 5) {
				this.title = '五级'
			}
			if (data.type == 6) {
				this.title = '六级'
			}
			this.loadData()
		},
		methods:{
			loadData(flag){
				this.$u.api.my_team_detail({
					type:this.type,
					page: this.page,
				}).then(res => {
					console.log(res)
					this.list = flag? res.data.list.data:this.list.concat(res.data.list.data);
					this.loadStatus = res.data.list.next_page_url?'more':'noMore'
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss">
.teamTitle{
	padding: 30rpx 44rpx;
	margin: 28rpx;
	border-radius: 20rpx;
}
</style>
