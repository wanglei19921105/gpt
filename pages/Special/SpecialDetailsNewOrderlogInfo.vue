
<template>
	<view class="page" :class="getThemeClass">
		<view class="order-content">
			<view class="title">投资金额</view>
			<view class="order-price">
				<text class="order-price-unit">￥</text>
				<text class="order-price-num">{{ purchaseLog.amount }}</text>
			</view>
			<view class="order-details">
				<view class="order-title">
					<text class="order-title-label" v-if="purchaseLog.snapshot">{{ purchaseLog.snapshot.name }}</text>
					<text class="order-title-value">{{ statusMap[purchaseLog.status] }}</text>
				</view>
				<view class="order-base-info">
					<view class="item">
						<view class="item-desc">{{ purchaseLog.returned_amount || 0 }}</view>
						<view class="item-title">预期收益</view>
					</view>
					<view class="item">
						<view class="item-desc">{{ returnTypeMap[purchaseLog.return_type] }}</view>
						<view class="item-title">收益方式</view>
					</view>
					<view class="item">
						<view class="item-desc">{{ purchaseLog.created_at }}</view>
						<view class="item-title">投资时间</view>
					</view>
					<view class="item">
						<view class="item-desc">{{ purchaseLog.end_date }}</view>
						<view class="item-title">到期时间</view>
					</view>
				</view>
			</view>
			<view class="income-content">
				<view class="income-list" v-for="(item, index) in cashbackLog" :key="index">
					<view class="num" v-if="isLastShowTitle(index)">本金偿还</view>
					<view class="num" v-else>第{{ index + 1 }}期</view>
					<view class="price-box">
						<view class="price-item">
							<view class="price-item-top first-item">
								<text class="price-item-unit">￥</text>
								<text class="price-item-num">{{ item.amount  }}</text>
							</view>
							<view class="price-item-title">应收总额</view>
						</view>
						<view class="price-box">
							<view class="price-item">
								<view class="price-item-top">
									<text class="price-item-unit">￥</text>
									<text class="price-item-num">{{ item.daily_principal  }}</text>
								</view>
								<view class="price-item-title">本金</view>
							</view>
						</view>
						<view class="price-box">
							<view class="price-item">
								<view class="price-item-top">
									<text class="price-item-unit">￥</text>
									<text class="price-item-num">{{ item.daily_interest  }}</text>
								</view>
								<view class="price-item-title">利息</view>
							</view>
						</view>
					</view>
					<view class="time">收益时间：{{ item.status === 0 ? item.cashback_date : item.published_at }}</view>
					<view class="status">
						<text class="no-status" v-if="item.status === 0">未结算</text>
						<view class="published" v-else>
							<text	ext class="status-value">{{ item.published_at }}</text>
							<text class="status-label">已结算</text>
							<text class="amount">{{ item.amount }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				page: 1,
				cashbackLog: {},
				purchaseLog: {},
				statusMap: {
					'NOT_STARTED': '未开始',
					'CASHBACK_IN_PROGRESS' : '进行中',
					'ENDED': '已完成',
				},
				returnTypeMap: {
					0: '每日返息，到期返本',
        	1: '每周返息，到期还本',
        	2: '每月返息，到期返本',
        	3: '到期还本还息',
        	4: '每小时返息，到期返本',
        	5: '保本保息，每日返本返息'
				},
			}
		},
		onLoad(e) {
      if(typeof(e.id) != 'undefined') {
        this.id = e.id
      }
			this.loadData()
		},
		methods: {
			isLastShowTitle(index) {
				const returnType = [0,1,2,4];
				if (returnType.includes(this.purchaseLog.return_type) && index === this.cashbackLog.length - 1) {
					return true
				}
			},
			loadData(){
				this.$u.api.getProjectGoodsReturnLog({
						page: this.page,
          	purchase_log_id: this.id ? this.id : '',
					}).then(res => {
					if (res.code == 200) {
						const data = res.data && res.data || {}
						this.cashbackLog = data.cashback_logs || {}
						this.purchaseLog = data.purchase_log || {}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.order-content {
	.title {
		font-family: PingFang SC;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 42rpx;
		margin-top: 60rpx;
		text-align: center;
	}
	.order-price {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		margin-top: 12rpx;
		.order-price-unit {
			font-family: PingFang SC;
			font-size: 36rpx;
			color: #FFC999;
			line-height: 75rpx;
		}
		.order-price-num {
			font-family: PingFang SC;
			font-size: 64rpx;
			color: #FFC999;
			line-height: 90rpx;
		}
	}
	.order-details {
		width: 690rpx;
		height: 380rpx;
		border-radius: 16rpx;
		background: #1A1B1E;
		margin: 40rpx auto 30rpx;
		padding: 30rpx 30rpx 12rpx;
		.order-title {
			display: flex;
			align-items: flex-end;
			.order-title-label {
				font-family: PingFang SC;
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
			.order-title-value {
				font-family: PingFang SC;
				font-size: 24rpx;
				color: #00FFD7;
				margin-left: 22rpx;
			}
		}
		.order-base-info {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			flex-wrap: wrap;
			.item {
				width: 306rpx;
				height: 120rpx;
				border-radius: 6rpx;
				background: #2A2D32;
				margin-bottom: 18rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.item-desc {
					font-family: PingFang SC;
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 34rpx;
					text-align: center;
				}
				.item-title {
					font-family: PingFang SC;
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.6);
					line-height: 31rpx;
					text-align: center;
					margin-top: 7rpx;
				}
			}
		}
	}
	.income-content {
		.income-list {
			width: 690rpx;
			height: 380rpx;
			border-radius: 16rpx;
			background: #1A1B1E;
			margin: 0 auto 30rpx;
			padding-top: 30rpx;
			overflow: hidden;
			.num {
				font-family: PingFang SC;
				font-size: 30rpx;
				color: #00FFD7;
				line-height: 42rpx;
				margin: 0 30rpx;
			}
			.price-box {
				display: flex;
				justify-content: space-between;
				margin: 16rpx 30rpx 0;
				.price-item {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: flex-end;
					.price-item-top {
						display: flex;
						align-items: flex-end;
						.price-item-unit {
							font-family: PingFang SC;
							font-size: 24rpx;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 34rpx;
						}
						.price-item-num {
							font-family: PingFang SC;
							font-size: 36rpx;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 50rpx;
						}
					}
					.first-item {
						.price-item-unit {
							font-family: PingFang SC;
							font-size: 36rpx;
							line-height: 75rpx;
						}
						.price-item-num {
							font-family: PingFang SC;
							font-size: 64rpx;
							line-height: 90rpx;
						}
					}
					.price-item-title {
						font-family: PingFang SC;
						font-size: 22rpx;
						color: #FFFFFF;
						line-height: 31rpx;
						text-align: center;
						margin-top: 6rpx;
					}
				}
			}
			.time {
				font-family: PingFang SC;
				font-size: 22rpx;
				color: rgba(255, 255, 255, 0.6);
				line-height: 31rpx;
				margin: 20rpx 30rpx 0;
			}
			.status {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 90rpx;
				margin-top: 32rpx;
				background: #222529;
				.no-status {
					font-family: PingFang SC;
					font-size: 28rpx;
					color: rgba(255, 255, 255, 0.4);
					line-height: 39rpx;
				}
				.published {
					display: flex;
					align-items: center;
					justify-content: center;
					.status-value {
						font-family: PingFang SC;
						font-size: 28rpx;
						color: #00FFD7;
					}
					.status-label {
						font-family: PingFang SC;
						font-size: 28rpx;
						color: #00FFD7;
						margin-left: 5rpx;
					}
					.amount {
						font-family: PingFang SC;
						font-size: 28rpx;
						color: #00FFD7;
					}
				}
			}
		}
	}
}
</style>
