<template>
	<view class="page" :class="getThemeClass">
		<!-- 我的钱包 -->
		<!-- <unavbar :title="i18n.wallet1"></unavbar> -->
		<!-- <view class="wallet_card">
			<view class="card_flex">
				<view class="sum_text">{{i18n.wallet2}}</view>
				<view class="recharge_btn" @click="openWin('../recharge/recharge')">{{i18n.wallet3}}</view>
			</view>
			<view class="card_flex">
				<view class="amount">{{wallet.balance}}</view>
				<view class="withdraw_btn" @click="openWin('../withdraw/withdraw')">{{i18n.wallet4}}</view>
			</view>
		</view> -->
		
		<view class="my-wallet-card-box">
			<view class="my-wallet-card">
				<image src="/static/images/wallet/qb_bg.png" class="wallet-card-bg" mode=""></image>
				<view class="wallet-card-content">
					<!-- 可用金额（USDT） -->
					<view class="wallet-card-content-title u-font-26">{{i18n.wallet2}}</view>
					<view class="wallet-card-content-value u-m-t-20"><text style="font-size: 56rpx;">{{wallet.balance}}</text>	<text class="">≈￥{{(wallet.balance*exchange_rate).toFixed(2)}}</text></view>
					<view class="u-flex align-center u-m-t-20">
						<view class="u-m-r-30">
							<text class="wallet-card-content-title u-font-26">总收入</text>
							<text class="wallet-card-content-value u-font-28">{{wallet.total_income}}USDT<text class="">≈￥{{(wallet.total_income*exchange_rate).toFixed(2)}}</text></text>
						</view>
						<view class="">
							<text class="wallet-card-content-title u-font-26">累计提现</text>
							<text class="wallet-card-content-value u-font-28">{{wallet.total_draw}}USDT<text class="">≈￥{{(wallet.total_draw*exchange_rate).toFixed(2)}}</text></text>
						</view>
					</view>
				</view>
				<view class="wallet-card-bottom">
					<view class="wallet-card-bottom-item" @click="openWin('../recharge/recharge')">
						<image src="/static/images/wallet/cz.png" class="wallet-card-bottom-item-icon" mode=""></image>
						<text class="wallet-card-bottom-item-text">充值</text>
					</view>
					<view class="wallet-card-bottom-item" @click="openWin('../withdraw/withdraw', {balance: wallet.balance})">
						<image src="/static/images/wallet/tx.png" class="wallet-card-bottom-item-icon" mode=""></image>
						<text class="wallet-card-bottom-item-text">提现</text>
					</view>
					<view class="wallet-card-bottom-item" @click="openWin('../withdraw/transfer')">
						<image src="/static/images/wallet/zz.png" class="wallet-card-bottom-item-icon" mode=""></image>
						<text class="wallet-card-bottom-item-text">转账</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 账单 -->
		<view class="bill_title">
			<view>{{i18n.wallet7}}明细</view>
			<!-- 全部账单 -->
			<view class="u-flex text-content">
				<view @click="openWin('../bill/bill')">{{i18n.wallet8}}</view>
				<u-icon name="arrow-right" size="26"></u-icon>
			</view>
		</view>
		<!-- 账单项 -->
		<view class="bill_item card-bg" v-for="(item,index) in itemData" :key="index">
			<view class="bill_flex">
				<view>{{item.note}}</view>
				<view class="text-content">{{item.created_at}}</view>
				<view class="text-content" v-if="item.remark">备注：{{item.remark}}</view>
			</view>
			<view class="color-green" :class="item.status == 1?'':'color-red'">{{item.status == 1?'+':'-'}}{{item.num}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				wallet: {},
				exchange_rate:''
			};
		},
		onShow() {
			this.getWallet()
			this.exchange_rate = uni.getStorageSync('exchange_rate');
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:"/pages/my/bind-bank/bind-bank"
			})
		},
		methods: {
			getWallet() {
				this.$u.api.wallet_index().then(res => {
					if (res.code == 200) {
						this.wallet = res.data.wallet
						this.itemData = res.data.list
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .page-black {
	// 	background-color: #1E2020;
	// 	min-height: 100vh;

	// 	.amount_card {
	// 		background-color: #292B2B;

	// 		view {
	// 			color: #FFFFFF;
	// 		}
	// 	}

	// 	.bill_title {
	// 		color: #FFFFFF;
	// 	}

	// 	.bill_item {
	// 		background-color: #292B2B;

	// 		.bill_flex>view:nth-child(1) {
	// 			color: #FFFFFF;
	// 		}
	// 	}
	// }
	.amount_card {
		margin: 20rpx 30rpx;
		border-radius: 20rpx;
		// background-color: #fff;
		display: flex;
		height: 152rpx;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		padding: 0 38rpx;

		.amount_item {
			// color: #333333;
			font-size: 30rpx;
			font-weight: bold;

			view:nth-child(2) {
				font-size: 24rpx;
				// color: #999999;
				margin-top: 20rpx;
				font-weight: 500;
			}
		}
	}

	.bill_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 38rpx 30rpx 28rpx;
		font-weight: bold;
		// color: #333333;
		font-size: 30rpx;

		view:nth-child(2) {
			font-size: 26rpx;
			// color: #999999;
			font-weight: 500;
		}
	}

	.bill_item {
		margin: 20rpx 30rpx;
		padding: 25rpx 30rpx;
		height: 166rpx;
		align-items: center;
		// background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		font-weight: bold;

		.bill_flex {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 28rpx;
			// color: #333333;

			view {
				width: 440rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			view:nth-child(2) {
				// color: #ABABAB;
				font-size: 26rpx;
				font-weight: 500;
			}
			view:nth-child(3) {
				// color: #ABABAB;
				font-size: 26rpx;
				font-weight: 500;
			}
		}
	}
</style>
