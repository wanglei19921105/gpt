<template>
	<view class="page" :class="getThemeClass">
		<!-- 空投奖励 -->
		<!-- <unavbar title="积分账户">
			<template #barRight>
				<view @click="openWin('../airdrop-bill/airdrop-bill')">{{i18n.airdrop2}}</view>
			</template>
		</unavbar> -->
		
		<view class="my-wallet-card-box">
			<view class="my-wallet-card">
				<image src="/static/images/wallet/qyzh_bg.png" class="wallet-card-bg" mode=""></image>
				<view class="wallet-card-content">
					<!-- 可用积分 -->
					<view class="wallet-card-content-title u-font-26">可用积分(个)</view>
					<view class="wallet-card-content-value u-m-t-20" style="font-size: 56rpx;">{{wallet.air_drop}}</view>
					<view class="u-flex align-center u-m-t-20">
						<view class="u-m-r-30">
							<text class="wallet-card-content-title u-font-26 u-m-r-5">累计支出</text>
							<text class="wallet-card-content-value u-font-28">{{wallet.drop_dec}}个</text>
						</view>
					</view>
				</view>
				<view class="wallet-card-bottom">
					<view class="wallet-card-bottom-item" @click="openWin('/pages/my/airdrop-award/recharge')">
						<image src="/static/images/wallet/cz.png" class="wallet-card-bottom-item-icon" mode=""></image>
						<text class="wallet-card-bottom-item-text">充值</text>
					</view>
					<view class="wallet-card-bottom-item" @click="openWin('/pages/my/airdrop-bill/airdrop-bill')">
						<image src="/static/images/wallet/zd.png" class="wallet-card-bottom-item-icon" mode=""></image>
						<text class="wallet-card-bottom-item-text">账单</text>
					</view>
					<view class="wallet-card-bottom-item" @click="openWin('../airdrop-award/invite-log')">
						<image src="/static/images/wallet/yqjl.png" class="wallet-card-bottom-item-icon" mode=""></image>
						<text class="wallet-card-bottom-item-text">邀请记录</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 邀请记录 -->
		<view class="title">积分商城</view>
		<view class="flex justify-between flex-wrap u-p-l-28 u-p-r-28">
			<view class="air-card card-bg u-m-b-24" v-for="(item,index) in list" :key="index" @click="openWin(`/pages/my/point/point-detail?id=${item.id}`)">
				<image :src="baseUrl+item.products_cover" mode="aspectFill" class="air-img"></image>
				<view class="line-1 u-font-30 text-bold u-m-t-32">{{item.products_title}}</view>
				<view class="u-font-22 u-m-t-20 text-tips">库存：{{item.total_issue-item.yiduihuan}}</view>
				<view class="line u-m-t-20 air-line"></view>
				<view class="flex justify-between align-center u-m-t-10">
					<view class="u-font-24 text-tips">价格：</view>
					<view class="u-font-32 text-bold">{{item.price}}</view>
				</view>
			</view>
			
		</view>
		<!-- <view class="record_card card-bg" v-for="(item,index) in itemData" :key="index">
			<view class="card_left">
				<view class="avatar">
					<image :src="item.avatar" mode="widthFix"></image>
				</view>
				<view class="card_flex">
					<view class="card_name">{{item.nickname}}</view>
					<view class="coding text-content">{{item.phone}}</view>
				</view>
			</view>
			<view class="card_right">
				<view class="time text-tips">{{item.created_at}}</view>
			</view>
		</view> -->
		<uni-load-more :status="loadStatus"></uni-load-more>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				wallet: {},
				loadStatus:'noMore',
				page: 1,
				limit: 10,
				list:[],
				baseUrl:""
			};
		},
		onShow() {
			this.baseUrl = this.$myAppConfig.baseUrl + '/';
			this.getAirdrop()
			this.getList(true)
		},
		onReachBottom() {
			if(this.loadStatus=='noMore')return
			this.page++
			this.getList()
		},
		methods: {
			getAirdrop() {
				this.$u.api.air_drop().then(res => {
					if (res.code == 200) {
						this.wallet = res.data.wallet
					}
				})
			},
			getList(flag){
				if(flag)this.page=1
				this.$u.api.jfshop({
						page: this.page,
						limit: this.limit
					}).then(res => {
					if (res.code == 200) {
						this.list = flag? res.data.list.data:this.list.concat(res.data.list.data);
						this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.air-card{
		width: 335rpx;
		height: 526rpx;
		border-radius: 20rpx;
		padding: 24rpx 24rpx 0 24rpx;
		.air-img{
			width: 287rpx;
			height: 287rpx;
			border-radius: 20rpx;
		}
		.air-line{
			height: 1rpx;
		}
	}
	// .box {
	// 	height: 100%;
	// 	background-color: #F9F9F9;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;
	// 	min-height: 100vh;

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.record_card {
	// 		background-color: #292B2B;

	// 		.card_name {
	// 			color: #FFFFFF;
	// 		}

	// 		.grey {
	// 			color: #F7924C !important;
	// 		}
	// 	}
	// }

	.title {
		margin: 40rpx 34rpx 30rpx;
		font-size: 30rpx;
		// color: #333333;
		font-weight: bold;
	}

	.record_card {
		display: flex;
		justify-content: space-between;
		// background-color: #fff;
		height: 140rpx;
		margin: 20rpx 30rpx;
		align-items: center;
		border-radius: 10rpx;
		padding-right: 24rpx;

		.card_left {
			display: flex;
			align-items: center;

			.avatar {
				border-radius: 50%;
				width: 80rpx;
				height: 80rpx;
				margin: 0 24rpx 0 28rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
			}

			.card_flex {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.card_name {
					font-size: 28rpx;
					font-weight: bold;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}


				.coding {
					// color: #999999;
					font-size: 24rpx;
					margin-top: 14rpx;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.card_right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-between;

			.grey {
				// color: #764E39;
				font-weight: 800;
			}

			.time {
				margin-top: 14rpx;
				// color: #999999;
				font-size: 24rpx;
			}

		}
	}
	
	.recharge_btn {
		width: 126rpx;
		height: 54rpx;
		line-height: 54rpx;
		border-radius: 28rpx;
		text-align: center;
		border: 1px solid white;
	}
</style>
