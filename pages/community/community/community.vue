<template>
	<view class="page" :class="getThemeClass">
		<view class="community-tab u-p-t-30 u-p-b-30 u-flex u-row-between u-p-l-28 u-p-r-28 bg">
			<view class="community-tabs" :class="index==current?'community-active':'community-unactive'"
				v-for="(item,index) in tabs" :key="item.value" @click="tabsClick(index)">{{item.name}}</view>
		</view>
		<view class="community-gap"></view>
		<view class="u-flex u-row-between u-flex-wrap u-p-l-28 u-p-r-28" v-if="current==0">
			<empty v-if="!community.length"></empty>
			<view class="community-card card-bg u-m-b-24" v-for="(item,index) in community" :key="index" @click="$u.route('/pages/community/community/communtiy-detail',{id:item.id})">
				<view class="community-tag">
					<image src="../../../static/images/fire.png" class="community-fire"></image>
					<text class="u-font-20 u-m-l-10 text-white">{{item.userNum}}</text>
				</view>
				<image :src="item.image" mode="aspectFill" class="community-avatar"></image>
				<image :src="item.image" mode="aspectFill" class="community-cardbg"></image>
				<view class="flex justify-between align-center u-m-t-40 u-p-l-24 u-p-r-24">
					<view class="u-font-26 text-bold line-1" style="width: 150rpx;">{{item.name}}</view>
					<view class="flex align-center u-m-t-10 u-p-l-24">
						<image src="../../../static/images/people.png" class="community-icon u-m-r-10"></image>
						<view class="u-font-22 community-txt">{{item.userNum}}人</view>
					</view>
				</view>
				
			</view>
		</view>
		<view v-if="current==1">
			<view class="bg community-listcard" v-for="(item,index) in list" :key="index" @click="$u.route('/pages/community/community/community-dynamic',{id:item.id})">
				<view class="flex align-center">
					<image :src="item.avatar" mode="aspectFill" class="community-listavatar"></image>
					<view class="u-m-l-20">
						<view class="u-font-28 text-bold">{{item.nickname}}</view>
						<view class="text-tips u-font-22 u-m-t-10">{{item.createdAt}}</view>
					</view>
				</view>
				<view class="u-m-t-40 u-font-28" v-if="item.content">{{item.content}}</view>
				<view class="u-m-t-30 flex-wrap flex">
					<image :src="e" mode="aspectFill" class="community-image"
						v-for="(e,i) in item.images" :key="i"></image>
				</view>
				<view class="u-m-t-40 flex justify-between align-center">
					<view class="u-font-24 color-blue">
						<!-- <text v-if="item.userId!=userid">删除</text> -->
					</view>
					<view class="flex align-center">
						<view class="flex align-center" style="width: 150rpx;">
							<u-icon name="chat" color="#9B9B9B" size="30"></u-icon>
							<view class="u-font-28 text-tips u-m-l-15">{{item.dynamicNum}}</view>
						</view>
						<view class="flex align-center" @click.stop="like(item)">
							<u-icon name="heart-fill" color="#FE1313" size="30" v-if="item.isPraise"></u-icon>
							<u-icon name="heart" color="#9B9B9B" size="30" v-else></u-icon>
							<view class="u-font-28 text-tips u-m-l-15">{{item.praiseNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [
					{name: '群聊',
						value: '0'
					},
					{
						name: '动态',
						value: '1'
					},
				],
				current: 0,
				community:[],
				page:1,
				loadStatus:'noMore',
				list:[],
				userid:''
			}
		},
		onShow() {
			this.userid = uni.getStorageSync('openImUserid')
			this.loadData(true)
		},
		onReachBottom() {
			if(this.current==0||this.loadStatus=='noMore')return
			this.page++
			this.loadData()
		},
		onNavigationBarButtonTap() {
			if(this.current==0){
				uni.showActionSheet({
					itemList: ['申请社区'],
					success: res => {
						uni.navigateTo({
							url: "/pages/community/community/community-add"
						})
					}
				});
			}else{
				uni.showActionSheet({
					itemList: ['上架动态 '],
					success: res => {
						uni.navigateTo({
							url: "/pages/community/community/community-issue"
						})
					}
				});
			}
		},
		methods: {
			loadData(flag){
				if(this.current==0){
					this.$u.api.districtIndex().then(res=>{
						this.community = res.data.list
					})
				}
				if(this.current==1){
					if(flag)this.page=1
					this.$u.api.districtDynamic({
						page: this.page,
						limit:10
					}).then(res=>{
						this.list = flag? res.data.list.data : this.list.concat(res.data.list.data)
						this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					})
				}
			},
			tabsClick(index) {
				if (this.current == index) return
				this.current = index
				this.loadData(true)
			},
			like(data){
				let obj = {
					commentId:0,
					id:data.id,
					isPraise: data.isPraise.toString()=='true'?false:true
				}
				this.$u.api.districtPraise(obj).then(res=>{
					this.loadData(true)
				})
			}
		}
	}
</script>

<style lang="scss">
	.community-tab {
		width: 100vw;
		position: fixed;
		top: var(--window-top);
		z-index: 10;

		.community-tabs {
			width: 335rpx;
			height: 80rpx;
			border-radius: 12rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 28rpx;
		}
	}

	.community-gap {
		width: 100vw;
		height: 140rpx;
	}

	.community-card {
		width: 335rpx;
		height: 335rpx;
		border-radius: 24rpx;
		overflow: hidden;
		position: relative;
		.community-tag {
			padding: 0 15rpx;
			height: 40rpx;
			border-radius: 20rpx;
			background-color: rgba(0, 0, 0, 0.5);
			align-items: center;
			display: flex;
			position: absolute;
			top: 24rpx;
			left: 24rpx;
			z-index: 10;
		
			.community-fire {
				width: 16rpx;
				height: 20rpx;
			}
		}
		.community-avatar {
			width: 60rpx;
			height: 60rpx;
			border-radius: 30rpx;
			border: 1rpx solid #FFFFFF;
			position: absolute;
			top: 200rpx;
			left: 24rpx;
			z-index: 10;
		}

		.community-cardbg {
			width: 335rpx;
			height: 230rpx;
		}

		.community-icon {
			width: 25rpx;
			height: 25rpx;
		}
	}

	.community-listcard {
		padding: 40rpx 28rpx;

		.community-listavatar {
			width: 72rpx;
			height: 72rpx;
			border-radius: 36rpx;
		}

		.community-image {
			width: 224rpx;
			height: 224rpx;
			border-radius: 24rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
	}
</style>
