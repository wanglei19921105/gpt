<template>
	<view class="page" :class="getThemeClass">
		<!-- NFT转赠 -->
		<!-- <unavbar :title="i18n.giveaway1">
			<template #barRight>
				<view :style="curScreenStyle?'color: #fff;':'color: #333333;'"
					@click="openWin('../transferRecord/transferRecord')">{{i18n.giveaway2}}</view>
			</template>
		</unavbar> -->
		
		<view class="waiting" v-if="open_transfer!=1">
			<image src="/static/images/noData.png" class="waiting-img"></image>
			<view class="text-center size-28 color-a margin-top-35">敬请期待</view>
		</view>
		<view class="" v-else>
			<empty v-if="!Data.length"></empty>
			
			<template v-for="item in Data">
				<view class="turn-add-box card-bg" :key="item.id">
					<view class="turnBoxImg">
						<image :src="item.cover" class="turn-add-image" mode="heightFix"></image>
					</view>
					<view class="turn-add-content">
						<view class="turn-add-title-box">
							<text class="turn-add-title line-1">{{item.title}}</text>
						</view>
						<view class="turn-add-num-box">
							<text class="turn-add-num text-tips">编号：{{item.tab_no}}</text>
						</view>
						<view class="turn-add-bottom-box">
							<view class="">
								<botBtn padding="10rpx 30rpx" fontSize="28rpx" radius="50rpx" @click="giveAway(item)">{{i18n.giveaway5}}</botBtn>
							</view>
						</view>
					</view>
				</view>
			</template>
			
			<!-- <view class="card card-bg" v-for="(item,index) in Data" :key="index">
				<view style="position: relative;">
					<image class="card-image" :src="item.cover" mode="widthFix"></image>
				</view>
				<view class="name">
					<text>{{item.title}}</text>
				</view>
				<view class="name u-m-t-10" v-if="item.tab_no">
					<text class="u-font-24 color-9" style="font-weight: 500">编号：{{item.tab_no}}</text>
				</view>
				<botBtnp class="u-m-t-30" @click="giveAway(item)">{{i18n.giveaway5}}</botBtnp>
			</view> -->
		</view>
		
		<u-popup v-model="show" mode="bottom" class="upopup border-main my-popup" border-radius="20">
			<!-- 对外转赠 -->
			<view @click="go_copyright(item)" v-if="open_transfer_out==1">{{i18n.giveaway6}}</view>
			<!-- 对内转赠 -->
			<view @click="go_derivatives(item)">{{i18n.giveaway7}}</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				Data: [],
				page: 1,
				limit: 10,
				item: {}, //转赠详情信息
				
				open_transfer: 1,
				open_transfer_out:1
			};
		},
		onLoad() {
			this.$u.api.open_status().then(res=>{
				this.open_transfer = res.data.sys.open_transfer
				this.open_transfer_out = res.data.sys.open_transfer_out
			})
		},
		onShow() {
			this.passon()
		},
		onReachBottom() {
			if (this.Data.length >= this.limit) {
				this.limit += 10
				this.passon()
			} else {
				this.$refs.uToast.show({
					// 翻到底了~
					title: this.i18n.sell5,
					type: 'warning',
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/my/transferRecord/transferRecord'
			})
		},
		methods: {
			passon() {
				this.$u.api.given_nft({
					'page': this.page,
					'limit': this.limit
				}).then(res => {
					if (res.code == 200) {
						this.Data = res.data.list.data
					}
				}).catch(err => {

				})
			},
			// 跳到转赠版权品(对外转赠)
			go_copyright(item) {
				uni.navigateTo({
					url: '../copyright/copyright?item=' + encodeURIComponent(JSON.stringify(item)),
				})
				this.show = false
			},
			// 跳到转赠衍生品(对内转赠)
			go_derivatives(item) {
				console.log(item);
				uni.navigateTo({
					url: '../derivatives/derivatives?id=' + item.id
				})
				this.show = false
			},
			// 转赠按钮
			giveAway(item) {
				this.item = item
				if (item.products_type == 0) {
					this.show = true
					return false
				}
				// 如果是衍生品 直接跳转到 转赠衍生品页面
				uni.navigateTo({
					url: '../derivatives/derivatives?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	background-color: #F9F9F9;
	// 	min-height: 100vh;
	// 	padding-bottom: 30rpx;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.card {
	// 		background-color: #292B2B;

	// 		.name {
	// 			color: #FFFFFF;
	// 		}

	// 		.price {
	// 			color: #F7924C;
	// 		}

	// 		.btn {
	// 			background-color: #F7924C;
	// 		}
	// 	}

	// 	/deep/.uni-scroll-view-content {
	// 		background-color: #292B2B;
	// 		color: #FFFFFF;

	// 		view+view {
	// 			border-top: 1px solid #363737;
	// 			margin: 0 20rpx;
	// 		}
	// 	}
	// }
	
	.turn-add-box{
		width: 690rpx;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 30rpx;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.turnBoxImg{
			border-radius: 30rpx;
			width: 280rpx;
			text-align: center;
			background-color: #fff;
			height: 200rpx;
		}
		.turn-add-image{
			width: 200rpx;
			height: 200rpx;
			border-radius: 30rpx;
			flex-shrink: 0;
		}
		.turn-add-content{
			width: 100%;
			height: 200rpx;
			padding: 30rpx;
			.turn-add-title-box{
				.turn-add-title{
					font-weight: 500;
					font-size: 30rpx;
				}
			}
			.turn-add-num-box{
				margin-top: 10rpx;
				font-size: 24rpx;
			}
			.turn-add-bottom-box {
				margin-top: 10rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
		}
	}

	.card {
		margin: 30rpx;
		margin-bottom: 0;
		padding-bottom: 42rpx;
		background-color: #fff;
		border-radius: 30rpx;
		.card-image{
			border-radius: 30rpx 30rpx 0rpx 0rpx;
		}
		
		.tags {
			position: absolute;
			color: #fff;
			font-size: 26rpx;
			bottom: 30rpx;
			right: 30rpx;
		}

		image {
			width: 100%;
		}

		.name {
			// color: #111111;
			font-size: 32rpx;
			margin-top: 40rpx;
			font-weight: bold;
			margin-left: 32rpx;
		}

		.price {
			// color: #A11716;
			font-size: 38rpx;
			font-weight: bold;
			margin-top: 34rpx;
			margin-left: 36rpx;

			text {
				font-size: 26rpx;
			}
		}

		.btn {
			margin: 50rpx 30rpx 0rpx;
			background-color: #764E39;
			height: 86rpx;
			line-height: 86rpx;
			color: #fff;
			font-size: 30rpx;
			border-radius: 10rpx;
		}
	}

	.upopup {
		view {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
		}

		view+view {
			border-top: 1px solid;
			margin: 0 20rpx;
		}
	}
</style>
