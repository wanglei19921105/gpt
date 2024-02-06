<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar title="设置艺术家背景"></unavbar> -->
		<view class="weChat_img" v-if="status">
			<image :src="draw.bgimg" mode="widthFix"></image>
		</view>

		<view class="upload_box" v-if="!status">
			<u-upload ref="uUpload" :action="action" :header="header" :form-data="formData" max-count="1"
				:custom-btn="true" name="img" :show-progress="false" width="500" height="500" image-mode="widthFix"
				@on-success="success" :auto-upload="false" @on-choose-complete="progress">
				<view slot="addBtn" class="slot-btn card-bg">
					<u-icon name="plus" size="74" color="#afafaf"></u-icon>
				</view>
			</u-upload>
		</view>

		<!-- 立即绑定 -->

		<!-- 修改账户：确定 -->
		<botBtnp style="margin-top: 200rpx;" :btnText="status? '修改图片' : i18n.wechat3"
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
				draw: {},
				status: false,
				action: `${uni.$myAppConfig.baseUrl}/api/author/bgimg`,
				header: {
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				},
				formData: {},
				file: null,
				show: false
			};
		},
		onLoad() {
			this.getDrawinfo()
		},
		methods: {
			getDrawinfo() {
				this.$u.api.author_index().then(res => {
					if (res.data.log.nickname) {
						this.draw = res.data.log
						if (res.data.log.bgimg) this.status = true
					} else {
						this.$refs.uToast.show({
							// 修改成功
							title: '请先认证艺术家',
							type: 'error',
						})
					}
				}).catch(err => {})
			},
			bind() {
				if (this.status) {
					this.file = null
					this.status = false
					return false;
				}
				if(this.file === null){
					this.$refs.uToast.show({
						// 修改成功
						title: '请先上传图片',
						type: 'warning',
					})
					return
				}
				this.$refs.uUpload.upload();
				this.show = true
				// setTimeout(() => {

				// }, 2000)
			},
			success(data, index, lists, name) {
				// console.log(data.code)
				if (data.code == 200) {
					this.getDrawinfo()
					this.show = false
					this.$refs.uToast.show({
						// 修改成功
						title: this.i18n.wechat4,
						type: 'success',
					})
				}
			},
			progress(res, index, lists, name) {
				// console.log(res, index, lists, name)
				this.file = res[0]
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// 	background-color: #F9F9F9;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.slot-btn {
	// 		background-color: #292B2B;
	// 	}
	// }

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
</style>
