<template>
	<view class="page" :class="getThemeClass">
		<!-- 账单 -->
		<!-- <unavbar :title="i18n.bill1"></unavbar> -->
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
		<view v-if="current == 0">
			<empty v-if="!itemData.length"></empty>
			<view class="card card-bg" v-for="(item,index) in itemData" :key="index">
				<view class="card_left">
					<view class="card_name">{{item.note}}</view>
					<view class="card_time text-content">{{item.created_at}}</view>
				</view>
				<view class="color-green" :class="item.status == 1?'':'color-red'">
					{{item.status == 1?'+':'-'}}{{item.num}}
				</view>
			</view>
		</view>
		<view v-if="current == 1">
			<empty v-if="!income.length"></empty>
			<view class="card card-bg" v-for="(item,index) in income" :key="index">
				<view class="card_left">
					<view class="card_name">{{item.note}}</view>
					<view class="card_time text-content">{{item.created_at}}</view>
				</view>
				<view class="color-green" :class="item.status == 1?'':'color-red'">
					{{item.status == 1?'+':'-'}}{{item.num}}
				</view>
			</view>
		</view>
		<view v-if="current == 2">
			<empty v-if="!expenditure.length"></empty>
			<view class="card card-bg" v-for="(item,index) in expenditure" :key="index">
				<view class="card_left">
					<view class="card_name">{{item.note}}</view>
					<view class="card_time text-content">{{item.created_at}}</view>
				</view>
				<view class="color-green" :class="item.status == 1?'':'color-red'">
					{{item.status == 1?'+':'-'}}{{item.num}}
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [], //全部
				income: [], //收入
				expenditure: [], //支出
				list: [{
					name: ''
				}, {
					name: ''
				}, {
					name: '',
				}],
				current: 0,
				page: 1,
				limit: 10
			};
		},
		created() {
			this.getWallet()
			this.list[0].name = this.i18n.bill2
			this.list[1].name = this.i18n.bill3
			this.list[2].name = this.i18n.bill4
		},
		onReachBottom() {
			let that = this
			if (that.current == 0) {
				if (that.itemData.length >= that.limit) {
					that.limit += 10
					that.getWallet()
				} else {
					this.$refs.uToast.show({
						title: this.i18n.bill5,
						type: 'warning',
					})
				}
			}
			if (that.current == 1) {
				if (that.income.length >= that.limit) {
					that.limit += 10
					that.incomeCli()
				} else {
					this.$refs.uToast.show({
						title: this.i18n.bill5,
						type: 'warning',
					})
				}
			}
			if (that.current == 2) {
				if (that.expenditure.length >= that.limit) {
					that.limit += 10
					that.expenditureCli()
				} else {
					this.$refs.uToast.show({
						title: this.i18n.bill5,
						type: 'warning',
					})
				}
			}
		},
		methods: {
			getWallet() { //全部
				let that = this
				this.$u.api.wallet_log({
					'page': that.page,
					'limit': that.limit,
				}).then(res => {
					if (res.code == 200) {
						this.itemData = res.data.list.data
					}
				}).catch(err => {

				})
			},
			incomeCli() { //收入
				let that = this
				that.$u.api.wallet_log({
					'page': that.page,
					'limit': that.limit,
					'type': 1,
					'status': 1
				}).then(res => {
					if (res.code == 200) {
						that.income = res.data.list.data
					}
				}).catch(err => {

				})
			},
			expenditureCli() { //支出
				let that = this
				that.$u.api.wallet_log({
					'page': that.page,
					'limit': that.limit,
					'type': 1,
					'status': 2
				}).then(res => {
					if (res.code == 200) {
						that.expenditure = res.data.list.data

					}
				}).catch(err => {

				})
			},
			change(index) {
				let that = this
				that.itemData = []
				that.income = []
				that.expenditure = []
				that.page = 1
				this.limit = 10
				that.current = index;
				if (index == 0) {
					this.getWallet()
				}
				if (index == 1) {
					this.incomeCli()
				}
				if (index == 2) {
					this.expenditureCli()
				}
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
