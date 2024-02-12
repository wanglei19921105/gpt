<template>
	<view class="page" :class="getThemeClass">
		<!-- 空投账单 -->
		<!-- <unavbar title="积分账单"></unavbar> -->
		<u-tabs
			:list="list"
			:is-scroll="false"
			:current="current"
			@change="change"
			:active-color="getMainColor"
			:inactive-color="getNavInactiveColor"
			:bg-color="getBgColor"
			bar-width="50"
		></u-tabs>
		<!-- 全部 -->
		<view class="card card-bg" v-for="(item,index) in itemData" :key="index">
			<view class="card_left">
				<view class="card_name">{{item.note}}</view>
				<view class="card_time text-content">{{item.created_at}}</view>
			</view>
			<view :class="item.status==1?'color-green':'color-red'">{{item.status==1?'+':'-'}} {{parseInt(item.num)}}</view>
		</view>
		<empty v-if="itemData.length < 1"></empty>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				list: [{
					name: ''
				}, {
					name: ''
				}, {
					name: '',
				}],
				current: 0,
				params: {
					page: 1,
					limit: 10,
					type: 2,
					status: 0
				},
			};
		},
		onShow() {
			this.bill()
			this.list[0].name = this.i18n.bill2
			this.list[1].name = this.i18n.bill3
			this.list[2].name = this.i18n.bill4
		},
		onReachBottom() {
			let that = this
			if (that.itemData.length >= that.params.limit) {
				that.params.limit += 10
				that.bill()
			} else {
				this.$refs.uToast.show({
					// 翻到底了
					title: this.i18n.bill5,
					type: 'warning',
				})
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.itemData = []
				if (index == 0) {
					this.params.status = 0
					this.bill()
				}
				if (index == 1) {
					this.params.status = 1
					this.bill()
				}
				if (index == 2) {
					this.params.status = 2
					this.bill()
				}
			},
			bill() { //获取账单数据
				this.$u.api.wallet_log(this.params).then(res => {
					if (res.code == 200) {
						this.itemData = res.data.list.data
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

	// 	.card {
	// 		background-color: #292B2B;

	// 		.card_name {
	// 			color: #FFFFFF;
	// 		}
	// 	}
	// }
	// .page {
	// 	padding-top: 20rpx;
	// }
	.card {
		height: 136rpx;
		border-radius: 10rpx;
		// background-color: #fff;
		margin: 20rpx 30rpx 20rpx;
		padding: 24rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;

		.card_left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			// color: #333333;
			font-size: 28rpx;
			height: 100%;

			.card_time {
				// color: #ABABAB;
				font-size: 26rpx;
				font-weight: 500;
			}
		}
	}
</style>
