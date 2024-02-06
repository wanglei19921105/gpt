<template>
	<view :class="getThemeClass">
		<view class="artist card-bg" v-for="(item,index) in list" :key="index" @click="go_cli(item.id,item.user_id)">
			<view class="artist_head">
				<view class="artist_left">
					<view class="avatar_img">
						<image :src="item.avatar||'/static/logo.png'" mode="widthFix"></image>
					</view>
					<view>
						<view class="artist_name text-main">{{item.nickname}}</view>
						<view class="artist_fan text-tips flex">
							<view class="">{{item.fans}} 粉丝</view>
							<view class="u-m-l-30">作品发行数量：{{item.cast_num}}</view>
						</view>
					</view>
				</view>
				<view :class="item.status?'focus-btn-bg':'focus-no-btn-bg'" @click="focuson(item.user_id)" @click.stop>
					{{item.status?'取消关注':'关注'}}
				</view>
			</view>
			<view class="artist_title u-p-30">
				{{item.cast?item.cast.title:'暂无作品'}}
			</view>
			<!-- <view class="artist_context">
				{{item.cast?item.cast.desc:'暂无简介'}}
			</view> -->
			<view class="artist_img" v-if="item.cast">
				<image :src="item.cast.cover" class="artist_img-image" mode="widthFix"></image>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		name: "artist",
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			go: {
				type: Number,
				default: () => {
					return 0
				}
			}
		},
		data() {
			return {

			};
		},
		mounted() {

		},
		methods: {
			// 0 跳转 艺术家空间
			// 1 跳转 NFT市场(艺术家代表作)
			go_cli(id, userid) {
				if (this.go == 0) {
					this.openWin('/pages/market/artist-space/artist-space?id=' + id + '&userid=' + userid)
				}
				if (this.go == 1) {
					uni.navigateTo({
						url: '/pages/market/artist-space/artist-space?id=' + id + '&userid=' + userid
					})
				}
			},
			// 关注/取消关注
			focuson(id) {
				if (!Boolean(uni.getStorageSync('token'))) {
					this.$refs.uToast.show({
						title: '需要先登录,2秒后进入登录页面',
						type: 'warning',
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/index/logInAccount'
						})
					}, 2000)
					return false
				}
				this.list.some((item) => {
					if (item.user_id == id) {
						// status为0 = 没关注
						if (!item.status) {
							this.$u.api.attention({
								'user_id': id
							}).then(res => {
								item.status = 1
							}).catch(err => {})
						} else {
							this.$u.api.callback_attention({
								'user_id': id
							}).then(res => {
								item.status = 0
							}).catch(err => {})
						}
						return true
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	// .page-black {


	// 	.artist {
	// 		background-color: #292B2B;

	// 		.artist_name {
	// 			color: #FFFFFF !important;
	// 		}

	// 		.focuson {
	// 			border: 1px solid #F7924C !important;
	// 			color: #F7924C !important;
	// 		}

	// 		.artist_title {
	// 			color: #fff;
	// 		}

	// 		.artist_context {
	// 			color: #AAAAAA;
	// 		}
	// 	}
	// }

	.artist {
		// background-color: #fff;
		margin: 30rpx;
		border-radius: 30rpx;
		overflow: hidden;

		.artist_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 38rpx 32rpx 0;

			.artist_left {
				display: flex;
				align-items: center;

				.avatar_img {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					margin-right: 24rpx;
					overflow: hidden;
				}

				image {
					width: 100%;
				}

				.artist_name {
					// color: #111111;
					font-size: 28rpx;
					font-weight: bold;
				}

				.artist_fan {
					font-size: 22rpx;
					// color: #999999;
				}
			}

			// .focuson {
			// 	width: 100rpx;
			// 	height: 46rpx;
			// 	border: 1px solid #764E39;
			// 	color: #764E39;
			// 	font-size: 22rpx;
			// 	text-align: center;
			// 	line-height: 46rpx;
			// 	border-radius: 24rpx;
			// }

			// .unsubscribe {
			// 	width: 120rpx;
			// 	height: 46rpx;
			// 	line-height: 46rpx;
			// 	text-align: center;
			// 	border-radius: 24rpx;
			// 	border: 1px solid #A2A2A2;
			// 	color: #999999;
			// 	font-size: 22rpx;
			// }
		}

		.artist_title {
			// color: #111111;
			font-size: 32rpx;
			font-weight: bold;
			// margin: 42rpx 0 0 36rpx;
		}

		.artist_context {
			margin: 30rpx 34rpx 40rpx;
			font-size: 26rpx;
		}

		.artist_img {
			.artist_img-image{
				width: 100%;
				display: block;
			}
		}
	}
</style>
