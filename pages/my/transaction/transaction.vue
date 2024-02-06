<template>
	<view class="page" :class="getThemeClass">
		<!-- 交易记录 -->
		<!-- <unavbar :title="i18n.deal1"></unavbar> -->
		<u-tabs
			:list="tabs" 
			:is-scroll="false" 
			:current="current" 
			@change="change" 
			:active-color="getMainColor" 
			:inactive-color="getNavInactiveColor" 
			:bg-color="getBgColor"
			bar-width="50"
		></u-tabs>

		<empty v-if="!itemData.length"></empty>
		<view class="card card-bg" v-for="(item, index) in itemData" :key="index">
			<view class="u-m-b-20" v-if="item.order_no">
				<text class="text-content u-font-28">订单号：</text>
				<text class="text-content u-font-28 ">{{item.order_no}}</text>
				<image
					style="width: 20rpx;height:20rpx;"
					src="../../../static/images/copy.png"
					mode="aspectFit" 
					@click="copy(item.order_no)"
				></image>
			</view>
			<view class="card_top">
				<view class="card_left">
					<view class="cover_img"><image :src="item.cover" mode="aspectFit"></image></view>
					<view class="middle_box">
						<view class="casting_head">
							<view>{{ item.title }}</view>
							<!-- 数量 -->
							<view class="quantity text-content">{{ i18n.deal2 }}:1</view>
						</view>
						<view class="red_text color-red">
							{{ item.price }}
							<text>USDT</text>
						</view>
					</view>
				</view>
				<view class="card_right">
					<view class="past_time text-tips">{{ item.created_at }}</view>
					<view
						:class="
							item.type == 2 ? 'color-green' : '' || item.type == 3 ? 'yellow_text' : '' || item.type == 4 ? 'color-green' : '' || item.type == 5 ? 'color-green' : ''
						"
					>
						<!-- 3售出4买入5拍卖卖出6拍卖买入7盲盒 -->
						{{
							item.type == 1
								? i18n.deal3
								: '' || item.type == 2
								? i18n.deal4
								: '' || item.type == 3
								? i18n.deal5
								: '' || item.type == 4
								? i18n.deal6
								: '' || item.type == 5
								? i18n.deal7
								: ''
						}}
					</view>
				</view>
			</view>
			<view class="process text-tips">
				<!-- 从-到 -->
				{{ i18n.deal9 }}
				<text class="text-main">{{ item.from }}</text>
				{{ i18n.deal8 }}
				<text class="text-main">{{ item.to }}</text>
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
				type: 1
			},
			tabs: [
				{
					name: '买入',
					value: 1
				},
				{
					name: '卖出',
					value: 2
				},
				{
					name: '合成',
					value: 3
				}
			],
			current: 0
		};
	},
	onShow() {
		this.tradeLog();
	},
	onReachBottom() {
		if (this.itemData.length >= this.params.limit) {
			this.params.limit += 10;
			this.tradeLog();
		} else {
			this.$refs.uToast.show({
				// 翻到底了~
				title: this.i18n.sell5,
				type: 'warning'
			});
		}
	},
	methods: {
		change(index) {
			this.current = index;
			this.params.type = this.tabs[this.current].value;
			this.tradeLog();
		},
		tradeLog() {
			this.$u.api.trade_log(this.params).then(res => {
				if (res.code == 200) {
					this.itemData = res.data.list.data;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
// .box {
// 	height: 100%;
// 	background-color: #f9f9f9;
// }

// page {
// 	background-color: #f9f9f9;
// }

// .page-black {
// 	background-color: #1e2020;
// 	min-height: 100vh;

// 	.card {
// 		background-color: #292b2b;

// 		.casting_head {
// 			color: #ffffff !important;
// 		}

// 		.red_text {
// 			color: #f7924c !important;
// 		}

// 		.process > text {
// 			color: #ffffff;
// 		}

// 		.coding {
// 			color: #ffffff;
// 		}
// 	}
// }

.card {
	margin: 20rpx 30rpx;
	padding: 30rpx 20rpx 0 30rpx;
	border-radius: 12rpx;
	// background-color: #fff;
	position: relative;

	.card_top {
		display: flex;
		justify-content: space-between;

		.card_left {
			display: flex;

			.cover_img {
				width: 200rpx;
				height: 200rpx;
				display: flex;
				align-items: center;
				overflow: hidden;
				border-radius: 10rpx;
			}

			image {
				width: 100%;
			}

			.middle_box {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.casting_head {
					margin-left: 30rpx;
					// color: #333333;
					font-size: 30rpx;
					font-weight: bold;

					view:nth-child(1) {
						width: 100%;
						white-space: nowrap;
					}

					.quantity {
						font-size: 26rpx;
						// color: #aaaaaa;
						font-weight: 500;
						margin-top: 14rpx;
					}
				}
			}

			.red_text {
				// color: #a11716;
				font-weight: bold;
				font-size: 32rpx;
				margin-left: 34rpx;

				text {
					font-size: 24rpx;
				}
			}
		}

		.card_right {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			// color: #d1514b;
			font-size: 28rpx;
			font-weight: bold;
			align-items: flex-end;
			position: absolute;
			right: 24rpx;
			top: 144rpx;

			.past_time {
				// color: #aaaaaa;
				font-size: 24rpx;
				font-weight: 500;
				margin-bottom: 12rpx;
			}
		}
	}

	.card_bot {
		display: flex;
		align-items: center;
		padding: 40rpx 0 42rpx;
		font-size: 26rpx;
		justify-content: space-between;

		.coding_text {
			// color: #999999;
		}

		.coding {
			display: flex;
			align-items: center;

			.copy_icon {
				width: 22rpx;
				margin-left: 20rpx;
			}
		}
	}

	.process {
		margin-top: 42rpx;
		padding-bottom: 40rpx;
		font-size: 26rpx;
		// color: #666666;

		text {
			// color: #111111;
			margin: 0 18rpx;
		}
	}
}
</style>
