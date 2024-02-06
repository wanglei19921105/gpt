<template>
	<view class="page" :class="getThemeClass">
		<view class="coll-head">
			<u-tabs
				:list="tabs" 
				:is-scroll="false" 
				:current="current" 
				@change="change" 
				:active-color="getMainColor" 
				:inactive-color="getNavInactiveColor" 
				:bg-color="getBgColor"
			></u-tabs>
		</view>
		<view class="flex align-center flex-wrap u-p-l-24">
			<view class="Paint" v-for="(item,index) in galleryList" :key="index" @click="goDetail(item.id,item.status,item.exhibition_status)">
				<view class="PaintImg">
					<image src="../../../static/logo.png" mode="widthFix" v-if="current == 0"></image>
					<image :src="item.thumb_image_path" mode="widthFix" class="" v-else></image>
				</view>
				<view class="line-1 title flex align-center justify-center" v-if="current == 0">
					<image src="../../../static/images/AIcreate/time.png" mode="widthFix" style="width: 28rpx;"></image>
					<view class="size-26 u-m-l-10">{{item.status == 0?'排队中':'进行中'}}...</view>
				</view>
				<view class="line-1 title flex align-center justify-center" v-if="current == 1 && item.exhibition_status == 2">
					<image src="../../../static/images/AIcreate/time.png" mode="widthFix" style="width: 28rpx;"></image>
					<view class="size-26 u-m-l-10">审核中...</view>
				</view>
			</view>
		</view>
		<empty v-if="!galleryList.length"></empty>
		<uni-load-more :status="loadStatus" v-if="galleryList.length>0"></uni-load-more>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name:'进行中',
					id:0
				},{
					name:'画廊',
					id:1
				},{
					name:'绘画记录',
					id:2
				}],
				galleryList:[],
				current: 0,
				loadStatus:'noMore'
			};
		},
		onShow() {
			this.myObject(true);
		},
		onPullDownRefresh() {
			this.myObject(true);
		},
		onReachBottom() {
			if (this.loadStatus == 'noMore') return;
			this.page++;
			this.myObject();
		},
		methods:{
			goDetail(id,status,exhibition_status){
				if(status == 0 || status == 2 ){
					
				}else{
					uni.navigateTo({
						url: `/pages/AIcreation/myGallery/galleryDetails?id=${id}&type=${this.current}`
					})
				}
			},
			myObject(flag){
				if (flag) this.page = 1;
				this.$u.api.gallery({
					type:this.current,
					page:this.page
				}).then(res => {
					console.log(res.data.list);
					// this.galleryList = res.data.list.data
					this.galleryList = flag ? res.data.list.data : this.galleryList.concat(res.data.list.data);
					this.loadStatus = res.data.list.next_page_url ? 'more' : 'noMore';
					uni.stopPullDownRefresh()
				}).catch(err => {})
			},
			change(index) {
				if(this.current==index)return
				this.current = index;
				this.myObject(true);
			},
		}
	}
</script>

<style lang="scss">
.Paint{
	position: relative;
	margin-right: 24rpx;
	margin-top: 20rpx;
	.title{
		width: 220rpx;
		height: 220rpx;
		line-height: 220rpx;
		position: absolute;
		top: 0rpx;
		z-index: 10;
		font-size: 22rpx;
		border-radius: 16rpx;
		color: #FFFFFF;
		background: rgba(0, 0, 0, .4);
	}
	.PaintImg{
		width: 220rpx;
		height: 220rpx;
		border-radius: 16rpx;
		z-index: 1;
		overflow: hidden;
		image{width: 220rpx;}
	}
}
</style>
