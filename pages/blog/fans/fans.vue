<template>
	<!-- 我的粉丝 - 暂已弃用 -->
	<view class="box"  :class="curScreenStyle? 'page-black' : 'page-white'">
		<!-- <unavbar title="我的粉丝"></unavbar> -->
		<image class="no_data" src="../../../static/images/noData.png" mode="widthFix"></image>
		<view class="no_datatext">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F9F9F9;
	}
	.page-black{
		background-color: #1E2020!important;
		min-height: 100vh;
	}

	.box {
		background-color: #F9F9F9;
		height: 100%;
		padding-top: 340rpx;
	}

	.no_data {
		position: fixed;
		width: 184rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

	.no_datatext {
		text-align: center;
		color: #AAAAAA;
		font-size: 28rpx;
		margin-top: 560rpx;
	}
</style>
