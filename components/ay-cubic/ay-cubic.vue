<template>
	<view @click="$emit('click')">
		<view class="box">
			<view class="box-item">
				<view>
					<image lazy-load="true" :src="img" mode="aspectFit"></image>
				</view>
				<view></view>
				<view>
					<image lazy-load="true" :src="img" mode="aspectFit"></image>
				</view>
				<view></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			img: "",
		},
		data() {
			return {

			};
		},
		created: function() {

		},
		methods: {


		},
	}
</script>

<style lang="scss">
	
	$size: 400rpx;
	$zSize: 20rpx;
	$blankColor: #474f55;
	
	.box {
		margin: 4% auto;
		width: $size;
		height: $size;
		position: relative;
		perspective: 1000rpx;
	}

	.box-item {
		width: 100%;
		height: 100%;
		position: absolute;
		transform-style: preserve-3d;
		animation: rotation 15s infinite linear;
		// animation: rotation 10s infinite ease-out;
	}

	.box-item:hover {
		animation-play-state: paused;
	}

	.box-item view {
		display: flex;
		position: absolute;
		width: 100%;
		height: 100%;
		// top: -60rpx;
		background: $blankColor;
		overflow: hidden;
		border: solid 10rpx $blankColor;
	}

	.box-item image {
		width: 100%;
		height: 100%;
		border-radius: $zSize;
		margin: auto;
	}

	.box-item image:hover {
		// filter: grayscale(1);
		transform: scale(1.2, 1.2);
	}

	.box-item view:nth-child(1) {
		transform: rotateY(0deg) translateZ($zSize - 1rpx);
	}

	.box-item view:nth-child(2) {
		transform: rotateY(90deg) translateZ(-$zSize + 1rpx);
		width: $zSize * 2;
		height: 100%;
		border: none;
	}

	.box-item view:nth-child(3) {
		transform: rotateY(180deg) translateZ($zSize - 1rpx);
	}

	.box-item view:nth-child(4) {
		transform: rotateY(90deg) translateZ($size - $zSize - 1rpx);
		width: $zSize * 2;
		height: 100%;
		border: none;
	}


	@keyframes rotation {
		0% {
			transform: rotateY(0deg);
		}
		
		// 25% {
		// 	transform: rotateY(30deg);
		// }
		
		// 50% {
		// 	transform: rotateY(0deg);
		// }
		
		// 75% {
		// 	transform: rotateY(-30deg);
		// }

		100% {
			transform: rotateY(360deg);
			// transform: rotateY(0deg);
		}
	}
</style>
