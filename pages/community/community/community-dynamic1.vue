<template>
	<view class="page" :class="getThemeClass">
		<view class="u-p-l-28 u-p-r-28 u-p-t-30">
			<view class="flex align-center">
				<image :src="info.avatar" mode="aspectFill" class="dynamic-avatar"></image>
				<view class="u-m-l-20">
					<view class="u-font-28 text-bold">{{info.nickname}}</view>
					<view class="u-font-22 text-tips u-m-t-10">{{info.createdAt}}</view>
				</view>
			</view>
			<view class="u-font-28 u-m-t-45">{{info.content}}</view>
			<view class="flex flex-wrap u-m-t-35">
				<image :src="item" mode="aspectFill" class="dynamic-img" v-for="(item,index) in info.images" :key="index" @click="look(index)"></image>
			</view>
		</view>
		<!-- <view class="dynamic-gap line"></view> -->
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				info:{}
			}
		},
		onLoad(data) {
			this.id = data.id
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.districtDynamicInfo({
					id: this.id
				}).then(res=>{
					this.info = res.data.info
				})
			},
			look(index){
				uni.previewImage({
					urls:this.info.images,
					current:index
				})
			}
		}
	}
</script>

<style lang="scss">
	.dynamic-avatar{
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}
	.dynamic-img{
		width: 224rpx;
		height: 224rpx;
		border-radius: 24rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	.dynamic-gap{
		width: 100%;
		height: 10rpx;
		margin-top: 50rpx;
	}
</style>