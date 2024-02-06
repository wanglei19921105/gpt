<template>
	<view class="page" :class="getThemeClass">
		<view v-if="current == 0">
			<empty v-if="!listData.length"></empty>
			<view class="auction_item card-bg" v-for="(item,index) in listData" :key="index">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<!-- NFT铸品名称 -->
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red"><text>当前最高出价：</text>
									{{item.last_auctions_price}}USDT
								</view>
							</view>
							<view class="head_right" v-if="item.auction_status === 0">拍卖中</view>
							<view class="head_right color-red" v-if="item.auction_status === 1">已结束</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">起拍价</view>
							<view class="casting_right">
								<view class="weight_bold">{{item.min_price}}USDT</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">保证金</view>
							<view class="casting_right">
								<view class="weight_bold">{{item.bail}}USDT</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">参与人数</view>
							<view class="casting_right">
								<view class="weight_bold">{{item.participants || '暂无'}}</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">成交用户</view>
							<view class="casting_right">
								<view class="weight_bold">{{ !item.winer_user? '暂无' : item.winer_user.phone}}</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">成交价</view>
							<view class="casting_right">
								<view class="weight_bold">{{ !item.winer_user? '暂无' : item.winer_user.price}}</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">成交用户支付状态</view>
							<view class="casting_right">
								<view class="weight_bold">{{ !item.winer_user? '暂无成交用户' : item.winer_user.pay_status === 1? '已支付' : '未支付'}}</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<view class="casting_left text-call">结束时间</view>
							<view class="casting_right text-content">
								<view>{{item.end_time}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				params: {
					page: 0,
					limit: 10
				},
				listData: {}, //我的竞拍数据
				listStatus: 'loading',
			};
		},
		onLoad(option) {
			this.loadData(true)
		},
		onPullDownRefresh() {
			this.loadData(true)
		},
		onReachBottom() {
			if (this.listStatus === 'loadmore') {
				this.loadData()
			} else {
				this.$refs.uToast.show({
					// 已经翻到底啦~
					title: this.i18n.artist3,
					type: 'warning',
				})
			}
		},
		methods: {
			loadData(reset) {
			
				if(reset){
					this.params.page = 0
					this.listData = []
				}
				this.params.page += 1
				this.listStatus = 'loading'
			
				this.$u.api.started_auction(this.params).then(res => {
					if (res.code == 200) {
						this.listData = this.listData.concat(res.data.list.data)
						this.listStatus = res.data.list.next_page_url ? 'loadmore' : 'nomore'
						uni.stopPullDownRefresh()
					}
				}).catch(err => {
					uni.stopPullDownRefresh()
					this.listStatus = 'loadmore'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

	.weight_bold {
		font-weight: bold;
	}

	.auction_item {
		margin: 20rpx 30rpx 30rpx;
		border-radius: 30rpx;
		overflow: hidden;
		padding-bottom: 40rpx;
	}

	.head_img {
		image {
			width: 100%;
		}
	}

	.casting_info {
		padding: 0 30rpx;

		.casting_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 230rpx;

			.name {
				font-size: 32rpx;
				margin-bottom: 36rpx;
				font-weight: bold;
			}

			.price {
				font-size: 38rpx;
				font-weight: bold;

				text {
					font-size: 26rpx;
				}
			}

			.head_right {
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.casting_flex {
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.casting_left {
				font-size: 26rpx;
			}

			.casting_right {
				font-size: 28rpx;
				display: flex;
				align-items: center;

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

		.casting_flex+.casting_flex {
			border-top: 1px solid;
		}
	}

	.audit {
		margin: 40rpx 30rpx;
		background-color: #D2D2D2;
		color: #fff;
		font-size: 30rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 10rpx;
	}

	.release {
		margin: 40rpx 30rpx;
		background-color: #D1514B;
		color: #fff;
		font-size: 30rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 10rpx;
	}
</style>
