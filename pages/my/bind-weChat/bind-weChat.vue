<template>
	<view class="page" :class="getThemeClass">
		<!-- <view class="weChat_img" v-if="status">
			<image :src="draw.img" mode="widthFix"></image>
		</view> -->
		
		<view class="">
			
			<view class="title">姓名</view>
			<input class="myinput card-bg" type="text" v-model="name" placeholder="请输入您的姓名" placeholder-style="font-size:28rpx" placeholder-class="text-placeholder" />
		
			<view class="title">微信收款码</view>
			<view class="u-m-l-30 u-m-r-30">
				<u-upload
					:action="action" 
					:header="header"
					:form-data="formData"
					:file-list="fileList"
					:auto-upload="false"
					max-count="1"
					name="img"
					image-mode="widthFix"
					ref="uUpload"
					@on-success="success"
					customBtn
				>
					<template #addBtn>
						<view
							class="u-list-item u-add-wrap card-bg"
							hover-class="u-add-wrap__hover"
							hover-stay-time="150"
							:style="{
								width: '200rpx',
								height: '200rpx'
							}"
						>
							<u-icon name="plus" class="u-add-btn" size="40"></u-icon>
							<view class="u-add-tips">选择图片</view>
						</view>
					</template>
				</u-upload>
			</view>
			
		</view>
		<!-- 立即绑定 -->

		<!-- 修改账户：确定 -->
		<botBtnp style="margin-top: 200rpx;" :btnText="status?i18n.wechat2:i18n.wechat3"
			@click="bind"></botBtnp>
		<u-toast ref="uToast" />
		<u-loading mode="circle" :show="show" size="50" style="position: fixed;top: 44%;left: 50%;"></u-loading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '1', //1微信2支付宝
				img: '',
				name: '',
				draw: {},
				status: false,
				action: `${uni.$myAppConfig.baseUrl}/api/center/bind_draw`,
				header: {
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				},
				fileList: [],
				formData: {
					type: '1',
					wechat_name: '',
				},
				show: false
			};
		},
		onShow() {
			this.getDrawinfo()
		},
		methods: {
			getDrawinfo() {
				this.$u.api.draw_info({
					'type': 1
				}).then(res => {
					if (res.data.info) {
						this.draw = res.data.info
						this.fileList = [{
							url: res.data.info.img
						}]
						this.name = res.data.info.name
						this.status = true
					}
				}).catch(err => {})
			},
			bind() {
				let arr = this.$refs.uUpload.lists.filter(item => {
					// return item.url
					return item.progress === 0
				})
				if(!this.name){
					this.$refs.uToast.show({
						title: '请输入姓名',
						type: 'error',
					})
					return
				} else {
					this.formData.wechat_name = this.name
				}
				if(arr.length > 0){
					this.$refs.uUpload.upload();
					// this.show = true
				} else {
					this.$refs.uToast.show({
						title: '请选择/重新选择图片',
						type: 'error',
					})
				}
				
			},
			success(data, index, lists, name) {
				if (data.code == 200) {
					this.$refs.uUpload.clear()
					this.getDrawinfo()
					this.show = false
					this.$refs.uToast.show({
						// 修改成功
						title: this.i18n.wechat4,
						type: 'success',
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

	.upload_box {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
	}

	.slot-btn {
		border-radius: 20rpx;
		width: 500rpx;
		height: 500rpx;
		display: flex;
		justify-content: center;
		font-size: 100rpx;
		// background-color: #FFFFFF;
	}

	.weChat_img {
		border-radius: 20rpx;
		width: 500rpx;
		height: 500rpx;
		margin: 100rpx auto 0;
		display: flex;
		align-items: center;

		image {
			width: 100%;
		}
	}
	
	.title {
		margin: 40rpx 0 24rpx 32rpx;
		font-size: 26rpx;
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
		background: rgb(244, 245, 246);
		position: relative;
		border-radius: 10rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
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
	
</style>
