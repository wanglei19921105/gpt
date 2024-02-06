<template>
	<view class="page" :class="getThemeClass">
		<!-- 常见问题QA -->
		<!-- <unavbar :title="i18n.question1"></unavbar> -->
		<view class="card card-bg">
			<empty v-if="!dataList.length"></empty>
			<view class="card_item border-color" hover-start-time="0" hover-stay-time="100" hover-class="card-tag-bg" v-for="(item,index) in dataList" :key="index"
				@click="openWin('../problem-def/problem-def?id='+item.id)">
				<view>{{item.title}}</view>
				<u-icon name="arrow-right" color="#DBDBDB"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
			};
		},
		onShow() {
			this.getDatalist()
		},
		methods: {
			getDatalist() {
				this.$u.api.question_list().then(res => {
					if (res.code == 200) {
						this.dataList = res.data.list.data
					}
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	background-color: #F9F9F9;
	// 	min-height: 100vh;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.card {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;

	// 		.card_item+.card_item {
	// 			border-top: 1px solid #363737;
	// 		}
	// 	}
	// }

	.card {
		// background-color: #fff;
		margin: 20rpx 30rpx;
		border-radius: 20rpx;

		.card_item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 30rpx;
			height: 118rpx;
			&-hover {
				// opacity: .5;
			}
		}

		.card_item+.card_item {
			border-top: 1rpx solid;
		}
	}
</style>
