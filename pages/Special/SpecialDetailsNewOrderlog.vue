<template>
	<view
		class="page"
		:class="getThemeClass">
		<empty v-if="!isLoading && !list.length"></empty>
		<!-- <view class="list">
			<view
				v-for="(item, index) in list"
				:key="index"
				@click="$u.route('/pages/Special/SpecialDetailsNewOrderlogInfo?id=' + item.id)"
				class="Unit MarginT_30rpx PaddingT_32rpx PaddingB_32rpx Width100 BorderR_20rpx">
				<view class="container">
					<view class="title-section Color_FFFFFF">
						<text class="title rate">{{ item.project.name }}</text>
					</view>
					<view class="rate-section">
						<text>
							<template v-if="item.return_type == 0">每日返息，到期返本 </template>
							<template v-if="item.return_type == 1">每周返息，到期还本 </template>
							<template v-if="item.return_type == 2">每月返息，到期返本 </template>
							<template v-if="item.return_type == 3">到期还本还息 </template>
							<template v-if="item.return_type == 4">每小时返息，到期返本 </template>
							<template v-if="item.return_type == 5">保本保息，每日返本返息 </template>
						</text>
					</view>
					<view class="rate-section">
					
						<text class="rate Color_C8C9CB"
							>{{ item.project.profit_rate }}%</text
						>
						<text class="rate-label">日收益率</text>
					</view>
					<view class="info-section">
						<view class="info-item">
							<text class="rate">{{item.yesterday}}元</text>
							<text class="info-label">昨日收益</text>
						</view>
						<view class="info-item">
							<text class="rate">{{item.total_sent}}元</text>
							<text class="info-label">累计收益</text>
						</view>
						<view class="info-item">
							<text class="rate">{{ item.amount }}元</text>
							<text class="info-label">投资金额</text>
						</view>
					</view>
					<view class="bottom-section">
						<view class="investment-term">
							<text class="term-label">投资期限：</text>
							<text
								class="rate term-value"
								style="color: aliceblue"
								>{{ item.project.keep_days }}天</text
							>
						</view>
					
						<view class="investment-status">
							<text class="status-label">投资状态：</text>
							<text v-if="item.is_start == 1"
								class="rate status-value"
								style="color: aliceblue"
								>已开始</text
							>
							<text v-else-if="item.is_finish == 1"
								class="rate status-value"
								style="color: aliceblue"
								>已结束</text
							>
							<text v-else
								class="rate status-value"
								style="color: aliceblue"
								>已开始</text
							>
						</view>
					</view>
					<button
						class="check-button Block Color_0A1136 FontS_32rpx FontBold"
						style="
							border-radius: 52px;
							width: 45%;
							background: linear-gradient(90deg, #ec7cff 0%, #5ff6ff 100%);
						"
					>
						立即查看
					</button>
				</view>
			</view>
		</view> -->
		<scroll-view
			class="list"
			scroll-y="true"
			@refresherrefresh="loadData(true, true)"
			@scrolltolower="pageNext">
			<view
				class="list-item"
				v-for="(item, index) in list"
				:key="index"
				@click="$u.route('/pages/Special/SpecialDetailsNewOrderlogInfo?id=' + item.id)">
				<view class="user-info">
					<view class="user-info-header">
						<image class="user-info-header-img" :src="userInfo.avatar" mode="aspectFill"></image>
					</view>
					<text class="user-name">{{ userInfo.name }}</text>
				</view>
				<view class="order-flex">
					<text class="order-left">项目昵称</text>
					<text class="order-right">{{ item.project.name }}</text>
				</view>
				<view class="order-flex">
					<text class="order-left">投资金额</text>
					<text class="order-right text-color">{{ item.amount }}元</text>
				</view>
				<view class="order-flex">
					<text class="order-left">订单编号</text>
					<text class="order-right">{{ item.order_no }}</text>
				</view>
				<view class="order-flex">
					<text class="order-left">购买时间</text>
					<text class="order-right">{{ item.created_at }}</text>
				</view>
				<view class="order-flex">
					<text class="order-left">到期时间</text>
					<text class="order-right">{{ item.end_date }}</text>
				</view>
				<view class="order-flex">
					<text class="order-left">项目状态</text>
					<text class="order-right text-color">{{ statusMap[item.status] }}</text>
				</view>
				<view class="order-detail" @click="$u.route('/pages/Special/SpecialDetailsNewOrderlogInfo?id=' + item.id)">
					<text class="order-detail-text">订单明细</text>
					<image class="order-detail-icon" src="../../static/images/orderDetail_icon.png" mode="aspectFill"></image>
				</view>	
			</view>
		</scroll-view>
		<uni-load-more v-if="!isLoading" :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			isLoading: true,
			list: [],
			userInfo: JSON.parse(uni.getStorageSync('usr') || `{}`),
			loadStatus: "noMore",
			statusMap: {
				'NOT_STARTED': '未开始',
				'CASHBACK_IN_PROGRESS' : '进行中',
				'ENDED': '已完成',
			},
			current: 0,
			express: {},
		};
	},
	onLoad() {
		this.loadData(true);
	},
	methods: {
		loadData(flag) {
			if (flag) {
				this.page = 1;
			} else {
				this.page += 1;
				this.status = 'loading'
			}
			this.$u.api
				.getProjectGoodsLog({
					page: this.page,
				})
				.then((res) => {
					if (res.code == 200) {
						this.list = flag ? res.data.data : this.list.concat(res.data.data);
						this.loadStatus =
							res.data.current_page == res.data.last_page ? "noMore" : "more";
						this.isLoading = false;
					}
				}).catch(err => {
					this.isLoading = false;
				});
		},
		pageNext(){
			if (this.loadStatus !== 'nomore' && this.loadStatus !== 'loading') {
				this.loadData()
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	padding: 20rpx 30rpx;
	.list-item {
		border-radius: 16px;
		background: #1A1B1E;
		padding: 36rpx 30rpx;
		margin-bottom: 20rpx;
		.user-info {
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			.user-info-header {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				overflow: hidden;
				.user-info-header-img {
					width: 100%;
					height: 100%;
				}
			}
			.user-name {
				margin-left: 16rpx;
				font-family: PingFang SC;
				font-size: 28rpx;
				color: #FFFFFF;
			}
		}
		.order-flex {
			width: 100%;
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.order-left {
				font-family: PingFang SC;
				font-size: 24rpx;
				line-height: 60rpx;
				color: rgba(255, 255, 255, 0.4);
			}
			.order-right {
				font-family: PingFang SC;
				font-size: 24rpx;
				line-height: 60rpx;
				color: #FFFFFF;
			}
			.text-color {
				color: #00FFD7;
			}
		}
		.order-detail {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 33rpx;
			.order-detail-text {
				font-family: PingFang SC;
				font-size: 24rpx;
				color: #FFFFFF;
			}
			.order-detail-icon {
				width: 24rpx;
				height: 24rpx;
				margin-left: 6rpx;
			}
		}
	}
}


</style>
