<template>
	<view class="page" :class="getThemeClass">
		<!-- 公告详情 -->
		<!-- <unavbar :title="i18n.blog1"></unavbar> -->
		<!-- 标题 -->
		<view class="title text-main">
			{{blogsData.title}}
		</view>

		<view class="tiem text-tips">
			<!-- 上架时间 -->
			<view>{{blogsData.created_at}}</view>
			<view class="browse">
				<u-icon class="eye_icon" name="eye" size="38"></u-icon>
				<!-- 浏览量 -->
				<view>{{blogsData.view_num}}</view>
			</view>
		</view>
		<!-- 使用说明 -->
		<u-parse class="illustrate" :html="blogsData.content" />
		<!-- <view class="illustrate" v-html="blogsData.content"></view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				blogsData: {}
			};
		},
		onLoad(options) {
			this.id = Number(options.id)
			this.blogsDetail()
		},
		methods: {
			blogsDetail() {
				this.$u.api.news_detail({
					'id': this.id
				}).then(res => {
					if (res.code == 200) {
						this.blogsData = res.data.detail
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		// background-color: #1E2020;
		

		// .line {
		// 	background-color: #292B2B;
		// }

		// .title {
		// 	color: #FFFFFF;
		// }

		.illustrate {
			color: #CCCDCF;
		}
	}
	.page {
		padding-top: 52rpx;
	}
	.title {
		font-size: 36rpx;
		// color: #303030;
		margin: 0rpx 30rpx 0rpx 40rpx;
		font-weight: bold;
	}

	.tiem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// color: #999999;
		font-size: 27rpx;
		margin: 40rpx 30rpx 50rpx;

		.browse {
			display: flex;
			align-items: center;

			.eye_icon {
				margin-right: 12rpx;
			}
		}
	}

	.line {
		height: 20rpx;
		// background-color: #F9F9F9;
	}

	.banner_img {
		margin: 50rpx 30rpx 64rpx;

		image {
			width: 100%;
		}
	}

	.illustrate {
		margin: 64rpx 30rpx 0;
	}
	
</style>
