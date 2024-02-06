<template>
	<view class="page" :class="getThemeClass">
		<view class="ZLimg">
			<image :src="msg.bgimg" mode="widthFix"></image>
		</view>
		<view class="ZLDetails">
			<view class="size-40 bold-500 u-m-b-32">{{msg.title}}</view>
			<view class="size-24 text-tips u-m-b-40">{{msg.introduce}}</view>
			<view class="sponsor" @click="openUrl(msg.link)">
				<view class="size-22 text-tips u-m-b-20">赞助商</view>
				<view class="flex align-center">
					<image :src="msg.avatar" mode="widthFix" style="width: 66rpx;border-radius: 33rpx;height: 66rpx;"></image>
					<view class="u-m-l-20">
						<view class="size-24 u-m-b-14">{{msg.name}}</view>
					</view>
				</view>
			</view>
			<view class="flex align-center flex-wrap">
				<view class="u-p-b-10 u-p-r-12" v-for="(item,index) in featuredList" :key="index">
					<view class="" style="height: 220rpx;width: 220rpx;border-radius: 20rpx;display: block;overflow: hidden;">
						<image :src="item.thumb_image_path" mode="widthFix" style="width: 220rpx;border-radius: 20rpx;"></image>
					</view>
				</view>
			</view>
			<empty v-if="!featuredList.length"></empty>
			<uni-load-more :status="loadStatus" v-if="featuredList.length>0"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				featuredList:[],
				page:1,
				loadStatus:'noMore',
				msg:''
			};
		},
		onLoad(data) {
			this.id = data.id
			this.loadData(true)
		},
		onReachBottom() {
			if (this.loadStatus == 'noMore') return;
			this.page++;
			this.loadData();
		},
		methods:{
			loadData(flag) {
				if (flag) this.page = 1;
				this.$u.api.exhibition_details({
					id: this.id,
					page:this.page
				}).then(res => {
					console.log(res);
					this.msg = res.data.subject
					this.featuredList = flag ? res.data.list.data : this.featuredList.concat(res.data.list.data);
					this.loadStatus = res.data.list.next_page_url ? 'more' : 'noMore';
				}).catch(err => {
					
				})
			},
		}
	}
</script>

<style lang="scss">
	.page{position: relative;}
	.sponsor{
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx 24rpx;
		margin-bottom: 40rpx;
	}
	.ZLimg{
		width: 100vw;
		height: 400rpx;
		overflow: hidden;
		position: absolute;
		z-index: 1;
		image{width: 100vw;}
	}
	.ZLDetails{
		background-color: #F8F8F8;
		position: absolute;
		width: 100vw;
		z-index: 10;
		top: 366rpx;
		border-radius: 48rpx 48rpx 0 0;
		padding: 66rpx 28rpx;
	}
</style>
