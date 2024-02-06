<template>
	<view>
		<view class="authorize_title" :class="getThemeClass">
			<!-- <view class="line line_left"></view> -->
			{{text}}
			<!-- <view class="line line_right"></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: () => {
					return ''
				}
			}
		},
		name: "mytitle",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		color: #FFFFFF !important;

		// .line_left {
		// 	background: linear-gradient(-90deg, #E6BB81 0%, #292B2B 100%) !important;
		// }

		// .line_right {
		// 	background: linear-gradient(-90deg, #E6BB81 0%, #292B2B 100%) !important;
		// }
	}

	.authorize_title {
		display: flex;
		justify-content: flex-start;;
		color: #111111;
		font-size: 34rpx;
		font-weight: bold;
		margin-left: 30rpx;
		// margin-top: 106rpx;
		align-items: center;

		.line {
			width: 54rpx;
			height: 4rpx;
			margin: 0 28rpx;
		}

		// .line_left {
		// 	background: linear-gradient(-90deg, #E6BB81 0%, #FFFFFF 100%);
		// }

		// .line_right {
		// 	background: linear-gradient(90deg, #E6BB81 0%, #FFFFFF 100%);
		// }
	}
</style>
