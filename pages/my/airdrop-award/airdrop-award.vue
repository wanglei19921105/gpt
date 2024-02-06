<template>
	<view class="page" :class="getThemeClass">
		<!-- 空投奖励 -->
		<!-- <unavbar title="积分账户">
			<template #barRight>
				<view @click="openWin('../airdrop-bill/airdrop-bill')">{{i18n.airdrop2}}</view>
			</template>
		</unavbar> -->

		<!-- 可用积分 -->
		<!-- <view class="my-wallet-card-box">
			<view class="my-wallet-card">
				<image src="/static/images/wallet/qyzh_bg.png" class="wallet-card-bg" mode=""></image>
				<view class="wallet-card-content">
					<view class="wallet-card-content-title u-font-26">可用积分(个)</view>
					<view class="wallet-card-content-value u-m-t-20" style="font-size: 56rpx;">{{wallet.air_drop}}
					</view>
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
						<image src="/static/images/wallet/yqjl.png" class="wallet-card-bottom-item-icon" mode="">
						</image>
						<text class="wallet-card-bottom-item-text">邀请记录</text>
					</view>
				</view>
			</view>
		</view> -->

		<!-- 积分余额 -->
		<view class="integration-box">
			<image class="integral-pic" src="../../../static/images/integral-pic.png" mode="aspectFit"></image>
			<view class="integration-details">
				<view class="balance">
					积分余额
				</view>
				<view class="balance">
					<zmxy-number-roller v-if="wallet && wallet.air_drop > 0" :number="getairDrop" size="64"
						unit="rpx" />
					<text class="zero" v-else>0</text>
					<text class="units">分</text>
				</view>
			</view>
		</view>

		<!-- 积分余额 收货地址 -->
		<view class="integration-btn-box">
			<view class="integration-btn" @click="goUrl('/pages/my/airdrop-bill/airdrop-bill')">
				<image class="integration-btn-pic" src="../../../static/images/balance-pic.png" mode="aspectFit">
				</image>
				<view class="integration-btn-hint">
					积分余额
				</view>
			</view>
			<view class="integration-btn" @click="goUrl('/pages/my/address/address')" v-if="wallet&&wallet.is_address == 0">
				<image class="integration-btn-pic" src="../../../static/images/location-pic.png" mode="aspectFit">
				</image>
				<view class="integration-btn-hint">
					收货地址
				</view>
			</view>
			<view class="integration-btn" @click="goUrl('/pages/my/logistics-order/logistics-order')" v-else>
				<image class="integration-btn-pic" src="../../../static/images/location-pic.png" mode="aspectFit">
				</image>
				<view class="integration-btn-hint">
					兑换记录
				</view>
			</view>
		</view>
		<view class="title">兑换规则</view>
		<view class="introduce-box" @click="openWin(`/pages/my/airdrop-award/regulation`)">
			<view class="introduce">
				为更好服务平台的各位用户，特此公告数字藏品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操作，以免造成不必要损失。
				1、依据我国法律要求，特定条件下的数字藏品的二次交易不支持任何形式的变相炒作，我们坚决反对数字藏品炒作、场外交易、欺诈，或以任何其他非法、侵权方式使用的违法违规行为，请大家注意甄别上述涉嫌网络欺诈的行为及其相关风险。
				2、数字藏品为虚拟数字商品，购买前请完成实名认证，未满18周岁人群禁止购买。
				3、本商品一经出售不支持七天无理由退换货。
			</view>
		</view>
		<view class="title">积分商城</view>
		<view class="flex justify-between flex-wrap u-p-l-28 u-p-r-28">
			<view class="air-card card-bg u-m-b-24" v-for="(item,index) in list" :key="index"
				@click="openWin(`/pages/my/point/point-detail?id=${item.id}`)">
				<!-- @click="goDetails(item.id)" -->
				<image :src="baseUrl+item.products_cover" mode="aspectFill" class="air-img"></image>
				<view class="line-1 u-font-30 text-bold u-m-t-32">{{item.products_title}}</view>
				<view class="u-font-22 u-m-t-20 text-tips">库存：{{item.total_issue-item.yiduihuan}}</view>
				<!-- <view class="line u-m-t-20 air-line"></view> -->
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
				wallet: null,
				loadStatus: 'noMore',
				page: 1,
				limit: 10,
				list: [],
				baseUrl:""
			};
		},
		onShow() {
			this.baseUrl = this.$myAppConfig.baseUrl + '/';
			this.getAirdrop()
			this.getList(true)
		},
		onReachBottom() {
			if (this.loadStatus == 'noMore') return
			this.page++
			this.getList()
		},
		computed: {
			getairDrop() {
				let num = '0';
				if (this.wallet && this.wallet.air_drop) {
					num = this.wallet.air_drop * 1
				}
				return num;
			}
		},
		methods: {
			goUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			goDetails(id) {
				this.$u.api.jifenduihuan({
					id: id
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '兑换成功'
						})
						if (res.data.type == 3) {
							if (this.address.length == 0) {
								uni.showToast({
									icon: 'error',
									title: '请添加收获地址'
								})
								uni.navigateTo({
									url: '/pages/my/address/address-add'
								});
							}
						}
					}
				}).catch(err => {
					console.log(err)
				});
			},
			getAirdrop() {
				this.$u.api.air_drop().then(res => {
					if (res.code == 200) {
						this.wallet = res.data.wallet
					}
				})
			},
			getList(flag) {
				if (flag) this.page = 1
				this.$u.api.jfshop({
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (res.code == 200) {
						this.list = flag ? res.data.list.data : this.list.concat(res.data.list.data);
						this.loadStatus = res.data.list.next_page_url ? 'more' : 'noMore'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.air-card {
		width: 335rpx;
		height: 526rpx;
		border-radius: 20rpx;
		padding: 24rpx 24rpx 0 24rpx;

		.air-img {
			width: 287rpx;
			height: 287rpx;
			border-radius: 20rpx;
		}

		.air-line {
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

		&::before {
			content: '|';
			font-size: 32rpx;
			font-weight: 600;
			color: #73ADDE;
			margin-right: 8rpx;
		}
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

	.integration-box {
		padding: 60rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.integral-pic {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			padding-top: 20rpx;
		}

		.balance {
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}

		.units {
			font-size: 32rpx;
			margin-left: 10rpx;
		}
	}

	.integration-btn-box {
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.integration-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 326rpx;
			height: 160rpx;
			// border: 2rpx solid #707070;
			border-radius: 80rpx;
			background-color: rgba(112, 112, 112, 0.1);

			.integration-btn-pic {
				width: 80rpx;
				height: 80rpx;
				margin-right: 16rpx;
				padding-top: 14rpx;
			}

			.integration-btn-hint {
				font-size: 32rpx;

			}
		}
	}

	.introduce-box {
		padding: 0 40rpx;
	}

	.introduce {
		width: 670rpx;
		border-radius: 80rpx;
		background-color: rgba(112, 112, 112, 0.1);
		padding: 36rpx 48rpx;
		font-size: 32rpx;
		color: #c5c5c5;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.zero {
		font-size: 64rpx;
	}
</style>