<template>
	<!-- 旧版邀请排行榜 - 仅做备份 -->
	<view class="page" :class="getThemeClass">
		<!-- 空投奖励 -->
		<unavbar title="邀请排行榜"></unavbar>

		<view class="head">
			<view class="size-30 text-bold">邀请活动日期：</view>
			<view class="size-26 margin-top-30">{{time}} ~ {{end_time}}</view>
		</view>
		<empty v-if="itemData.length==0"></empty>
		<!-- 邀请记录 -->
		<view class="record_card card-bg" v-for="(item,index) in itemData" :key="index">
			<view class="card_left">
				<view class="avatar card-tag-bg">
					<image :src="item.avatar" mode="widthFix"></image>
				</view>
				<view class="card_flex">
					<!-- 用户昵称 -->
					<view class="card_name">{{item.nickname}}</view>
					<!-- 用户账号 -->
					<view class="coding text-tips">{{init(item.phone)}}</view>
				</view>
			</view>
			<view class="card_right">
				<!-- 奖励金额 -->
				<view class="color-main text-bold">邀请人数：{{item.child_num}}</view>
			</view>
		</view>
		<view class="gap-30"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				wallet: {},
				child_num:0,
				time:'',
				end_time:''
			};
		},
		onShow() {
			this.getAirdrop()
		},
		methods: {
			getAirdrop() {
				this.$u.api.active_rank().then(res => {
					if (res.code == 200) {
						this.time = res.data.time
						this.end_time = res.data.end_time
						this.itemData = res.data.list
					}
				}).catch(err => {})
			},
			init(num){
				return num.substr(0,3) + "****" + num.substr(7)
			},
		}
	}
</script>

<style lang="scss" scoped>
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

	.head {
		margin-top: 30rpx;
		background-image: url(../../../static/images/airdropAward.png);
		background-size: contain;
		background-repeat: no-repeat;
		height: 258rpx;
		color: #fff;
		padding: 50rpx 80rpx 0 80rpx;
		font-size: 26rpx;

		.strong {
			font-size: 44rpx;
			font-weight: bold;
			margin-top: 40rpx;
		}
	}

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
</style>
