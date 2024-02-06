<template>
	<!-- 备份 - 已弃用 -->
	<view class="box" :class="curScreenStyle ? 'page-black' : 'page-white'">
		<!-- 我的NFT藏品 -->
		<unavbar :title="i18n.collections1" ></unavbar>
		<!-- 藏品数据 -->
		<view class="featured">
			<empty v-if="!featuredList.length"></empty>
			<view class="featured_item" v-for="(item, index) in featuredList" :key="index">
				<!-- 图片 -->
				<view style="position: relative;">
					<view class="cover_box">
						<image :src="item.cover" mode="aspectFit"></image>
						<view class="cover-tagimg" v-if="item.products_type != 2">编号：{{ item.tab_no }}</view>
					</view>
					<!-- 版/衍 -->
					<!-- <view class="tags">{{item.products_type==0?i18n.mylike2:i18n.mylike3}}</view> -->
				</view>
				<view class="featured_content">
					<!-- 标题 -->
					<view class="cont_title">{{ item.title }}</view>
					<!-- 价钱 -->
					<view class="cont_price">
						{{ item.price }}
						<text>USDT</text>
					</view>
					<!-- 更多/转发 -->
					<view class="cont_bot">
						<!-- 更多 -->
						<view class="more-btn move-btn" @click.stop="moreCli(item.id)">查看</view>
						<!-- 转发 -->
						<!-- <u-icon name="zhuanfa" color="#999999" size="38"></u-icon> -->
					</view>
					<view class="con_popup animated zoomIn" v-if="show ? item.id == popupId : false" @click.stop>
						<view @click="open(item)" v-if="item.products_type == 2">开启盲盒</view>
						<view @click="goUp(item)" v-if="item.products_type != 2&&open_sale==1">{{ i18n.collections2 }}</view>
						<view @click="auction(item)" v-if="item.products_type != 2">{{ i18n.collections3 }}</view>
						<view @click="godetail(item.id)" v-if="item.products_type != 2">{{ i18n.collections5 }}</view>
					</view>
				</view>
			</view>
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
			loadStatus:'more',
			
			open_sale: true
		};
	},
	onShow() {
		this.myObject(true);
	},
	onLoad() {
		this.$u.api.open_status().then(res=>{
			this.open_sale = res.data.sys.open_sale
		})
	},
	onPullDownRefresh() {
		this.myObject(true);
	},
	onReachBottom() {
		if(this.loadStatus=='noMore')return
		this.page++
		this.myObject()
	},
	methods: {
		myObject(flag) {
			if(flag)this.page=1
			this.$u.api
				.my_object({
					page: this.page,
					limit: this.limit
				})
				.then(res => {
					if (res.code == 200) {
						uni.stopPullDownRefresh()
						this.featuredList = flag? res.data.list.data:this.featuredList.concat(res.data.list.data);
						this.plat_free = res.data.plat_free;
						this.loadStatus = res.data.list.next_page_url?'more':'noMore'
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
		// 售出
		goUp(item) {
			this.show = false;
			// uni.showToast({
			// 	title: '该功能暂未开放！',
			// 	icon: 'none'
			// });
			uni.navigateTo({
				url: '../go-up/go-up?item=' + JSON.stringify(item)+'&fee='+this.plat_free
			})
		},
		// 拍卖
		auction(item) {
			this.show = false;
			uni.showToast({
				title: '该功能暂未开放！',
				icon: 'none'
			});
			// uni.navigateTo({
			// 	url: '../auction/auction?item=' + JSON.stringify(item)
			// })
		},
		// 点击遮罩层
		umaskCli() {
			if ((this.show = true)) {
				this.show = false;
				if (this.popupId != null) {
					this.popupId = null;
				}
			}
		},
		godetail(id) {
			uni.navigateTo({
				url: '../../market/goods-def/goods-detail?id=' + id
			});
		},
		open(data) {
			this.show = false;
			this.$u.api.open_box({ id: data.id }).then(res => {
				this.$refs.uToast.show({
					title: '开启成功',
					type: 'success',
					duration: 1000
				});
				setTimeout(() => {
					this.page = 1;
					this.myObject(true);
				}, 1000);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	min-height: 100vh;
	background-color: #f9f9f9;
}

page {
	height: 100%;
	background-color: #f9f9f9;
}

.page-black {
	background-color: #1e2020;

	.featured_item {
		background-color: #292b2b !important;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.featured {
		background-color: #1e2020;

		.featured_content {
			background-color: #292b2b !important;

			.cont_title {
				color: #ffffff !important;
			}

			.cont_price {
				color: #f7924c !important;
			}
		}
	}
}

.featured {
	margin: 30rpx 30rpx 0 30rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.featured_item {
		width: 334rpx;
		margin-bottom: 20rpx;
		position: relative;
		background-color: #fff;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.cover_box {
			width: 336rpx;
			height: 336rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			position: relative;

			image {
				width: 100%;
			}
			.cover-tagimg {
				padding: 5rpx 22rpx;
				background-color: rgba(0, 0, 0, 0.5);
				color: #ffffff;
				font-size: 20rpx;
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 20rpx 0 20rpx 0;
			}
		}

		.featured_content {
			background-color: #fff;
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;

			.cont_title {
				color: #111111;
				font-size: 28rpx;
				font-weight: bold;
				padding: 30rpx 0 0 24rpx;
			}

			.cont_price {
				color: #a11716;
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
				justify-content: flex-end;
				padding: 46rpx 30rpx 28rpx 32rpx;
				.more-btn {
					width: 90rpx;
					height: 46rpx;
					line-height: 46rpx;
					text-align: center;
					color: #ffffff;
					font-size: 22rpx;
					background-color: #f7924c;
					border-radius: 23rpx;
				}
				.more {
					display: flex;

					.more_item {
						width: 8rpx;
						height: 8rpx;
						background-color: #999999;
						border-radius: 50%;
						margin-right: 6rpx;
					}
				}
			}

			.con_popup {
				width: 186rpx;
				height: 326rpx;
				background-color: #fff;
				border-radius: 10rpx;
				position: absolute;
				top: 170rpx;
				left: 34rpx;
				z-index: 99999;
				line-height: 3;
				padding-left: 40rpx;
				font-size: 26rpx;
				color: #333333;
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
			background-color: #fff;
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
</style>
