<template>
	<view class="page">
	<view class="top" @click="fanh">
		<u-icon name="arrow-left" style="margin-left: 30rpx;" color="#ffffff" size="36"></u-icon>
	</view>
		<view class="floor" ref="container">
			
			<view class="back" >
				
				<view  v-for="(item,index) in list" :key="index" style="position: relative;"
					:class="`star-${item.floor}`" @click="add(item.floor)">
					<view class="">
						{{item.floor}}
					</view>
					<view class="ass">
						<view class="mz">
							{{item.title}}
						</view>
						<view class="">
							<view class="renshu" v-if="item.percentage!='100%'">
								<u-icon name="man-add-fill" color="#9BA1A4" size="20"></u-icon>{{item.percentage}}
							</view>
							<view class="renshu" style="color:#E5524D ;" v-if="item.percentage=='100%'">
								<u-icon name="man-add-fill" color="#E5524D" size="20"></u-icon>满员
							</view>
						</view>
					</view>
				</view>

			</view>

			<view class="xian">
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
				<image src="../../../static/images/wire.png" class="wire" mode=""></image>
			</view>

		</view>

		<view class="tz" @click="open">
			跳转楼层
		</view>
		<uni-popup ref="popup" type="center">
			<view class="kapian">

				<view class="select">
					选择指定的楼层
				</view>
				<view class="neirong">
					第<input type="text" v-model="data" maxlength="3" class="input">层数
				</view>
				<view class="tishi">
					提示：请输入1-100的整数
				</view>
				<view class="button">
					<view class="" style="background-color: #2B2C2D; color:#A4A6AC ;" @click="close">
						取消跳转
					</view>
					<view class="affirm" style="" @click="qd(data)">
						确定跳转
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
				star_id: '',
				data: [],
				list: [],
			}
		},
		 mounted() {
		    
		    this.$nextTick(() => {
		      const container = this.$refs.container.$el
		      if (container) {
		        container.scrollTop = container.scrollHeight
		      }
		    })
		  },
		onLoad(option) {
			this.dibu()
			this.star_id = option.id
			console.log(this.id);
			this.$u.api.starDetail({
				star_id: this.star_id
			}).then(res => {
				this.list = res.data.floor_info.reverse()
				// this.list = res.data.floor_info
				// console.log(this.list);
				this.close()
			})
		},
		methods: {
			fanh() {
				uni.navigateBack()
			},
			dibu() {
				setTimeout(() => {
				   uni.pageScrollTo({scrollTop: 99999, duration: 0});
				}, 50);

			},
			qd(id) {
				let data = {
					id: id,
					star_id: this.star_id
				}
				uni.navigateTo({
					// url: `./cursor?id=${params}`
					url: './cursor?data=' + encodeURIComponent(JSON.stringify(data)),
				})

				// uni.navigateTo({
				// 	url: `./cursor?id=${id}`
				// })
			},
			tioazhuan() {

			},
			open(item) {
				this.$refs.popup.open()

				// console.log(this.list);
			},
			close() {
				this.$refs.popup.close()
			},
			add(id) {
				let data = {
					id: id,
					star_id: this.star_id
				}
				uni.navigateTo({
					// url: `./cursor?id=${params}`
					url: './cursor?data=' + encodeURIComponent(JSON.stringify(data)),
				})

			},
			// arr() {
			// 	this.$u.api.starIndex().then(res => {
			// 		this.data = res.data.list
			// 		console.log(this.data);
			// 	})
			// }
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
	.ass {
		position: absolute;
		left: -50rpx;
		bottom: -50rpx;
	}

	.xian {
		margin-top: -30rpx;
		margin-left: 50rpx;
		
	}

	.back {
		
		position: absolute;
		// left: 100rpx;
		margin-top: -125rpx;
		margin-left: 50rpx;
		z-index: 1;

		>view {
			
			width: 100rpx;
			height: 85rpx;
			background-image: url('../../../static/images/taizi.png');
			background-size: cover;
			display: flex;
			padding: 20rpx;
			margin-top: 65rpx;
			justify-content: center;
		}

		.star-1,
		.star-11,
		.star-21,
		.star-31,
		.star-41,
		.star-51,
		.star-61,
		.star-71,
		.star-81,
		.star-91 {
			margin-left: 20rpx;
		}

		.star-2,
		.star-12,
		.star-22,
		.star-32,
		.star-42,
		.star-52,
		.star-62,
		.star-72,
		.star-82,
		.star-92 {
			margin-left: 50rpx;
		}

		.star-3,
		.star-13,
		.star-23,
		.star-33,
		.star-43,
		.star-53,
		.star-63,
		.star-73,
		.star-83,
		.star-93 {
			margin-left: 100rpx;
		}

		.star-4,
		.star-14,
		.star-24,
		.star-34,
		.star-44,
		.star-54,
		.star-64,
		.star-74,
		.star-84,
		.star-94 {
			margin-left: 135rpx;
		}

		.star-5,
		.star-15,
		.star-25,
		.star-35,
		.star-45,
		.star-55,
		.star-65,
		.star-75,
		.star-85,
		.star-95 {
			margin-left: 110rpx;
		}

		.star-6,
		.star-16,
		.star-26,
		.star-36,
		.star-46,
		.star-56,
		.star-66,
		.star-76,
		.star-86,
		.star-96 {
			margin-left:40rpx;
		}

		.star-7,
		.star-17,
		.star-27,
		.star-37,
		.star-47,
		.star-57,
		.star-67,
		.star-77,
		.star-87,
		.star-97 {
			margin-left: -20rpx;
		}

		.star-8,
		.star-18,
		.star-28,
		.star-38,
		.star-48,
		.star-58,
		.star-68,
		.star-78,
		.star-88,
		.star-98 {
			margin-left: -50rpx;
		}

		.star-9,
		.star-19,
		.star-29,
		.star-39,
		.star-49,
		.star-59,
		.star-69,
		.star-79,
		.star-89,
		.star-99 {
			margin-left: -40rpx;
		}
	}

	.floor {
		padding: 300rpx 0 ;
		margin-top: -200rpx;
		position: relative;
		display: flex;
		margin-left: 250rpx;
		width: 300rpx;
		overflow-y: scroll;
		height: 100%;
	}

	.wire {
		// position: absolute;
		// left: 280rpx;
		width: 190rpx;
		height: 1465rpx;
		
	}

	.tishi {
		font-size: 20rpx;
		font-weight: 400;
		margin-top: 30rpx;
		color: #e8e8e8;
		line-height: 0rpx;
	}

	.select {
		margin-top: 50rpx;
		color: #fff;
		font-size: 34rpx;
		font-weight: 500;
		line-height: 0rpx;
	}

	.affirm {
		background-color: #00E2E2;
		color: #111926;
		margin-left: 30rpx;
	}

	.input {
		width: 130rpx;
		height: 54rpx;
		background: #2B2C2D;
		border-radius: 8rpx 8rpx 8rpx 8rpx;
		opacity: 1;
		margin: 0 10rpx;
	}

	.tz {
		z-index: 2;
		position: absolute;
		bottom: 50rpx;
		left: 275rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 0rpx;
		width: 200rpx;
		height: 94rpx;
		background: #656A7B;
		box-shadow: 0rpx 6rpx 1rpx 1rpx #2E374A, inset 0rpx -6rpx 14rpx 1rpx #4C5469;
		border-radius: 47rpx 47rpx 47rpx 47rpx;
		
	}

	.aaa {
		height: 2000rpx;
		width: 10rpx;
		background-color: #9BA1A4;
		margin-left: 20rpx;

	}

	.button {
		margin-top: 100rpx;
		display: flex;
		justify-content: space-between;
		width: 400rpx;


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
		color: #a9abad;
		margin-top: 20rpx;
		align-items: center;
		margin-top: 50rpx;
	}

	.kapian {
		width: 540rpx;
		height: 420rpx;
		background: #1C1D1E;
		border-radius: 44rpx 44rpx 44rpx 44rpx;
		opacity: 1;
		border: 1rpx solid rgba(225, 215, 191, 0.3);

		>view {
			width: 100%;

			display: flex;
			justify-content: center;
		}
	}

	.page {
		width: 750rpx;
		position: relative;
		height: 100vh;
		overflow: auto;
		background-image: url('../../../static/images/xhbj.png');
		background-size: cover;

		.mz {
			margin-top: 10rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 0rpx;
		}

		.renshu {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 80rpx;
			height: 37rpx;
			margin-left: 60rpx;
			background: #2D3139;
			border-radius: 6rpx 6rpx 6rpx 6rpx;
			font-size: 16rpx;
			font-weight: 400;
			color: #9BA1A4;
			line-height: 0rpx;
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


	}
</style>