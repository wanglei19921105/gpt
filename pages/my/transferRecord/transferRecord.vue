<template>
	<view class="page" :class="getThemeClass">
		<!-- 转赠记录 -->
		<!-- <unavbar :title="i18n.record1"></unavbar> -->
		<empty v-if="!itemData.length"></empty>
		<view class="card card-bg" v-for="(item,index) in itemData" :key="index">
			<!-- NFT数字资产 转赠:转入 -->
			<view class="card_title">{{i18n.record2}} {{item.transfer_type==1?i18n.record3:i18n.record4}}</view>
			<view class="card_flex border-color">
				<!-- 转出商品 -->
				<view class="text-call">{{i18n.record5}}</view>
				<view class="black_text">{{item.title}}</view>
			</view>
			<view class="card_flex border-color">
				<!-- 权益属性 -->
				<view class="text-call">藏品编号</view>
				<!-- 版权品：衍生品 -->
				<view class="black_text">{{item.tab||0}}</view>
			</view>
			<view class="card_flex border-color">
				<!-- 权益属性 -->
				<view class="text-call">{{i18n.record12}}</view>
				<!-- 版权品：衍生品 -->
				<view class="black_text">{{item.product_type==0?i18n.record6:i18n.record7}}</view>
			</view>
			
			<view class="card_flex border-color">
				<!-- 转出地址 -->
				<view class="text-call">{{i18n.record8}}</view>
				<view class="black_text flex align-center">
					<view class="urlinit text-right u-line-1">{{item.transfer_type==1?item.from:item.to}}</view>
					<image @click="copy(item.transfer_type==1?item.from:item.to)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="card_flex border-color">
				<!-- 转入地址 -->
				<view class="text-call">{{i18n.record9}}</view>
				<view class="black_text flex align-center">
					<view class="urlinit text-right u-line-1">{{item.transfer_type==1?item.to:item.from}}</view>
					<image @click="copy(item.transfer_type==1?item.to:item.from)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="card_flex border-color" v-if="item.hash">
				<!-- 哈希 -->
				<view class="text-call">{{i18n.record10}}</view>
				<view class="black_text flex align-center">
					<view class="urlinit text-right u-line-1">{{item.hash}}</view>
					<image @click="copy(item.hash)" src="../../../static/images/copy.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="card_flex border-color">
				<!-- 时间 -->
				<view class="text-call">{{i18n.record11}}</view>
				<view class="text-content">{{item.created_at}}</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemData: [],
				page:1,
				limit:10
			};
		},
		onShow() {
			this.record()
		},
		onReachBottom() {
			if (this.itemData.length >= this.limit) {
				this.limit += 10
				this.record()
			} else {
				this.$refs.uToast.show({
					// 翻到底了~
					title: this.i18n.sell5,
					type: 'warning',
				})
			}
		},
		methods: {
			record() {
				this.$u.api.given_list({
					'limit':this.limit
				}).then(res => {
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
	.urlinit{
		width: 300rpx;
	}
	// .box {
	// 	background-color: #F9F9F9;
	// 	height: 100%;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;
	// 	min-height: 100vh;

	// 	.card {
	// 		background-color: #292B2B;

	// 		.card_title {
	// 			color: #FFFFFF;
	// 		}

	// 		.black_text {
	// 			color: #FFFFFF !important;
	// 		}
	// 	}
	// }

	.card {
		margin: 20rpx 30rpx;
		padding: 30rpx;
		// background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 26rpx;
		// color: #ABABAB;

		.card_title {
			font-size: 28rpx;
			// color: #333333;
		}

		.card_flex {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;

			.black_text {
				// color: #333333;
			}

			image {
				width: 22rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
