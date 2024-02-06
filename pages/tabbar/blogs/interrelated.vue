<template>
	<view class="page" :class="getThemeClass">
		<!-- 官方公告 -->
		<!-- <unavbar :title="i18n.blog" :isback="false"></unavbar> -->
		<view class="coll-head">
			<u-tabs 
				:list="types" 
				name="title"
				:is-scroll="true" 
				:current="current" 
				@change="change" 
				:active-color="getMainColor" 
				:inactive-color="getNavInactiveColor" 
				:bg-color="getBgColor"
			></u-tabs>
		</view>
		<!-- <view class="gap-80"></view> -->
		<view class="main card-bg" v-for="(item,index) in blogsData" :key="index"
			@click="openWin('../../blog/blog-def/blog-def?id='+item.id)">
			<!-- 图片 -->
			<view class="topping card-tag-bg text-content" v-if="item.top_status === 1">
				<u-icon name="pushpin" size="24"></u-icon>
				<text class="u-m-l-0">已置顶</text>
			</view>
			<image class="main_image" :src="item.cover" mode="aspectFill"></image>
			<view class="main_right">
				<!-- 标题 -->
				<view class="title">
					{{item.title}}
				</view>
				<view class="main_bot text-tips">
					<view class="main_flex">
						<u-icon name="eye" size="38"></u-icon>
						<!-- 浏览量 -->
						<view class="browse_num">{{item.view_num}}</view>
					</view>
					<!-- 时间 -->
					<view>{{item.created_at}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus" v-if="blogsData.length>0"></uni-load-more>
		<empty v-else></empty>
		<view class="page-bg"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				page:1,
				blogsData:[],
				loadStatus:'noMore',
				types:[],
				tabs:[
					{name:'综合公告'},
					{name:'官方公告'},
					{name:'拉新空投'},
					{name:'新品发售'},
					{name:'优先购赋能'},
					{name:'抽签活动'},
					{name:'合成方案'},
					{name:'其他公告'},
				],
				current:0
			};
		},
		onLoad(options) {
			this.id = Number(options.id)
			// console.log(this.id,'----');
		},
		onShow() {
			this.getDatalist(true)
			// this.getDatatype()
			// this.setTabBar()
		},
		onReachBottom() {
			if(this.loadStatus=='noMore')return
			this.page ++
			this.getDatalist()
		},
		methods: {
			change(index) {
				this.current = index;
				this.getDatalist(true)
			},
			// getDatatype(){
			// 	this.$u.api.news_type({
			// 	}).then(res=>{
			// 		this.types = res.data.types
			// 	})
			// },
			getDatalist(flag) {
				if(flag)this.page=1
				this.$u.api.news_list({
					cast_id:this.id,
					// page:this.page,
					// type:this.current+1,
					// limit:10
				}).then(res => {
					if(res.code == 200){
						this.blogsData = flag? res.data.list.data : this.blogsData.concat(res.data.list.data)
						this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		padding-top: 0;
	}
	.coll-head{
		width: 750rpx;
		position: fixed;
		// top: calc(44px + var(--status-bar-height));
		// left: 0;
		z-index: 10;
	}

	.main {
		margin: 30rpx;
		padding: 30rpx;
		display: flex;
		border-radius: 20rpx;
		position: relative;
		
		.topping{
			position: absolute;
			top: 0;
			right: 0;
			font-size: 22rpx;
			padding: 5rpx 15rpx;
			border-radius: 0rpx 20rpx 0rpx 20rpx;
		}

		.main_image {
			width: 180rpx;
			height: 100rpx;
			border-radius: 10rpx;
		}

		.main_right {
			flex: 1;
			display: flex;
			margin-left: 38rpx;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: space-between;
		}

		.title {
			width: 100%;
			font-size: 30rpx;
			font-weight: bold;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}

		.main_bot {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 22rpx;
			.main_flex {
				display: flex;
				align-items: center;

				.browse_num {
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
