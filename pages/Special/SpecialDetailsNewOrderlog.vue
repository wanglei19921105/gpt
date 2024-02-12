<!-- @format -->

<template>
	<view
		class="page"
		:class="getThemeClass"
	>
		<!--		<view class="coll-head">-->
		<!--			<u-tabs-->
		<!--				:list="tabs" -->
		<!--				:is-scroll="false" -->
		<!--				:current="current" -->
		<!--				@change="change" -->
		<!--				:active-color="getMainColor" -->
		<!--				:inactive-color="getNavInactiveColor" -->
		<!--				:bg-color="getBgColor"-->
		<!--			></u-tabs>-->
		<!--		</view>-->
		<!--		<view class="gap-100"></view>-->
		<empty v-if="!list.length"></empty>
		<view class="ListBox WidthGlobal1 MarginAuto">
			<view
				v-for="(item, index) in list"
				:key="index"
				@click="
					$u.route('/pages/Special/SpecialDetailsNewOrderlogLog?id=' + item.id)
				"
				class="Unit MarginT_30rpx PaddingT_32rpx PaddingB_32rpx Width100 BorderR_20rpx"
			>
				<!-- <view class="Width100 PaddingB_32rpx BorderB">
          <view class="WidthGlobal1 MarginAuto">
            <view class="ImgBox FloatL BorderR_20rpx OverH">
              <image :src="(item.project || {}).cover_image" mode="aspectFill" class="Width100 Height100"></image>
            </view>
            <view class="FloatR Text">
              <text class="Block FontBold Color_FFFFFF FontS_48rpx Warp_E">{{(item.project || {}).name}}</text>
		<!-- <text class="Block FontS_28rpx Color_96FF44 MarginT_4rpx">兑换成功</text>  -->
				<!-- </view> -->
				<!-- <view class="ClearB"></view> -->
				<!-- </view> -->
				<!-- </view>  -->
				<!-- <view class="WidthGlobal1 MarginAuto">
          <view class="Width100 MarginT_30rpx">
            <text class="Block FontS_28rpx Color_C8C9CB FloatL">交易时间</text>
            <text class="Block FontS_28rpx Color_FFFFFF FloatR">{{ item.paid_at }}</text>
            <view class="ClearB"></view>
          </view>
          <view class="Width100 MarginT_30rpx">
            <text class="Block FontS_28rpx Color_C8C9CB FloatL">记录单号</text>
            <text class="Block FontS_28rpx Color_FFFFFF FloatR">{{ item.order_no }}</text>
            <view class="ClearB"></view>
          </view>
        </view> -->
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
		</view>
		<!--		<view v-for="(item, index) in list" :key="index" class="itemBox card-bg" @click="godetail(item.id)">-->
		<!--			<view class="head_img">-->
		<!--				<view class="casting_info">-->
		<!--					<view class="casting_head">-->
		<!--						<view class="head_left">-->
		<!--							&lt;!&ndash; NFT铸品名称 &ndash;&gt;-->
		<!--							<view class="name" v-if="current==0">-->
		<!--								订单号码：{{ item.out_trade_no }}<br>-->
		<!--								商品名称：{{ item.name }}<br>-->
		<!--								下单时间：{{ item.created_at }}-->
		<!--							</view>-->
		<!--							<view class="name" v-if="current==1">-->
		<!--								订单号码：{{ item.out_trade_no }}<br>-->
		<!--								商品名称：{{ item.name }}<br>-->
		<!--								快递单号：{{ item.kd_id }}<br>-->
		<!--								发货时间：{{ item.updated_at }}-->
		<!--							</view>-->
		<!--							<view class="name" v-if="current==2">-->
		<!--								订单号码：{{ item.out_trade_no }}<br>-->
		<!--								商品名称：{{ item.name }}<br>-->
		<!--								快递单号：{{ item.kd_id }}<br>-->
		<!--								发货时间：{{ item.updated_at }}-->
		<!--							</view>-->
		<!--						</view>-->
		<!--					</view>-->
		<!--				</view>-->
		<!--			</view>-->
		<!--			<view class="btns" v-if="current==1">-->
		<!--				&lt;!&ndash;<botBtn-->
		<!--					padding="18rpx 78rpx"-->
		<!--					@click="getExpress(item.id)"-->
		<!--					type="error"-->
		<!--					plain-->
		<!--				>-->
		<!--					<text>查看物流</text>-->
		<!--				</botBtn>&ndash;&gt;-->
		<!--				<botBtn-->
		<!--					padding="20rpx 80rpx"-->
		<!--					@click="shouhuo(item.id)"-->
		<!--				>-->
		<!--					<text>确认收货</text>-->
		<!--				</botBtn>-->
		<!--			</view>-->
		<!--			&lt;!&ndash;<view class="btns" v-if="current==2">-->
		<!--				 <botBtn-->
		<!--					padding="18rpx 78rpx"-->
		<!--					@click="getExpress(item.id)"-->
		<!--					type="error"-->
		<!--					plain-->
		<!--				>-->
		<!--					<text>查看物流</text>-->
		<!--				</botBtn>-->
		<!--				<botBtnp-->
		<!--					padding="20rpx 80rpx"-->
		<!--					@click="godetail(item.id)"-->
		<!--				>-->
		<!--					<text>查看详情</text>-->
		<!--				</botBtnp>-->
		<!--			</view>&ndash;&gt;-->

		<!--		</view>-->

		<uni-load-more :status="loadStatus"></uni-load-more>

		<!--		<express :express="express" ref="express"></express>-->
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			list: [],
			loadStatus: "noMore",
			tabs: [
				{
					name: "待发货",
					id: 2,
				},
				{
					name: "待收货",
					id: 3,
				},
				{
					name: "已完成",
					id: 4,
				},
			],
			current: 0,
			express: {},
		};
	},
	onLoad() {
		this.loadData(true);
	},
	methods: {
		loadData(flag) {
			if (flag) this.page = 1;
			this.$u.api
				.getProjectGoodsLog({
					page: this.page,
				})
				.then((res) => {
					if (res.code == 200) {
						this.list = flag ? res.data.data : this.list.concat(res.data.data);
						this.loadStatus =
							res.data.current_page == res.data.last_page ? "noMore" : "more";
					}
				});
		},
		change(index) {
			if (this.current == index) return;
			this.list = [];
			this.current = index;
			this.loadData(true);
		},
		getExpress(id) {
			uni.showLoading({
				title: "加载中...",
				mask: false,
			});
			this.$u.api
				.myOrders_express({
					order_id: id,
				})
				.then((res) => {
					this.express = res.data.data;
					this.$refs.express.show();
				});
		},
		shouhuo(id) {
			this.$u.api
				.myOrders_receive({
					order_id: id,
				})
				.then((res) => {
					uni.showToast({
						title: "操作成功",
						icon: "none",
					});
					this.loadData(true);
				});
		},
		godetail(id) {
			uni.navigateTo({
				url: `/pages/my/logistics-order/logistics-detail?id=${id}`,
			});
		},
	},
};
</script>

<style lang="scss">
.BorderB {
	border-bottom: 2rpx solid #535559;
}
.ListBox {
	.Unit {
		background: linear-gradient(270deg, #0c0c0f 0%, #282c37 100%);
		.ImgBox {
			width: 160rpx;
			height: 160rpx;
		}
		.Text {
			width: calc(100% - 192rpx);
		}
	}
}
.coll-head {
	width: 750rpx;
	position: fixed;
	// top: calc(44px + var(--status-bar-height));
	// left: 0;
	z-index: 10;
}
.itemBox {
	overflow: hidden;
	margin: 32rpx 30rpx;
	border-radius: 30rpx;
	// background-color: #fff;
}

.head_img {
	image {
		width: 100%;
	}
}

.casting_info {
	padding: 30rpx;
	line-height: 60rpx;

	.casting_head {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.name {
			// color: #111111;
			font-size: 32rpx;
			font-weight: bold;
		}

		.price {
			// color: #a11716;
			font-size: 38rpx;

			text {
				font-size: 26rpx;
			}
		}

		.head_right {
			// color: #eeb32e;
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
			// color: #999999;
			font-size: 26rpx;
		}

		.casting_right {
			// color: #111111;
			font-size: 28rpx;
			display: flex;
			align-items: center;

			.avatar {
				width: 44rpx;
				height: 44rpx;
				border-radius: 50%;
				margin-right: 24rpx;
				overflow: hidden;

				image {
					width: 100%;
				}
			}

			.uicon {
				margin-left: 20rpx;
				width: 22rpx;
				border-radius: 0;
			}
		}
	}

	.casting_flex + .casting_flex {
		border-top: 1px solid;
	}
}

.btns {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin: 30rpx 0 30rpx 0rpx;
	.btn {
		width: 300rpx;
		height: 94rpx;
		line-height: 94rpx;
		text-align: center;
		// background-color:  #764E39;
		// color: #fff;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
	.cancel {
		background-color: #fff;
		border: 3rpx solid red;
		color: red;
	}
}
.dfk {
	display: flex;
	// color: #ffffff;
	width: 630rpx;
	margin-top: 20rpx;
}
</style>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	max-width: 350px;
	margin: 10px auto;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.title-section {
	text-align: center;
	margin-bottom: 10px;
}

.title {
	font-size: 18px;
	color: #333;
}

.rate-section {
	text-align: center;
	margin-bottom: 20px;
}

.rate {
	font-size: 24px;
	color: #ff6f00;
}

.rate-label {
	color: #888;
	font-size: 14px;
}

.info-section {
	display: flex;
	justify-content: space-around;
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
	padding: 10px 0;
}

.info-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.info-value {
	font-size: 16px;
	color: #333;
}

.info-label {
	color: #888;
	font-size: 14px;
}

.bottom-section {
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
}

.term-label,
.status-label {
	color: #888;
	font-size: 14px;
}

.term-value,
.status-value {
	color: #333;
	font-size: 14px;
}

.check-button {
	background-color: #ff6f00;
	color: #fff;
	border: none;
	padding: 10px;
	margin-top: 20px;
	border-radius: 4px;
	font-size: 16px;
}
</style>
