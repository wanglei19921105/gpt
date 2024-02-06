<template>
	<view style="width: 100%;">
		<view class="box">
			<image class="no_data" src="../static/images/noData.png" mode="widthFix"></image>
			<!-- <view class="no_datatext">
				暂无数据
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "empty",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		// position: fixed;
		// left: 0;
		// right: 0;
		// top: 0;
		// bottom: 0;
		margin: auto;
		width: 300rpx;
		height: 300rpx;
		text-align: center;
		padding-top: 20rpx;
	}

	.no_data {
		width: 184rpx;
	}

	.no_datatext {
		text-align: center;
		color: #AAAAAA;
		font-size: 28rpx;
	}
</style>
