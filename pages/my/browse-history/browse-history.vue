<template>
	<view class="page" :class="getThemeClass">
		<!-- 浏览历史 -->
		<!-- <unavbar :title="i18n.history1">
			<template #barRight>
				<view class="text-main" @click="show = true">清空记录</view>
			</template>
		</unavbar> -->
		<!-- 浏览历史数据 -->
		<!-- <fall class="fall" :listData="featuredList" :types="1"></fall> -->
		<view class="featured">
			<empty v-if="!featuredList.length"></empty>
			<view class="featured_item card-bg" v-for="(item, index) in featuredList" :key="index" @click="go_commodityDef(item.product_id,item.pre.products_status)">
				<view class="plan">
					<image :src="item.cast.cover || ''" mode="aspectFit"></image>
					<!-- <view class="presale color-red" v-if="item.products_status == 1">
						<count v-if="item.diff > 1" :end="item.diff"></count>
						<text class="color-main">{{ i18n.market22 }}</text>
					</view>
					<view class="presale color-red" v-if="item.products_status == 2">
						<text class="color-main" v-if="item.diff < 1">{{ i18n.market23 }}</text>
						<text class="color-main" v-if="item.diff > 1">{{ i18n.market24 }}：</text>
						<count v-if="item.diff > 1" :end="item.diff"></count>
					</view>
					<view class="soldout" v-if="item.products_status == 5">
						锁单中
					</view> -->
				</view>
				<view class="featured_content">
					<view class="cont_title size-28">{{ item.cast.title }}</view>
					<!-- <view class="cont_title size-24 margin-top-20"># {{ item.tab_no }}</view> -->
					<view class="flex align-center margin-top-20">
						<image :src="item.authors.avatar||'/static/logo.png'" mode="aspectFill" class="author-avatar"></image>
						<view class="cont_title size-24 margin-left-10">{{item.authors.nickname}}</view>
					</view>
					<view class="cont_price text-right color-red">
						{{ item.pre.price || '' }}
						<text>USDT</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示框 -->
		<u-modal v-model="show" class="my-modal" :content="i18n.history3" :show-cancel-button="true" :show-title="false"
			:content-style="curScreenStyle?darkContentStyle:contentStyle" :confirm-text="i18n.history5" :cancel-text="i18n.history4"
			cancel-color="#999999" confirm-color="#333333" :confirm-style="curScreenStyle?darkConfirmStyle:confirmStyle"
			:cancel-style="cancelStyle" @confirm="clear">
		</u-modal>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				contentStyle: {
					color: '#111111',
					fontSize: '30rpx',
					fontWeight: 'bold',
					margin: '20rpx 0'
				},
				darkContentStyle: {
					color: '#FFFFFF',
				},
				confirmStyle: {
					backgroundColor: '#EEEEEE',
					fontWeight: 'bold',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
				},
				darkConfirmStyle: {
					backgroundColor: '#111926',
					fontWeight: 'bold',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
					color: '#FFF'
				},
				cancelStyle: {
					border: '1px solid #EEEEEE',
					margin: '14rpx 30rpx 30rpx',
					borderRadius: '10rpx',
					height: '80rpx',
					lineHeight: '80rpx',
					fontSize: '30rpx',
				},
				featuredList: [],
				params: {
					page: 1,
					limit: 10
				}
			};
		},
		onShow() {
			this.historyList()
		},
		onReachBottom() {
			if (this.featuredList.length >= this.params.limit) {
				this.params.limit += 10
				this.historyList()
			} else {
				this.$refs.uToast.show({
					// 翻到底了~
					title: this.i18n.collections6,
					type: 'warning',
				})
			}
		},
		onNavigationBarButtonTap() {
			this.show = true
		},
		methods: {
			historyList() {
				this.$u.api.history_list(this.params).then(res => {
					this.featuredList = res.data.list.data
				}).catch(err => {

				})
			},
			clear() {
				this.$u.api.history_del().then(res => {
					this.historyList()
				})
			},
			go_commodityDef(id, status) {
				if (status == 0||status == 5) { //在售
					uni.navigateTo({
						url: '../../market/goods-def/goods-def?id=' + id
					})
				}
				if (status == 1) { //预售
					// uni.navigateTo({
					// 	url: '../../market/goods-presale/goods-presale?id=' + id
					// })
				}
				if (status == 2) { //拍卖
					uni.navigateTo({
						url: '../../market/goods-auctionDef/goods-auctionDef?id=' + id
					})
				}
				if (status == 3) { //售罄
					// uni.navigateTo({
					// 	url: '../../market/goods-soldOut/goods-soldOut?id=' + id
					// })
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		/deep/.u-model {
			background-color: #1E1E1E !important;
		}
	}

	/deep/.u-border-top:after {
		border: none;
	}

	/deep/.u-drawer-bottom {
		background-color: transparent;
	}
	
	.featured {
		// background-color: #FAF6F4;
		margin: 30rpx 30rpx 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 60rpx;
	}
	
	.featured_item {
		border-radius: 20rpx;
		width: 334rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		// background-color: #FFFFFF;
		
		.plan {
			border-radius: 20rpx;
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
				color: #111111;
				font-size: 24rpx;
				align-items: center;
		
				.avatar_img {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50rpx;
					margin-right: 25rpx;
					overflow: hidden;
		
					image {
						width: 100%;
					}
				}
			}
		
			.cont_title {
				// color: #111111;
				font-size: 28rpx;
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
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
			display: flex;
			align-items: center;
			justify-content: center;
		
			image {
				width: 24rpx;
			}
		}
		
		.presale {
			position: absolute;
			// color: red;
			font-size: 22rpx;
			bottom: 0rpx;
			left: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.6);
			padding-left: 16rpx;
		}
		
		.type {
			position: absolute;
			color: #fff;
			font-size: 20rpx;
			bottom: 18rpx;
			right: 18rpx;
		}
	}
	
	.author-avatar{
			width: 50rpx;
			height: 50rpx;
			border-radius: 25rpx;
		}
	.soldout{
		position: absolute;
		top: 0;
		right: 0;
		background: rgba(0,0,0,0.5);
		border-radius: 0 0 0 20rpx;
		padding: 8rpx 15rpx;
		font-size: 26rpx;
		color: #eee;
		z-index: 1;
	}
</style>
