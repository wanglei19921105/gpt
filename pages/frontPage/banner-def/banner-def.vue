<template>
	<view class="page" :class="getThemeClass">
		<view>
			<!-- <unavbar :title="i18n.banner1"></unavbar> -->
			<!-- <view class="line"></view> -->
			<view class="box">
				<!-- 标题 -->
				<view class="title">
					<!-- 国内领先的数字收藏品聚合平台 -->
				</view>
				<!-- 日期 -->
				<!-- <view class="time text-content">
					{{i18n.banner2}}：{{data.created_at}}
				</view> -->
				<image class="banner_img" :src="data.pic" mode="widthFix"></image>
				<!-- 使用说明 -->
				<view class="main_text">
					<u-parse :html="data.content"></u-parse>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{}
			};
		},
		onLoad(option) {
			if (option.id) {
				this.getBanner(option.id)
			}
		},
		methods: {
			getBanner(id) {
				this.$u.api.banner_detail({
					'id': id
				}).then(res => {
					if (res.code == 200) {
						this.data = res.data.detail
						uni.setNavigationBarTitle({
							title: res.data.detail.title
						})
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		margin: 0 30rpx;
	}

	// page {
	// 	width: 100%;
	// 	min-height: 100vh;
	// }

	// .page-black {
	// 	background-color: #1E2020;
	// 	height: 100vh;

	// 	.line {
	// 		background-color: #292B2B;
	// 	}

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.main_text {
	// 		color: #CCCCCC;
	// 	}

	// }

	.title {
		// color: #303030;
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 52rpx;
	}

	.line {
		height: 20rpx;
		// background-color: #F9F9F9;
	}

	.time {
		// color: #999999;
		font-size: 27rpx;
		margin-top: 40rpx;
	}

	.banner_img {
		width: 100%;
		margin-top: 50rpx;
	}

	.main_text {
		margin-top: 64rpx;
		// color: #333333;
		line-height: 1.8;
		font-size: 27rpx;
	}
</style>
