<template>
	<view class="page" :class="getThemeClass">
		<!-- 关于我们 -->
		<!-- <unavbar :title="i18n.aboutus1"></unavbar> -->
		<!-- <view class="line"></view> -->
		<view class="box">
			<!-- <view class="main_text" v-html="content.content"></view> -->
			<u-parse class="u-p-30 text-main" :html="content.content" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			};
		},
		onShow() {
			this.userRule()
		},
		methods: {
			userRule() {
				this.$u.api.user_rule({
					type: 3
				}).then(res => {
					this.content = res.data.text
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 52rpx;
	}

	.time {
		font-size: 27rpx;
		margin-top: 40rpx;
	}

	.line {
		height: 20rpx;
	}

	.banner_img {
		width: 100%;
		margin-top: 50rpx;
	}

	.main_text {
		margin: 50rpx 30rpx;
		line-height: 1.8;
		font-size: 27rpx;
	}
</style>
