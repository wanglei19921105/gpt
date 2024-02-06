<template>
	<view class="page" :class="getThemeClass">
		<!-- 我卖出的 -->
		<!-- <unavbar :title="i18n.sell1"></unavbar> -->
		<empty v-if="!itemData.length"></empty>
		<view class="card-bg head_img" v-for="(item,index) in itemData" :key="index">
			<view class="flex ">
				<image class="head_img-image" :src="item.cover" mode="widthFix"></image>
				<view class="casting_info">
					<view class="casting_head">
						<view class="head_left">
							<view class="name">{{item.title}}</view>
							
						</view>
						<view class="head_right">
							{{item.status}}
						</view>
					</view>
					<view class="casting_flex">
						<view class="casting_right">
							<image class="avatar" :src="item.authorImg" mode="widthFix"></image>
							<view>{{item.author}}</view>
						</view>
					</view>
					<view class="casting_flex">
						<view class="flex align-center">
							<view class="casting_left text-call">{{i18n.sell3}}:</view>
							<view class="casting_right">
								<view>{{item.to}}</view>
							</view>
						</view>
						<view class="price color-red">{{item.price}}USDT</view>
					</view>
				</view>
			</view>
			<view class="flex justify-between align-center u-p-l-20 u-p-r-30 size-24">
				<!-- 完成时间 -->
				<view class="text-call">{{i18n.sell4}}</view>
				<view class="text-content">{{item.created_at}}</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				params: {
					page: 1,
					limit: 10,
					type: 2
				}
			};
		},
		onShow() {
			this.tradeLog()
		},
		onReachBottom() {
			let that = this
			if (that.itemData.length >= that.params.limit) {
				that.params.limit += 10
				that.tradeLog()
			} else {
				this.$refs.uToast.show({
					// 翻到底了~
					title: this.i18n.sell5,
					type: 'warning',
				})
			}
		},
		methods: {
			tradeLog() { //获取我卖出的数据
				this.$u.api.trade_log(this.params).then(res => {
					if (res.code == 200) {
						this.itemData = res.data.list.data
					}
				}).catch(err => {

				})
			},
			defCli(id) {
				uni.navigateTo({
					url: '../sell-def/sell-def?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head_img {
		margin: 30rpx;
		margin-bottom: 0;
		border-radius: 10rpx;
		padding-left: 18rpx;
		padding-bottom: 20rpx;
		// background-color: #fff;
		// &-image{
		// 	border-radius: 30rpx;
		// }
		image {
			width: 208rpx;
		}
	}

	.casting_info {
		padding: 0 30rpx;
		width: 400rpx;

		.casting_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;

			.name {
				// color: #111111;
				font-size: 32rpx;
				// margin-bottom: 36rpx;
				font-weight: bold;
			}

			.head_right {
				color: #03AD73;
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.casting_flex {
			height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;

			.casting_right {
				display: flex;
				align-items: center;
				margin-left: 30rpx;

				.avatar {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					margin-right: 24rpx;
				}

				.uicon {
					margin-left: 20rpx;
					width: 22rpx;
					border-radius: 0;
				}
			}
		}
	}
</style>
