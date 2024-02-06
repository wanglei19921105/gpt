<template>
	<view class="page" :class="getThemeClass">
		<view class="issue-cont">
			<textarea class="u-font-30 issue-area" :auto-height="true" v-model="content" placeholder="有趣的内容会有更多赞哦..." placeholder-class="text-placeholder u-font-30" />
			<view class="flex flex-wrap">
				<image :src="item" mode="aspectFill" class="issue-img u-m-r-20 u-m-b-20" v-for="(item,index) in img" :key="index"></image>
				<image src="../../../static/upload.png" class="issue-img" @click="upload"></image>
			</view>
		</view>
		<view class="community-detailbot">
			<!-- <view class="bg-e8 community-detailbtn move-btn color-5b u-m-b-28">邀请好友</view> -->
			<view class="bg-cayn community-detailbtn move-btn text-default" @click="submit">上架</view>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
				images:[],
				img:[]
			}
		},
		methods:{
			submit(){
				if(!this.content) return this.$refs.uToast.show({title:'请输入内容',type: 'error'})
				this.$u.api.districtDynamicPublish({
					content: this.content,
					images: this.images
				}).then(res=>{
					this.$refs.uToast.show({title:'上架成功',type: 'success'})
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			},
			upload(){
				let uploadUrl = this.$myAppConfig.baseUrl + '/api/upload_file';
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: uploadUrl,
							filePath: tempFilePaths[0],
							name: 'pic',
							header:{
								'token': uni.getStorageSync('token')
							},
							formData:{
								sence: 'district'
							},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data)
								if(res.code==200){
									this.img.push(tempFilePaths[0])
									this.images.push(res.data.path)
								}
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.issue-cont{
		padding: 30rpx;
		.issue-area{
			width: 100%;
			min-height: 200rpx;
		}
		.issue-img{
			width: 211rpx;
			height: 211rpx;
			border-radius: 24rpx;
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