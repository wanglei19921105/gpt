<template>
	<view class="page">
		<view class="top" @click="fanh">
			<u-icon name="arrow-left" style="margin-left: 30rpx;" color="#ffffff" size="36"></u-icon>
		</view>
		<view class="name">
			<image src="../../../static/images/henkuai.png" mode=""></image>
			<view class="">
				选择一颗你喜欢的星球，成为该星球的居民吧~
			</view>
		</view>
		<image src="../../../static/images/xian.png" class="xian" mode=""></image>
		<view v-for="(item,index) in data" :key="index" :class="`star-${item.id}`" @click="open(item)"
			style="text-align: center;">
			<view class="xingq">
				<image :src="item.pic" mode=""></image>
				<view class="wkf" v-if="item.status==0">
					<image src="../../../static/images/7934.png" style="width: 40rpx; height: 40rpx;" mode=""></image>
				</view>
			</view>

			<view class="ass">
				<view class="mz">
					{{item.title}}
				</view>
				<view class="renshu" v-if="item.percentage!='100%'">
					<image src="../../../static/images/rs.png" style="width: 20rpx; height: 20rpx;margin-right: 5rpx;"  mode=""></image>
					{{item.percentage}}
				</view>
				<view class="renshu" style="color:#E5524D ;" v-if="item.percentage=='100%'">
					<u-icon name="man-add-fill" color="#E5524D" size="20"></u-icon>满员
				</view>
			</view>

		</view>
		<uni-popup ref="popup" type="center">
			<view class="kapian">
				<view class="">
					<image :src="list.pic" style="width: 140rpx; height: 140rpx;margin-top: 50rpx;" mode=""></image>
				</view>
				<view class="" style="color: #fff;">
					{{list.title}}
				</view>
				<view class="neirong">
					{{list.introduction}}
				</view>
				<view class="button">
					<view class="" style="background-color: #2B2C2D; color:#A4A6AC ;" @click="close">
						我在想想
					</view>
					<view class="" style="background-color:#00E2E2 ; color: #111926;" @click="add(list.id)">
						确定选它
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				data: [],
				list: [],
			}
		},
		onLoad() {
			this.arr()
		},
		methods: {
			fanh() {
				uni.navigateBack()
			},
			open(item) {
				
				// if(item.percentage=='100%'){
				// 	uni.showToast({
				// 	  title: '当前星球已满员',
				// 	  icon: 'none',
				// 	  duration: 2000
				// 	});
				// }else{
					if(item.status==0){
						uni.showToast({
						  title: '星球尚未开放',
						  icon: 'none',
						  duration: 2000
						});
					}else{
						this.$refs.popup.open()
						this.list = item
					}
				// }

			},
			close() {
				this.$refs.popup.close()
			},
			add(id) {
				uni.navigateTo({
					url: `./floor?id=${id}`
				})
				this.close()
			},
			arr() {
				this.$u.api.starIndex().then(res => {
					this.data = res.data.list
					console.log(res);
					this.close()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		position: absolute;
		
		display: flex;
		width: 750rpx;
		align-items: center;
		height: 100rpx;
		justify-content: space-between;
		font-size: 36rpx;
	}
	.xingq{
		position: relative;
		.wkf{
			position: absolute;
			top: 3%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 90%;
			height: 85%;
			left: 4.5%;
			border-radius: 60rpx;
			 background-color: rgba(0, 0, 0, 0.5);
		}
	}
	.button {
		display: flex;
		justify-content: space-between;
		width: 400rpx;
		margin-left: 80rpx;

		>view {
			border-radius: 60rpx;
			width: 160rpx;
			height: 74rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.neirong {
		width: 480rpx;
		margin-left: 30rpx;
		color: #a9abad;
		margin-top: 20rpx;
		height: 150rpx;
	}

	.kapian {
		text-align: center;
		width: 540rpx;
		height: 580rpx;
		background: #1C1D1E;
		border-radius: 44rpx 44rpx 44rpx 44rpx;
		opacity: 1;
		border: 1rpx solid rgba(225, 215, 191, 0.4);
	}

	.page {
		width: 750rpx;
		position: relative;
		height: 2400rpx;
		background-image: url('../../../static/images/beijing.png');
		background-size: cover;

		.mz {
			margin-top: 10rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 0rpx;
		}

		.renshu {
			width: 120rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			background: #2D3139;
			border-radius: 6rpx 6rpx 6rpx 6rpx;
			font-size: 16rpx;
			font-weight: 400;
			color: #9BA1A4;

		}

		// background-color: #7b7bb8;
		.name {
			width: 750rpx;
			margin-top: 420rpx;
			text-align: center;

			>image {
				width: 418rpx;
				height: 56rpx;
			}

			>view {
				margin-top: 30rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 0rpx;
			}
		}

		.xian {
			position: absolute;
			top: 600rpx;
			left: 80rpx;
			width: 600rpx;
			height: 1500rpx;
		}

		.star-1 {
			position: absolute;
			top: 580rpx;
			right: 130rpx;

			.renshu {
				margin-left: 25rpx;
			}

			image {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.star-2 {
			position: absolute;
			top: 800rpx;
			left: 60rpx;

			.renshu {
				margin-left: 25rpx;
			}

			image {
				width: 180rpx;
				height: 180rpx;
			}
		}

		.star-3 {
			display: flex;
			position: absolute;
			top: 980rpx;
			right: 100rpx;

			

			image {
				width: 122rpx;
				height: 122rpx;
			}
		}

		.star-4 {
			position: absolute;
			top: 1220rpx;
			left: 420rpx;

			image {
				width: 127rpx;
				height: 127rpx;
			}
		}

		.star-5 {
			display: flex;
			position: absolute;
			top: 1430rpx;
			left: 90rpx;
			.ass{
				margin-top: 30rpx;
			}
			image {
				width: 130rpx;
				height: 130rpx;
			}
		}

		.star-6 {
			position: absolute;
			top: 1550rpx;
			right: 150rpx;
			display: flex;

			image {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.star-7 {
			position: absolute;
			top: 1950rpx;
			left: 110rpx;
			display: flex;
			.ass{
				margin-top: 90rpx;
			}
			image {
				width: 177rpx;
				height: 177rpx;
			}
		}
		.star-8 {
			position: absolute;
			top: 1800rpx;
			left: 380rpx;
			display: flex;
			.ass{
				margin-top: 90rpx;
			}
			image {
				width: 162rpx;
				height: 162rpx;
			}
		}
	}
</style>