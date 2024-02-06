<template>
	<view class="page" :class="getThemeClass">
		
		<view class="title">
			<text class="color-red u-m-r-10">*</text>
			<text>问题反馈</text>
		</view>
		<view class="u-m-l-30 u-m-r-30 up-box card-bg">
			<textarea 
				class="mytextarea" 
				v-model="contact"
				placeholder="请输入您反馈的内容"
				placeholder-style="font-size:28rpx" 
				placeholder-class="text-placeholder" 
				maxlength="-1" 
				minlength="100" 
				:auto-height="true" 
			/>
			<u-upload
				:action="action" 
				:header="header"
				:form-data="formData"
				:file-list.sync="fileList"
				max-count="1"
				name="pic"
				image-mode="widthFix"
				ref="uUpload"
				customBtn
			>
				<template #addBtn>
					<view
						class="u-list-item u-add-wrap card-bg border-color"
						hover-class="u-add-wrap__hover"
						hover-stay-time="150"
						:style="{
							width: '150rpx',
							height: '150rpx'
						}"
					>
						<u-icon name="plus" class="u-add-btn" size="40" color="#e3e3e3"></u-icon>
					</view>
				</template>
			</u-upload>
		</view>
		
		<view class="title">
			<text>联系方式(可不填)</text>
		</view>
		<input class="myinput card-bg" type="text" v-model="phone" placeholder="请输入您的联系方式" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />

		<view class="title">
			<text>或联系客服</text>
		</view>
			
		<template v-for="(item,index) in list">
			<view class="contact-card u-flex align-center card-bg justify-between" :key="index">
				<view class="size-32">{{item.title}}</view>
				<view class="color-blue" @click="myPreviewImage(item.url)">点击查看</view>
			</view>
		</template>
		
		<botBtnp style="margin-top: 200rpx;" btnText="提交反馈" @click="submit"></botBtnp>
	
		<u-toast ref="uToast" />
	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				action: `${uni.$myAppConfig.baseUrl}/api/upload_file`,
				header: {
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				},
				contact: '',
				phone: '',
				formData: {
					sence: 'message_img',
				},
				imageUrl: '',
				fileList: [],
				list: []
			}
		},
		onLoad() {
			this.loadData()
		},
		methods:{
			loadData(){
				this.$u.api.service_info().then(res => {
					this.list = [
						{
							title: res.data.config.weixin_text,
							url: res.data.config.weixin
						},
						{
							title: res.data.config.weibo_text,
							url: res.data.config.weibo
						},
						{
							title: res.data.config.qq_text,
							url: res.data.config.qq
						}
					]
				})
			},
			upImgSuccess(file){
				// this.fileList = file.data.path
			},
			submit(){
				if(!this.contact) {
					this.$refs.uToast.show({
						title: '请输入反馈内容',
						type: 'warning',
					})
					return
				}
				if(this.$refs.uUpload.lists.length > 0){
					this.imageUrl = this.$refs.uUpload.lists[0].response.data.path
				}
				uni.showLoading({
					title: '提交中...'
				})
				this.$u.api.message_add({
					message: this.contact,
					phone: this.phone,
					img: this.imageUrl
				}).then(res => {
					uni.hideLoading()
					this.contact = ''
					this.phone = ''
					this.$refs.uUpload.clear()
					this.$refs.uToast.show({
						title: '提交成功，感谢您的反馈！',
						type: 'success',
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.title {
		margin: 40rpx 0 24rpx 32rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.up-box{
		padding: 30rpx;
		border-radius: 20rpx;
	}
	
	.mytextarea{
		min-height: 200rpx;
		margin-bottom: 20rpx;
	}
	
	.myinput {
		margin: 24rpx 30rpx 40rpx;
		border-radius: 20rpx;
		height: 100rpx;
		padding-left: 30rpx;
	}
	
	.input_pla {
		font-size: 28rpx;
	}
	
	.u-list-item {
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
		margin: 10rpx;
		// background: rgb(244, 245, 246);
		position: relative;
		border-radius: 20rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		border: dotted 4rpx;
	}
	
	.u-add-wrap {
		flex-direction: column;
		color: $u-content-color;
		font-size: 26rpx;
	}
	
	.u-add-wrap__hover {
		// background-color: rgb(235, 236, 238);
		opacity: .5;
	}
	
	.contact-card{
		width: 690rpx;
		margin: 0 30rpx 30rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 30rpx;
		.contact-img{
			width: 235rpx;
			height: 235rpx;
			margin-top: 26rpx;
			border-radius: 10rpx;
		}
		.contact-btn{
			width: 420rpx;
			height: 86rpx;
			text-align: center;
			line-height: 86rpx;
			background-color: #764E39;
			border-radius: 10rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			margin-top: 40rpx;
		}
	}
</style>