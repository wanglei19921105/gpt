<template>
	<view class="page" :class="getThemeClass">
		<view class="gap-50"></view>
		<!-- <view class="chatinfo-top">
			<image :src="image||'../../../static/logo.png'" mode="aspectFill" class="chatinfo-avatar"></image>
			<view class="chatinfo-tag u-font-20">上传</view>
		</view> -->
		<view class="u-p-l-28 u-p-r-28">
			<view class="u-font-26">群聊名称</view>
			<view class="main-card u-m-t-25">
				<input type="text" v-model="name" class="u-font-28" placeholder="请输入群聊名称" placeholder-class="text-placeholder u-font-28">
			</view>
			<view class="gap-100"></view>
			<u-button shape="circle" @click="submit">确认</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				image:'',
				name:''
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
					this.image = res.data.info.image
					this.name = res.data.info.name
				})
			},
			submit(){
				if(!this.name)return this.$refs.uToast.show({title:'请输入群聊名称',type: 'error'})
				this.$u.api.districtSetGroupUserInfo({
					id: this.id,
					nickname: this.name
				}).then(res=>{
					this.$refs.uToast.show({title:'修改成功',type: 'success'})
					setTimeout(()=>{
						uni.navigateBack()
					},1200)
				})
			}
		}
	}
</script>

<style lang="scss">
	.chatinfo-top{
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto;
		position: relative;
		.chatinfo-avatar{
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
		}
		.chatinfo-tag{
			width: 140rpx;
			height: 34rpx;
			text-align: center;
			line-height: 34rpx;
			background: rgba(0,0,0,0.5);
			color: #FFFFFF;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 10;
		}
	}
</style>