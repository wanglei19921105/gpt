<template>
	<view class="waiting">
		<image src="/static/images/noData.png" class="waiting-img"></image>
		<view class="text-center size-28 color-a margin-top-35">敬请期待</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #292B2B;
	}
	.waiting{
		width: 750rpx;
		height: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.waiting-img{
			width: 276rpx;
			height: 317rpx;
		}
	}
</style>