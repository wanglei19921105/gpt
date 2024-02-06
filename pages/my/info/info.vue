<template>
	<view class="page" :class="getThemeClass">
		<!-- 个人信息 -->
		<!-- <unavbar :title="i18n.information1"></unavbar> -->
		<view class="fun fun_height card-bg">
			<view class="avatarImg card-tag-bg">
				<image class="avatar" :src="userInfo.avatar" mode="widthFix"></image>
			</view>
			<!-- 修改头像 -->
			<view class="grey_text text-content" @click="portrait">{{i18n.information2}}
				<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
			</view>
		</view>
		<view class="fun_box card-bg">
			<view class="fun">
				<!-- 昵称 -->
				<view>{{i18n.information3}}</view>
				<view class="grey_text black_tex text-content" @click="setNickname">{{userInfo.nickname}}
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="line"></view>
			<view class="fun">
				<!-- 账号 -->
				<view>{{i18n.information4}}</view>
				<view class="grey_text black_text text-content">{{userInfo.user_account}}</view>
			</view>
			<view class="line"></view>
			<view class="fun" @click="$u.route('/pages/market/artist-space/artist-space', {id: userInfo.id, userId: userInfo.id})">
				<view>设置艺术家背景</view>
				<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
			</view>
			<!-- <view class="fun" @click="$u.route('/pages/my/change-artist-bg/change-artist-bg')">
				<view>设置艺术家背景</view>
				<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
			</view> -->
		</view>
		<!-- <view class="bot_fun">
			<view class="fun fun_plus"> -->
		<!-- 个人简介 -->
		<!-- <view>个人简介</view>
				<view class="grey_text black_text">
					<u-icon name="arrow-right" color="#D6D2D3" class="uicon"></u-icon>
				</view>
			</view>
			<view class="fun_text">
				远程办公好帮手，在线产品原型设计远程办公好帮手，
				在线产品原型设计在线产品原型设计好帮手，在线产品
				产品原型设
			</view>
		</view> -->
		<u-popup v-model="show1" class="my-popup-center" mode="center" border-radius="20">
			<view class="popupView popupViewMini card-bg">
				<!-- 请输入新的昵称 -->
				<input class="inp border-color" type="text" v-model="nickname" :placeholder="i18n.information5" />
				<!-- 确定 -->
				<!-- <button class="updateBtn" type="default" @click="updatepwd">{{i18n.information9}}</button> -->
				<botBtn class="u-m-t-50" @click="updatepwd">{{i18n.information9}}</botBtn>
			</view>
		</u-popup>
		<u-toast ref="uToast" />


		<u-popup v-model="show" mode="center" z-index="999">
			<view class="portraitPopup">
				<view class="uploadImg">
					<image :src="userInfo.avatar" mode="widthFix"></image>
				</view>
				<!-- 选择头像 -->
				<u-upload ref="uUpload" name="img" :show-progress=false :action="action"
					:upload-text="i18n.information6" :auto-upload="false" :max-count="1" :header="header" class="upload"
					@on-progress="onsuccess">
				</u-upload>
				<!-- 确认 -->
				<u-button class="submit" @click="submit">{{i18n.information7}}</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				phone: '',
				show: false,
				show1: false,
				action: `${uni.$myAppConfig.baseUrl}/api/center/change_head`,
				nickname: '',
				header: {
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				}
			};
		},
		onShow() {
			this.getUserinfo()
		},
		methods: {
			getUserinfo() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.userInfo = res.data.user
						this.getPhone()
					}
				}).catch(err => {})
			},
			getPhone() { //手机号展示
				let phone = this.userInfo.phone.substr(0, 3) + '****' + this.userInfo.phone.substr(7, 4)
				return this.phone = phone
			},
			portrait() {
				this.show = true
			},
			submit() {
				this.$refs.uUpload.upload();
				this.show = false
			},
			onsuccess(res, index, lists, name) {
				let listsData = {};
				setTimeout(() => {
					listsData = lists[0].response
					console.log(listsData);
					if (listsData.code == 200) {
						this.$refs.uToast.show({
							// 修改成功
							title: this.i18n.information8,
							type: 'success',
						})
						this.$im.setInfo(listsData)
						this.getUserinfo()
					}
				}, 1000)
			},
			setNickname() {
				this.show1 = true
			},
			updatepwd() { //修改昵称
				this.$u.api.nickname_change({
					'nickname': this.nickname
				}).then(res => {
					this.getUserinfo()
					if (res.code == 200) {
						this.$refs.uToast.show({
							// 修改成功
							title: this.i18n.information8,
							type: 'success',
						})
					}
				}).catch(err => {})
				this.show1 = false
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
	// 	min-height: 100vh;

	// 	.line {
	// 		background-color: #363737;
	// 	}

	// 	.fun_height {
	// 		background-color: #292B2B;
	// 	}

	// 	.bot_fun {
	// 		background-color: #292B2B;
	// 	}

	// 	.fun {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;

	// 		.black_text {
	// 			color: #FFFFFF !important;
	// 		}
	// 	}

	// 	.fun_box {
	// 		background-color: #292B2B;
	// 	}

	// 	// .fun_text {
	// 	// 	background-color: #292B2B;
	// 	// 	color: #AAAAAA !important;
	// 	// }
	// }

	.title {
		margin: 40rpx 0 24rpx 32rpx;
		// color: #AAAAAA;
		font-size: 26rpx;
	}

	.fun {
		height: 102rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		justify-content: space-between;
		align-items: center;
		// color: #333333;
		font-size: 28rpx;
		// background-color: #fff;


		.grey_text {
			// color: #999999;

			.uicon {
				margin-left: 20rpx;
			}
		}
	}


	.bot_fun {
		overflow: hidden;
		margin: 20rpx 30rpx;
		// background-color: #fff;
		border-radius: 20rpx;

		// .fun_plus {
		// 	height: 100rpx;
		// }

		// .fun_text {
		// 	color: #666666;
		// 	font-size: 26rpx;
		// 	padding: 0 30rpx 40rpx;
		// }
	}

	.fun_height {
		margin: 24rpx 30rpx 20rpx;
		border-radius: 20rpx;
		height: 130rpx;

		.avatarImg {
			width: 80rpx;
			height: 80rpx;
			overflow: hidden;
			border-radius: 50%;
		}

		.avatar {
			width: 100%;
		}
	}


	.fun_box {
		margin: 24rpx 30rpx 40rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.line {
		height: 1px;
		width: 90%;
		// background-color: #F2F2F2;
		margin: 0 auto;
	}

	.black_text {
		// color: #333333 !important;
	}

	.portraitPopup {
		width: 600rpx;
		height: 1000rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 90%;
			margin-top: 20rpx;
		}
	}

	.popupView {
		width: 600rpx;
		height: 340rpx;
		padding: 30rpx;
		position: relative;

		.inp {
			height: 100rpx;
			border-bottom: 1rpx solid;
		}

		.updateBtn {
			width: 300rpx;
			left: 50%;
			margin-left: -150rpx;
			bottom: 40rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 40rpx;
			position: absolute;
		}
	}

	.uploadImg {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 600rpx !important;
		width: 90%;
		padding: 30rpx;
		overflow: hidden;
		box-shadow: 0 0 10rpx 10rpx rgba($color: #000000, $alpha: 0.1);
	}

	.upload {
		margin-top: 20rpx;
	}

	.submit {
		width: 300rpx;
		margin-top: 30rpx;
	}
</style>
