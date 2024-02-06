<template>
	<view class="box" :class="getThemeClass">
		<empty v-if="!listData.length"></empty>
		<view class="" v-if="double">
			<view class="featured" v-if="types == 0">
				<view class="featured_item card-bg" v-for="(item, index) in listData" :key="index" @click="go_commodityDef(item.id)">
					<view class="plan">
						<image :src="item.cover" mode="aspectFit"></image>
						<view class="soldout" v-if="item.sur_issue==0">
							已售罄
						</view>
						<view class="presale" v-if="item.diff > 0 && item.sur_issue == 1">
							预售倒计时：<count :end="item.diff"></count>
						</view>
						<!-- <view class="presale" v-if="item.diff > 0 && item.sur_issue == 1">
							预售倒计时：<count :end="item.diff"></count>
						</view> -->
					</view>
					<view class="featured_content">
						<view class="cont_header">
							<view class="avatar_img"><image :src="item.avatar || '/static/logo.png'" mode="widthFix"></image></view>
							<view>{{ item.nickname || '' }}</view>
						</view>
						<view class="cont_title">{{ item.title }}</view>
						<view class="cont_price color-red">
							{{ item.price }}
							<text>USDT</text>
						</view>
					</view>
					<!-- <view class="like" @click="likeCli(item.id)" @click.stop>
						<image v-if="curScreenStyle" :src="item.status == 1 ? '/static/images/darkLike1.png' : '/static/images/heart1.png'" mode="widthFix"></image>
						<image v-if="!curScreenStyle" :src="item.status == 1 ? '/static/images/heart2.png' : '/static/images/heart1.png'" mode="widthFix"></image>
					</view> -->
				</view>
			</view>
			<view class="featured" v-else>
				<view class="featured_item card-bg" v-for="(item, index) in listData" :key="index" @click="go_commodityDef(item.product_id)">
					<view class="plan"><image :src="item.cast.cover" mode="aspectFit"></image></view>
					<view class="featured_content">
						<view class="cont_header">
							<view class="avatar_img"><image :src="item.authors.avatar || '/static/logo.png'" mode="widthFix" ></image></view>
							<view>{{ item.authors.nickname || '' }}</view>
						</view>
						<view class="cont_title">{{ item.cast.title }}</view>
						<view class="cont_price color-red">
							{{ item.pre.price }}
							<text>USDT</text>
						</view>
					</view>
					<view class="like" @click="likeCli(item.id)" @click.stop>
						<image v-if="curScreenStyle" :src="item.like_status == 1 ? '/static/images/darkLike1.png' : '/static/images/heart1.png'" mode="widthFix"></image>
						<image v-if="!curScreenStyle" :src="item.like_status == 1 ? '/static/images/heart2.png' : '/static/images/heart1.png'" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-else>
			<view class="featured-list-item flex" v-for="(item, index) in listData" :key="index" @click="go_commodityDef(item.id)">
				<view style="position: relative;">
					<image :src="item.cover" mode="aspectFit" class="feat-img"></image>
					<view class="soldout" v-if="item.sur_issue==0">
						已售罄
					</view>
					<view class="presale" v-if="item.diff > 0&&item.sur_issue==1">
						预售倒计时：<count :end="item.diff"></count>
					</view>
				</view>

				<view class="flex-1 featured_content">
					<view class="cont_header">
						<view class="avatar_img"><image :src="item.avatar" mode="widthFix"></image></view>
						<view>{{ item.nickname || '' }}</view>
					</view>
					<view class="cont_title line-1" style="width: 350rpx;">{{ item.title }}</view>
					<view class="cont_price color-red">
						{{ item.price }}
						<text>USDT</text>
					</view>
				</view>
			</view>
			<view class="gap-50"></view>
		</view>
	</view>
</template>

<script>
import count from '@/components/count.vue';
export default {
	components: {
		count
	},
	props: {
		listData: {
			type: Array,
			default: () => {
				return [];
			}
		},
		double: {
			type: Boolean,
			default: true
		},
		types: {
			type: Number,
			default: 0
		}
	},
	name: 'fall',
	data() {
		return {};
	},
	methods: {
		// 跳转商品详情页面
		go_commodityDef(id) {
			uni.navigateTo({
				url: '/pages/market/goods-def/goods-def-one?id=' + id
			});
		},
		likeCli(id, status) {
			//喜欢/取消喜欢
			let that = this;
			that.listData.some(item => {
				if (item.id == id) {
					// status为0 = 没关注
					if (!item.status) {
						that.$u.api
							.like_add({
								id: id
							})
							.then(res => {
								item.status = 1;
							})
							.catch(err => {});
					} else {
						that.$u.api
							.like_del({
								id: id
							})
							.then(res => {
								item.status = 0;
							})
							.catch(err => {});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.soldout{
		position: absolute;
		top: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 0 0 0 20rpx;
		padding: 8rpx 15rpx;
		font-size: 22rpx;
		// color: #eee;
	}
	.presale {
		position: absolute;
		// color: #FFFFFF !important;
		font-size: 22rpx;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		padding: 16rpx;
		border-radius: 15rpx 15rpx 0 0;
		.text {
			font-size: 24rpx;
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

.featured-list-item {
	width: 690rpx;
	margin: 30rpx 30rpx 0 30rpx;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
	position: relative;
	overflow: hidden;
	.feat-img {
		width: 260rpx;
		height: 260rpx;
	}
	.feat-ava {
		width: 44rpx;
		height: 44rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
}
.featured {
	// background-color: #FAF6F4;
	margin: 30rpx 30rpx 0 30rpx;
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
			overflow: hidden;
			display: flex;
			align-items: center;
			position: relative;
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
			color: #FFFFFF !important;
			font-size: 22rpx;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.6);
			padding: 16rpx;
			border-radius: 15rpx 15rpx 0 0;
			.text {
				font-size: 24rpx;
			}
		}

		.type {
			position: absolute;
			color: #fff;
			font-size: 20rpx;
			top: 290rpx;
			right: 18rpx;
		}
	}
}

// .page-black {
// 	background-color: #1e2020;

// 	.featured_content {
// 		background-color: #292b2b !important;

// 		.cont_header {
// 			color: #e0e0e0 !important;
// 		}

// 		.cont_title {
// 			color: #ffffff !important;
// 		}

// 		.cont_price {
// 			color: #f7924c !important;
// 		}
// 	}

// 	.like {
// 		background-color: #ffffff59 !important;
// 	}
// }
</style>
