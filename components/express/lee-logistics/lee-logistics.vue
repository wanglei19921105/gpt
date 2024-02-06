<template>
	<block v-if="data" class="card-bg">
		<scroll-view class="lee-logistics-scroll" :style="{ height }" scroll-y="true" v-if="data.data.length">
			<view class="lee-logistics">
				<!-- 物流公司与送达状态面板 -->
				<view class="lee-logistics-caption card-bg">
					<image class="lee-logistics-caption-logo" src="/static/components/express.png" mode="widthFix" />
					<view class="lee-logistics-caption-info">
						<view class="lee-logistics-caption-status">{{ data.info.status }}</view>
						<view class="lee-logistics-caption-nu">
							<text>{{ data.info.company }}：</text>
							<text>{{ data.info.nu }}</text>
						</view>
					</view>
				</view>
				<!-- 物流公司与送达状态面板END -->

				<!-- 物流信息列表 -->
				<view class="lee-logistics-list card-bg">
					<view class="lee-logistics-msg" v-for="(v, k) of data.data" :key="k">
						<view class="lee-logistics-msg-time">
							<view>{{ v.time.split(' ')[1] }}</view>
							<view>{{ v.time.split(' ')[0] }}</view>
						</view>
						<view class="lee-logistics-msg-context">
							<rich-text :nodes="v.context | contextFormatter"></rich-text>
						</view>
					</view>
				</view>
				<!-- 物流信息列表END -->
			</view>
		</scroll-view>
		<view class="lee-logistics-defults" :style="{ height }" v-else>
			<view class="lee-logistics-defults-icon leeIcon-empty"></view>
			<view class="lee-logistics-defults-title">暂无查询结果</view>
			<view class="lee-logistics-defults-intro">单号错误或暂未寄出</view>
		</view>
	</block>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default () {
					return null
				},
			},
			height: {
				type: String,
				default: '100%',
			},
		},
		filters: {
			contextFormatter(v) {
				return v.replace(/\d{11}/, (re) => `<span class="phoneText">${re}</span>`)
			},
		},
	}
</script>

<style lang="scss">
	@import './icon.scss';
.exp{
	color: #333333 !important;
}
	.lee-logistics-defults {
		display: flex;
		height: 100%;
		color: $uni-text-color-grey;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&-icon {
			font-size: 190rpx;
			font-weight: 600;
		}

		&-title {
			margin-bottom: 10rpx;
			font-size: 38rpx;
		}

		&-intro {
			font-size: 30rpx;
		}
	}

	.lee-logistics {
		padding: 30rpx;

		&-list {
			padding: 30rpx;
			padding-top: 50rpx;
			border-radius: 8rpx;
			box-shadow: 0 0 2rpx rgba(0, 0, 0, 0.15);
		}
	}

	.lee-logistics-caption {
		display: flex;
		padding: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 8rpx;
		box-shadow: 0 0 2rpx rgba(0, 0, 0, 0.15);
		align-items: center;

		&-logo {
			$size: 100rpx;

			width: $size;
			height: $size;
		}

		&-info {
			width: 0;
			margin-left: 30rpx;
			flex: 1;
		}

		&-status {
			margin-bottom: 10rpx;
			font-size: 34rpx;
			font-weight: 400;
		}

		&-nu {
			font-size: 30rpx;
		}
	}

	.lee-logistics-msg {
		display: flex;

		&-time {
			display: flex;
			width: 180rpx;
			padding-right: 30rpx;
			font-size: 24rpx;
			flex-direction: column;
			align-items: flex-end;
		}

		&-context {
			position: relative;
			width: 0;
			padding-bottom: 50rpx;
			padding-left: 30rpx;
			font-size: 30rpx;
			border-left: 2rpx solid $uni-border-color;
			flex: 1;

			&::before {
				--size: 20rpx;

				position: absolute;
				top: calc(-1 * var(--size) / 2);
				left: calc(-1 * var(--size) / 2);
				width: var(--size);
				height: var(--size);
				background-color: $uni-border-color;
				border-radius: 50%;
				content: '';
			}
		}

		&:last-child>&-context {
			border: none;
		}

		&:first-child>&-context {
			border-color: $uni-color-primary;
			border-left-style: dashed;

			&::before {
				--size: 30rpx;

				background-color: $uni-color-primary;
			}
		}
	}

	.phoneText {
		font-weight: 600;
		color: $uni-color-primary;
	}
</style>
