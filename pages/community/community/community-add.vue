<template>
	<view class="page" :class="getThemeClass">
		<view class="address">
			<view class="main-card u-m-b-40">
				<view class="flex align-center">
					<view class="address-label flex-shink">姓名</view>
					<input type="text" v-model="name" placeholder="请填写姓名" placeholder-class="u-font-30 text-placeholder" class="flex-1 u-font-30" />
				</view>
				<view class="flex align-center u-m-t-60">
					<view class="address-label flex-shink">身份证号</view>
					<input type="text" :maxlength="18" v-model="cardNo" placeholder="请填写身份证号" placeholder-class="u-font-30 text-placeholder" class="flex-1 u-font-30" />
				</view>
				<view class="flex align-center u-m-t-60">
					<view class="address-label flex-shink">原因</view>
					<input type="text" v-model="reason" placeholder="请填写申请原因" placeholder-class="u-font-30 text-placeholder" class="flex-1 u-font-30" />
				</view>
				<view class="flex u-m-t-60">
					<view class="address-label flex-shink">上传封面</view>
					<view class="" @click="upload">
						<image :src="url" mode="aspectFill" class="issue-img u-m-r-20 u-m-b-20" v-if="url"></image>
						<image src="../../../static/upload.png" class="issue-img" v-else></image>
					</view>
				</view>
			</view>
			
			<u-button type="primary" shape="circle" @click="submit">提交申请</u-button>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				cardNo:'',
				reason:'',
				image:'',
				url:''
			}
		},
		methods:{
			confirm(e){
				this.region_code = `${e.province.value}-${e.city.value}-${e.area.value}`
				this.region = `${e.province.label}${e.city.label}${e.area.label}`
			},
			submit(){
				if(!this.name)return this.$refs.uToast.show({title: "请填写姓名",type: 'error'})
				if(!this.cardNo)return this.$refs.uToast.show({title: "请填写身份证号",type: 'error'})
				if(!this.reason)return this.$refs.uToast.show({title: "请填写申请原因",type: 'error'})
				if(!this.image)return this.$refs.uToast.show({title: "请上传封面",type: 'error'})
				this.$u.api.districtApply({
					name:this.name,
					cardNo:this.cardNo,
					reason:this.reason,
					image:this.image
				}).then(res=>{
					this.$refs.uToast.show({title: "提交成功",type: 'success'})
					setTimeout(()=>{
						uni.navigateBack()
					},1200)
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
									this.url = tempFilePaths[0]
									this.image = res.data.path
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
	.address{
		padding: 30rpx;
		.address-label{
			width: 150rpx;
			font-size: 30rpx;
		}
	}
	.issue-img{
		width: 211rpx;
		height: 211rpx;
		border-radius: 24rpx;
	}
</style>