<template>
	<view class="page" :class="getThemeClass">
		<!-- 提现记录 -->
		<!-- <unavbar title="转账记录"></unavbar> -->
		<empty v-if="!listData.length"></empty>
		<view class="withdraw_card card-bg" v-for="(item,index) in listData" :key="index">
			<view class="withdraw_flex">
				<!-- 微信/支付宝 提现 -->
				<view class="card_name">{{item.to_phone}}</view>
				<view class="card_num">+{{item.num}}</view>
			</view>
			<view class="withdraw_flex" v-if="false">
				<!-- 状态 -->
				<view class="card_status">{{i18n.witrecord5}}</view>
				<view class="status_value"
					:class="item.status==1&&curScreenStyle?'color-orange':''||item.status==0?'color-grey':''||item.status==1?'color-green':''||item.status==2?'color-red':''">
					{{item.status==0?i18n.witrecord2:''||item.status==1?i18n.witrecord3:''||item.status==2?i18n.witrecord4:''}}
				</view>
			</view>
			<view v-if="item.status == 3" class="withdraw_flex reject">审核拒绝</view>
			<view class="withdraw_flex">
				<!-- 时间 -->
				<view class="time_text">{{i18n.witrecord6}}</view>
				<view class="card_time text-content">{{ item.created_at }}</view>
			</view>
			<view class="withdraw_flex" v-if="item.note">
				<!-- 时间 -->
				<view class="time_text" style="flex-shrink: 0;">原因：</view>
				<view class="card_time text-content">{{ item.note }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: []
			}
		},
		created() {
			this.drawList()
		},
		methods: {
			drawList() {
				this.$u.api.transfer_log().then(res => {
					if (res.code == 200) {
						this.listData = res.data.list.data
					}
				}).catch(err => {

				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.page-black {
		// background-color: #1E2020;
		// min-height: 100vh;

		// .withdraw_card {
		// 	background-color: #292B2B;

		// 	.card_name,
		// 	.card_num {
		// 		color: #FFFFFF;
		// 	}
		// }
	}

	.withdraw_card {
		margin: 20rpx 30rpx;
		padding: 30rpx;
		// background-color: #fff;
		border-radius: 10rpx;
		// height: 198rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.withdraw_flex {
			display: flex;
			justify-content: space-between;
			// color: #ABABAB;
			font-size: 26rpx;
		}

		.withdraw_flex+.withdraw_flex {
			margin-top: 24rpx;
		}

		.card_name {
			// color: #333333;
			font-size: 28rpx;
			font-weight: bold;
		}

		.card_num {
			// color: #333333;
			font-size: 30rpx;
		}

		.status_value {
			font-weight: bold;
		}

	}
</style>
