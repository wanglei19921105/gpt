<template>
	<view class="page" :class="getThemeClass">
		<image :src="info.image" mode="aspectFill" class="community-detailtop"></image>
		<view class="community-detail bg">
			<image :src="info.image" mode="aspectFill" class="community-detailavatar"></image>
			<view style="padding-left: 190rpx;">
				<view class="u-font-32 text-bold">{{info.name}}</view>
				<view class="flex u-m-t-15">
					<view class="community-detailtag card-tag-bg">
						<u-icon name="account" size="22" color="#A4A6AC"></u-icon>
						<text class="u-font-22 text-tips">{{info.userNum}}人</text>
					</view>
				</view>
			</view>
			<view class="u-font-26 text-content u-m-t-50">{{info.info}}</view>
		</view>
		<view class="community-detailbot">
			<view class="bg-e8 community-detailbtn move-btn color-5b" v-if="info.isJoin" @click="gocommunity">进入社区</view>
			<view class="bg-cayn community-detailbtn move-btn text-default" @click="join" v-else>立即加入</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				customStyle:{
					backgroundColor: "#00E2E2",
					color: "#111926",
					fontSize: "32rpx",
					fontWeight: "bold"
				},
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
				this.$u.api.districtInfo({
					id: this.id
				}).then(res=>{
					this.info = res.data.info
				})
			},
			join(){
				this.$u.api.districtJoin({
					id: this.id
				}).then(res=>{
					uni.showToast({
						title:"成功加入",
						icon:"none"
					})
					this.loadData()
				})
			},
			gocommunity(){
				uni.redirectTo({
					url:`/pages/community/community/community-home?id=${this.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.community-detailtop{
		width: 100vw;
		height: 500rpx;
	}
	.community-detail{
		border-radius: 66rpx 66rpx 0 0;
		position: relative;
		top: -66rpx;
		z-index: 10;
		padding: 20rpx 28rpx 0 28rpx;
		.community-detailavatar{
			width: 148rpx;
			height: 148rpx;
			border-radius: 74rpx;
			border: 1rpx solid #FFFFFF;
			position: absolute;
			top: -38rpx;
		}
		.community-detailtag{
			height: 40rpx;
			border-radius: 20rpx;
			padding: 0 15rpx;
		}
	}
	.community-detailbot{
		width: 694rpx;
		position: fixed;
		bottom: 30rpx;
		left: 28rpx;
		z-index: 10;
		.community-detailbtn{
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			border-radius: 50rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>