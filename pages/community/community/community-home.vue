<template>
	<view class="page" :class="getThemeClass">
		<image :src="info.image" mode="aspectFill" class="community-detailtop"></image>
		<view class="community-detail bg">
			<view class="community-hometop main-card flex justify-between align-center" @click="goChat">
				<view class="">
					<image :src="`../../../static/images/my/${getThemeName}/xljl.png`" class="community-xljl"></image>
					<view class="text-tips u-font-26">点击进入群聊</view>
				</view>
				<image :src="`../../../static/images/my/${getThemeName}/talk.png`" class="community-talk"></image>
			</view>
			<view class="main-card">
				<view class="flex justify-between align-center" @click="$u.route('/pages/community/community/community-rule',{id,type:'guide'})">
					<view class="flex align-center">
						<image src="../../../static/images/community-home1.png" class="community-homeicon"></image>
						<view class="u-font-30 text-bold u-m-l-20">进驻指南</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="flex justify-between align-center u-m-t-50" @click="$u.route('/pages/community/community/community-rule',{id,type:'activity'})">
					<view class="flex align-center">
						<image src="../../../static/images/community-home2.png" class="community-homeicon"></image>
						<view class="u-font-30 text-bold u-m-l-20">社区活动</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="flex justify-between align-center u-m-t-50" @click="$u.route('/pages/community/community/community-rule',{id,type:'punish'})">
					<view class="flex align-center">
						<image src="../../../static/images/community-home3.png" class="community-homeicon"></image>
						<view class="u-font-30 text-bold u-m-l-20">违规处罚</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="community-detailbot">
			<!-- <view class="bg-e8 community-detailbtn move-btn color-5b u-m-b-28">邀请好友</view> -->
			<view class="bg-cayn community-detailbtn move-btn text-default" @click="quite">退出社区</view>
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
			quite(){
				this.$u.api.districtQuit({
					id: this.id
				}).then(res=>{
					uni.showToast({
						title:"成功退出",
						icon:"none"
					})
					setTimeout(()=>{
						uni.navigateBack()
					},1200)
				})
			},
			goChat(){
				console.log(this.$im.loginStatus);
				if(this.$im.loginStatus == 1){
					uni.navigateTo({
						url:`/pages/community/chat/chat?id=${this.info.groupId}&name=${this.info.name}&groupid=${this.info.id}`
					})
				}else{
					uni.showModal({
						title: '提示',
						content: 'IM连接异常，是否重新连接？',
						success: res=> {
							if (res.confirm) {
								uni.showLoading()
								this.$im.initIm()
								setTimeout(()=>{
									uni.hideLoading()
								},5000)
							}
						}
					});
				}
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
		.community-hometop{
			position: relative;
			top: -42rpx;
			padding: 30rpx 40rpx;
			border-radius: 24rpx;
			.community-xljl{
				width: 226rpx;
				height: 66rpx;
			}
			.community-talk{
				width: 77rpx;
				height: 66rpx;
			}
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
	.community-homeicon{
		width: 65rpx;
		height: 65rpx;
	}
</style>