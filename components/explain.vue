<template>
	<view>
			<mytitle :text="text" class="my_title"></mytitle>
		<view class="illustrate card-bg" :class="getThemeClass">
			<!-- <view class="size-34 text-center">— {{text}} —</view> -->
			<view class="illustrate_con" v-html="cont">
				<!-- {{cont}} -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "explain",
		props: {
			text: {
				type: String,
				default: () => {
					return ''
				}
			},
			cont: {
				type: String,
				default: () => {
					return ''
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		// background-color: #292B2B !important;

		.illustrate_con {
			color: #CCCDCF !important;
		}
	}

	.illustrate {
		// background-color: #fff;
		padding: 32rpx 36rpx 40rpx;
		margin: 24rpx 30rpx;
		border-radius: 20rpx;

		.illustrate_con {
			margin-top: 35rpx;
			line-height: 1.6;
			font-size: 28rpx;
			color: #9B9B9B;
		}
	}
</style>
