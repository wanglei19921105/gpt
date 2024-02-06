<template>
	<view class="page" :class="getThemeClass">
		<!-- 我的NFT藏品 -->
		<!-- <unavbar title="我的藏品"></unavbar> -->
		<!-- 藏品数据 -->
		<view class="coll-head">
			<u-tabs
				:list="tabs" 
				:is-scroll="false" 
				:current="current" 
				@change="change" 
				:active-color="getMainColor" 
				:inactive-color="getNavInactiveColor" 
				:bg-color="getBgColor"
			></u-tabs>
		</view>
		<view class="gap-100"></view>
		
		<view class="featured">
			<view class="featured_item card-bg" v-for="(item, index) in featuredList" :key="index" @click="godetail(item.id)">
				<!-- 图片 -->
				<view style="position: relative;">
					<view class="cover_box">
						<image :src="item.cover" mode="aspectFit"></image>
						<view class="cover-bottom card-bg"></view>
					</view>
				</view>
				<view class="featured_content">
					<view class="flex justify-between align-center size-28">
						<view class="text-bold line-1 flex-1">{{ item.title }}</view>
						<!-- <view class="text-bold" style="color: #f7924c;">x {{item.count}}</view> -->
					</view>
					<view class="u-m-t-5">
						<text class="text-tips z-font-22">x{{item.count}}</text>
					</view>
				</view>
			</view>
		</view>
		<empty v-if="!featuredList.length"></empty>
		<view class="goShelf" @click="$u.route('/pages/my/release/release')">
			<image src="../../../static/images/goShelf.png" mode="widthFix"></image>
		</view>
		<uni-load-more :status="loadStatus" v-if="featuredList.length>0"></uni-load-more>
		<u-mask :show="show" @click="umaskCli" :mask-click-able="true"></u-mask>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			popupId: null,
			show: false,
			featuredList: [],
			page: 1,
			limit: 10,
			plat_free: 0,

			loadStatus: 'noMore',

			tabs: [{
				name:'藏品',
				id:0
			},{
				name:'盲盒',
				id:1
			}],
			current: 0
		};
	},
	created() {
		
	},
	onShow() {
		this.myObject(true);
	},
	onPullDownRefresh() {
		this.myObject(true);
	},
	onReachBottom() {
		if (this.loadStatus == 'noMore') return;
		this.page++;
		this.myObject();
	},
	methods: {
		godetail(id){
			uni.navigateTo({
				url: `/pages/my/collections/collections-detail?id=${id}&type=${this.current}`
			})
		},
		change(index) {
			if(this.current==index)return
			this.current = index;
			this.myObject(true)
		},
		myObject(flag) {
			if (flag) this.page = 1;

			this.$u.api
				.my_shai({
					page: this.page,
					type:this.tabs[this.current].id
				})
				.then(res => {
					if (res.code == 200) {
						this.featuredList = flag ? res.data.list.data : this.featuredList.concat(res.data.list.data);
						this.loadStatus = res.data.list.next_page_url ? 'more' : 'noMore';
						this.plat_free = res.data.plat_free;
						uni.stopPullDownRefresh()
					}
				})
				.catch(err => {});
		},
		// 跳转商品详情页面
		go_commodityDef(id) {
			uni.navigateTo({
				url: '/pages/market/goods-def/goods-def?id=' + id
			});
		},
		likeCli(id) {
			this.featuredList.some(item => {
				if (item.id == id) {
					if (item.like) {
						item.like = false;
					} else {
						item.like = true;
					}
					return true;
				}
			});
		},
		// 弹出框-更多
		moreCli(id) {
			this.popupId = id;
			this.show = true;
		},
		// 流转
		goUp(item) {
			if (item.type == 0) {
				this.$refs.uToast.show({
					title: '该藏品处于冷却状态',
					type: 'error'
				});
			} else {
				uni.navigateTo({
					url: '../go-up/go-up?item=' + JSON.stringify(item) + '&fee=' + this.plat_free
				});
			}
			this.show = false;
		},
		// 拍卖
		auction(item) {
			uni.navigateTo({
				url: '../auction/auction?item=' + JSON.stringify(item)
			});
			this.show = false;
		},
		// 点击遮罩层
		umaskCli() {
			if ((this.show = true)) {
				this.show = false;
				if (this.popupId != null) {
					this.popupId = null;
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.page{
		padding-top: 0;
	}
	.goShelf{
		position: fixed;
		right: 0;
		bottom: 160rpx;
		image{
			width: 302rpx;
		}
	}
	.coll-head{
		width: 750rpx;
		position: fixed;
		// top: calc(44px + var(--status-bar-height));
		// left: 0;
		z-index: 10;
	}
// .page-black {
// 	background-color: #1e2020;

// 	.featured_item {
// 		background-color: #292b2b !important;
// 		border-top-left-radius: 20rpx;
// 		border-top-right-radius: 20rpx;
// 	}

// 	.featured {
// 		background-color: #1e2020;

// 		.featured_content {
// 			background-color: #292b2b !important;
// 			color: #FFFFFF;

// 			.cont_title {
// 				color: #ffffff !important;
// 			}

// 			.cont_price {
// 				color: #f7924c !important;
// 			}
// 		}
// 	}
// }

.featured {
	margin: 30rpx 30rpx 0 30rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.featured_item {
		width: 334rpx;
		margin-bottom: 20rpx;
		position: relative;
		// background-color: #fff;
		// border-bottom-left-radius: 30rpx;
		// border-bottom-right-radius: 30rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.cover_box {
			width: 336rpx;
			height: 336rpx;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			position: relative;

			image {
				width: 100%;
			}
		}

		.featured_content {
			// background-color: #fff;
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;
			padding: 0 20rpx 20rpx 20rpx;

			.cont_title {
				// color: #111111;
				font-size: 28rpx;
				font-weight: bold;
				padding: 30rpx 0 0 24rpx;
			}

			.cont_price {
				// color: red;
				font-size: 34rpx;
				font-weight: bold;
				padding: 30rpx 0 0 24rpx;

				text {
					font-size: 22rpx;
				}
			}

			.cont_bot {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 46rpx 30rpx 28rpx 32rpx;

				.more {
					display: flex;

					.more_item {
						width: 8rpx;
						height: 8rpx;
						// background-color: #999999;
						border-radius: 50%;
						margin-right: 6rpx;
					}
				}
			}

			.con_popup {
				width: 186rpx;
				// height: 326rpx;
				// background-color: #fff;
				border-radius: 10rpx;
				position: absolute;
				// top: 340rpx;
				bottom: 20rpx;
				left: 34rpx;
				z-index: 99999;
				line-height: 3;
				padding-left: 40rpx;
				font-size: 26rpx;
				// color: #333333;
				font-weight: bold;
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
			text-align: center;
			line-height: 46rpx;

			image {
				width: 26rpx;
			}
		}
	}
}

.tags {
	position: absolute;
	bottom: 20rpx;
	right: 20rpx;
	color: #ffffff;
	font-size: 20rpx;
}

.cover-bottom{
	width: 100%;
	height: 30rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	border-radius: 0rpx 50rpx 0rpx 0rpx;
}
</style>
