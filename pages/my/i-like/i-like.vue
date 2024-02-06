<template>
	<view class="page" :class="getThemeClass">
		<!-- 我喜欢的 -->
		<!-- <unavbar :title="i18n.mylike1"></unavbar> -->
		<!-- <fall class="fall" :listData="featuredList"></fall> -->
		<view class="featured"  :class="getThemeClass">
			<empty v-if="!featuredList.length"></empty>
			<view class="featured_item card-bg" v-for="(item,index) in featuredList" :key="index"
				@click="go_commodityDef(item.product_id,item.pre.products_status)">
				<view class="plan">
					<image :src="item.cast.cover||''" mode="aspectFit"></image>
					<!-- 版/衍 -->
					<view class="type">
						{{item.pre.products_type==0?i18n.mylike2:i18n.mylike3}}
					</view>
				</view>
				<view class="featured_content">
					<view class="cont_header">
						<!-- 作者头像 -->
						<view class="avatar_img">
							<image :src="item.authors.avatar || '/static/logo.png'" mode="widthFix"></image>
						</view>

						<!-- 作者名 -->
						<view>{{item.authors.nickname||''}}</view>
					</view>

					<!-- 商品名字 -->
					<view class="cont_title">{{item.cast.title||''}}</view>

					<!-- 价格 -->
					<view class="cont_price color-red">
						{{item.pre.price||''}}
						<text>USDT</text>
					</view>

					<!-- 已售罄 -->
					<!-- <view class="cont_price" style="font-size: 26rpx;"><text>
							</text>已售罄</view> -->
				</view>

				<!-- 喜欢/取消喜欢 -->
				<view class="like" @click="likeCli(item.product_id)" @click.stop>
					<image v-if="curScreenStyle" src='/static/images/darkLike1.png' mode="widthFix"></image>
					<image v-if="!curScreenStyle" src='/static/images/heart2.png' mode="widthFix"></image>
				</view>

				<!-- 预售 -->
				<view class="presale" v-if="false">
					<!-- 后开始抢购 -->
					48:32:56 {{i18n.mylike4}}
				</view>

				<!-- 拍卖 -->
				<!-- <view class="presale">
					拍卖结束于：48:32:56
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				featuredList: [],
				params: {
					page: 1,
					limit: 10
				}
			};
		},
		onShow() {
			this.getLick()
		},
		methods: {
			getLick() {
				this.$u.api.like_list(this.params).then(res => {
					if (res.code == 200) {
						this.featuredList = res.data.list.data
					}
				}).catch(err => {

				})
			},
			likeCli(id) {
				let that = this
				that.$u.api.like_del({
					'id': id
				}).then(res => {
					if (res.code == 200) {
						that.getLick()
					}
				})
			},
			go_commodityDef(id, status) {
				console.log(id, status)
				// if (status == 0) { //在售
				// 	uni.navigateTo({
				// 		url: '../../market/goods-def/goods-def?id=' + id
				// 	})
				// }
				// if (status == 1) { //预售
				// 	uni.navigateTo({
				// 		url: '../../market/goods-presale/goods-presale?id=' + id
				// 	})
				// }
				// if (status == 2) { //拍卖
				// 	uni.navigateTo({
				// 		url: '../../market/goods-auctionDef/goods-auctionDef?id=' + id
				// 	})
				// }
				// if (status == 3) { //售罄
				// 	uni.navigateTo({
				// 		url: '../../market/goods-soldOut/goods-soldOut?id=' + id
				// 	})
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding-top: 30rpx;
	}
	.featured {
		// background-color: #FAF6F4;
		margin: 0rpx 30rpx 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 60rpx;

		.featured_item {
			border-radius: 20rpx;
			width: 334rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			position: relative;

			.plan {
				width: 100%;
				height: 336rpx;
				display: block;
				position: relative;
				overflow: hidden;
				display: flex;
				align-items: center;

				image {
					width: 100%;
				}
			}

			.featured_content {
				// background-color: #fff;
				padding: 30rpx 24rpx;

				.cont_header {
					display: flex;
					// color: #111111;
					font-size: 24rpx;
					align-items: center;

					.avatar_img {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50rpx;
						margin-right: 25rpx;
						overflow: hidden;
					}

					image {
						width: 100%;
					}
				}

				.cont_title {
					margin-top: 30rpx;
					// color: #111111;
					font-size: 28rpx;
					font-weight: bold;
				}

				.cont_price {
					// color: red;
					font-size: 34rpx;
					font-weight: bold;
					margin-top: 40rpx;

					text {
						font-size: 22rpx;
					}
				}
			}

			.like {
				width: 46rpx;
				height: 46rpx;
				border-radius: 50%;
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				// background-color: #fff;
				background-color: rgba(255, 255, 255, .5);
				text-align: center;
				line-height: 46rpx;

				image {
					width: 24rpx;
				}
			}

			.presale {
				position: absolute;
				// color: #EEB32E;
				font-size: 22rpx;
				top: 290rpx;
				left: 18rpx;
			}

			.type {
				position: absolute;
				color: #fff;
				font-size: 20rpx;
				bottom: 20rpx;
				right: 20rpx;
			}
		}
	}
	

	// .page-black {
	// 	background-color: #1E2020;

	// 	.featured_content {
	// 		background-color: #292B2B !important;

	// 		.cont_header {
	// 			color: #E0E0E0 !important;
	// 		}

	// 		.cont_title {
	// 			color: #FFFFFF !important;
	// 		}

	// 		.cont_price {
	// 			color: #F7924C !important;
	// 		}
	// 	}

	// 	.like {
	// 		background-color: #ffffff59 !important;
	// 	}
	// }
</style>
