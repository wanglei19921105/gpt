<template>
	<u-popup v-model="show" mode="center">
		<view class="popup-box">
			<view class="popup-bg-one popup-bg-two"></view>
			<view class="gift-box">
				<image class="gift" src="../../static/images/gift.png" mode=""></image>
			</view>
			<view class="popup-bg-one">
				<view class="popup-main-box">
					<view class="popup-main">
						<view class="title" v-if="data">
							恭喜获得{{data.type == 0 ? data.goods_info.products_title : data.type == 1? `${data.reward_num}元` : `${data.reward_num}积分`}}
						</view>
						<view class="continuous">
							累计签到{{continuous}}天
						</view>
						<view class="alright" @click="close">
							好的
						</view>
					</view>
				</view>
			</view>
			<u-icon @click="close" class="close-circle" name="close-circle" color="#fff" size="50"></u-icon>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				data: null,
				show: false,
				continuous: 0
			}
		}, 
		methods: {
			open(data = null, continuous =0) { 
				this.continuous = continuous + 1;
				this.data = data;
				this.show = true;
			},
			close() {
				this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-box {
		position: relative;
		width: 600rpx;
		height: 800rpx;

		.gift-box {
			z-index: 3;
			position: absolute;
			left: 50%;
			top: 0;
			transform: translate(-50%, 0%);
			width: 244rpx;
			height: 244rpx;

			.gift {
				width: 100%;
				height: 100%;
			}
		}

		.popup-bg-one {
			z-index: 2;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 526rpx;
			height: 540rpx;
			background: linear-gradient(181deg, #73F5A2 0%, #FFFFFF 34%, #FFFFFF 72%, #89EFF7 100%);
			border-radius: 50rpx;
			transform: translate(-50%, -50%) rotate(10deg);
			border: 2rpx solid #fff;
		}

		.popup-bg-two {
			border: none;
			z-index: 1;
			transform: translate(-50%, -50%) rotate(0deg);
		}

		.popup-main-box {
			transform: rotate(-10deg);
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.popup-main {
				width: 100%;
				height: 500rpx;
				padding: 100rpx 30rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				.title {
					width: 100%;
					font-size: 52rpx;
					font-weight: 600;
					color: #89EFF7;
					margin-bottom: 16rpx;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: center;
				}

				.continuous {
					font-size: 32rpx;
					color: #B6B6B6;
					position: relative;
					text-align: center;
					margin-bottom: 70rpx;

					&::before {
						content: '';
						position: absolute;
						top: 50%;
						left: -40rpx;
						width: 20rpx;
						height: 2rpx;
						background: linear-gradient(90deg, #89EFF7 0%, #86F9AF 100%);
					}

					&::after {
						content: '';
						position: absolute;
						top: 50%;
						right: -40rpx;
						width: 20rpx;
						height: 2rpx;
						background: linear-gradient(90deg, #89EFF7 0%, #86F9AF 100%);
					}
				}

				.alright {
					width: 338rpx;
					height: 70rpx;
					background: linear-gradient(90deg, #89EFF7 0%, #86F9AF 100%);
					border-radius: 200rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 32rpx;
					color: #fff;
					font-weight: 500;
				}
			}
		}
	}

	.close-circle {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
	}

	/deep/.u-mode-center-box {
		background-color: transparent !important;
	}
</style>