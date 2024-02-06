<template>
	<view class="page" :class="getThemeClass">
		<!-- <unavbar :title="i18n.my13"></unavbar> -->
		<!-- 藏品数据 -->
		<u-tabs
			:list="list" 
			:is-scroll="false" 
			:current="current" 
			@change="change" 
			:active-color="getMainColor" 
			:inactive-color="getNavInactiveColor" 
			:bg-color="getBgColor"
		></u-tabs>
		<view class="featured" v-if="current == 0">
			<empty v-if="!featuredList.length"></empty>
			<view class="featured_item card-bg" v-for="(item,index) in featuredList" :key="index">
				<!-- 图片 -->
				<view style="position: relative;">
					<view class="plan">
						<image :src="item.cover" mode="aspectFit"></image>
					</view>
					<!-- <view class="tags">{{item.products_cast_type==0?'版':'衍'}}</view> -->
				</view>
				<view class="featured_content">
					<!-- 标题 -->
					<view class="cont_title">{{item.title}}</view>
					<!-- 价钱 -->
					<view class="cont_price">
						<view class="price_text color-red">
						{{item.price}}<text>USDT</text></view>
						<!-- <view class="cont_num">数量：99</view> -->
						<view class="num text-content">{{i18n.mycasting4}}:{{item.cast_num}}</view>
					</view>
					<!-- 时间 -->
					<view class="bot_time text-tips">
						{{i18n.mycasting5}}：{{item.created_at}}
					</view>
					<view class="con_popup animated zoomIn card-bg" v-if="show? item.id == popupId:false" @click.stop>
						<!-- 下架 -->
						<!-- <view @click="godown(item.id)">下架</view> -->
						<view @click="goup(item)">{{i18n.mycasting6}}</view>
						<!-- 拍卖 -->
						<view @click="auction(itemTags)">{{i18n.mycasting10}}</view>
						<!-- 复制链接 -->
						<view>{{i18n.mycasting7}}</view>
						<!-- 查看详情 -->
						<view @click="checkDef(item.id)">{{i18n.mycasting8}}</view>
					</view>
				</view>
				<!-- <view class="like" @click="likeCli(item.id)" @click.stop>
					<image v-if="curScreenStyle"
						:src="item.like?'/static/images/darkLike1.png':'/static/images/heart1.png'" mode="widthFix">
					</image>
					<image v-if="!curScreenStyle"
						:src="item.like?'/static/images/heart2.png':'/static/images/heart1.png'" mode="widthFix">
					</image>
				</view> -->
			</view>
		</view>
		<view class="featured" v-if="current == 1">
			<empty v-if="!accomplish.length"></empty>
			<view class="featured_item card-bg" v-for="(item,index) in accomplish" :key="index">
				<!-- @click="go_commodityDef(item.id)" -->
				<!-- 图片 -->
				<view style="position: relative;">
					<view class="plan">
						<image :src="item.cover" mode="aspectFit"></image>
					</view>
					<!-- <view class="tags">{{item.tags==1?i18n.mycasting11:i18n.mycasting12}}</view> -->
				</view>
				<view class="featured_content">
					<!-- 标题 -->
					<view class="cont_title">{{item.title}}</view>
					<!-- 价钱 -->
					<view class="cont_price">
						<view class="price_text color-red">
							{{item.price}}<text>USDT</text>
						</view>
						<view class="num text-content">{{i18n.mycasting4}}:{{item.cast_num}}</view>
					</view>
					<!-- 更多/转发 -->
					<view class="cont_bot" v-if="item.show_type==0">
						<!-- 更多 -->
						<view class="more" @click="moreCli(item.id,item.tags)" @click.stop>
							<view class="more_item"></view>
							<view class="more_item"></view>
							<view class="more_item"></view>
						</view>
						<!-- 转发 -->
						<!-- <u-icon name="zhuanfa" color="#999999" size="38"></u-icon> -->
					</view>
					<view class="con_popup animated zoomIn card-bg" v-if="show?item.id == popupId:false" @click.stop>
						<!-- 上架 -->
						<view @click="goup(item)">{{i18n.mycasting6}}</view>
						<!-- 拍卖 -->
						<!-- <view @click="auction(item)">{{i18n.mycasting10}}</view> -->
						<!-- 复制链接 -->
						<!-- <view>{{i18n.mycasting7}}</view> -->
						<!-- 查看详情 -->
						<!-- <view @click="checkDef(item.id)">{{i18n.mycasting8}}</view> -->
					</view>
				</view>
				<!-- <view class="like" @click="likeCli(item.id)" @click.stop>
					<image v-if="curScreenStyle"
						:src="item.like?'/static/images/darkLike1.png':'/static/images/heart1.png'" mode="widthFix">
					</image>
					<image v-if="!curScreenStyle"
						:src="item.like?'/static/images/heart2.png':'/static/images/heart1.png'" mode="widthFix">
					</image>
				</view> -->
			</view>
		</view>
		<u-mask :show="show" @click="umaskCli" :mask-click-able="true" z-index="10000"></u-mask>
		<!-- 是否下架该商品 -->
		<!-- <u-modal v-model="show1" :content="i18n.mycasting9" :show-cancel-button="true" :show-title="false"
			:content-style="curScreenStyle?darkContentStyle:contentStyle" :confirm-text="i18n.history5" :cancel-text="i18n.history4"
			cancel-color="#999999" confirm-color="#333333" :confirm-style="curScreenStyle?darkConfirmStyle:confirmStyle"
			:cancel-style="cancelStyle" @confirm="confirmDown">
		</u-modal> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupId: null,
				show1: false,
				show: false,
				itemTags: null,
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
					backgroundColor: '#444444',
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
				list: [{
					name: ''
				}, {
					name: ''
				}],
				featuredList: [],
				accomplish: [],
				current: 0,
				order_id: null,
				plat_free:0
			};
		},
		onShow() {
			this.myListcheck()
			this.myList()
			this.show = false
		},
		onPullDownRefresh() {
			if(this.current === 0){
				this.myListcheck()
			} else {
				this.myList()
			}
		},
		created() {
			this.list[0].name = this.i18n.mycasting2
			this.list[1].name = this.i18n.mycasting3
		},
		methods: {
			myListcheck() { //我的铸造(审核中)
				this.$u.api.my_list_check({
					type: 0
				}).then(res => {
					if (res.code == 200) {
						this.featuredList = res.data.list
						uni.stopPullDownRefresh()
					}
				}).catch(err => {})
			},
			myList() { //我的铸造(已完成)
				this.$u.api.my_list_cast_check({
					type:1
				}).then(res => {
					if (res.code == 200) {
						this.accomplish = res.data.list
						this.plat_free = res.data.plat_free
						uni.stopPullDownRefresh()
					}
				}).catch(err => {})
			},
			change(index) {
				console.log(index);
				this.current = index;
				if (index == 1) {
					this.myList()
				}
			},
			// 跳转商品详情页面
			go_commodityDef(id) {
				uni.navigateTo({
					url: '/pages/market/goods-def/goods-def?id=' + id
				})
			},
			// 上架
			goup(item) {
				if(item.show_type==0){
					// uni.navigateTo({
					// 	url: '../go-up/go-up-one?item=' + JSON.stringify(item) + '&fee=' + this.plat_free
					// })
					uni.navigateTo({
						url: '../go-up/go-up-one?id=' + item.id + '&fee=' + this.plat_free
					})
				}
			},
			likeCli(id) {
				this.featuredList.some((item) => {
					if (item.id == id) {
						if (item.like) {
							item.like = false
						} else {
							item.like = true
						}
						return true
					}
				})
			},
			// 弹出框-更多
			moreCli(id, tags) {
				this.itemTags = tags
				this.popupId = id
				this.show = true
			},
			// 拍卖
			auction(item) {
				uni.navigateTo({
					url: '../auction/auction?id=' + item.id
				})
				this.show = false
			},
			// 点击遮罩层
			umaskCli() {
				if (this.show = true) {
					this.show = false
					if (this.popupId != null) {
						this.popupId = null
					}
				}
			},
			// 下架
			godown(id) {
				this.order_id = id
				if (this.show1) {
					this.show1 = false
				} else {
					this.show1 = true
				}
			},
			// 查看详情
			checkDef(id) {
				uni.navigateTo({
					url: '../../market/goods-def/goods-detail?id=' + id
				})
				this.show = false
			},
			// 确定上架商品按钮
			// confirmDown() {
			// 	let that = this
			// 	that.show = false
			// 	that.$u.api.up({'order_id':this.order_id}).then(res=>{
			// 		if(res.code == 200){
			// 			that.myList()
			// 		}
			// 	}).catch(err=>{})
			// }
			navTo() {
				uni.switchTab({
					url: '../../tabbar/mine/mine'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box {
	// 	min-height: 100vh;
	// 	background-color: #F9F9F9;
	// 	padding-bottom: 60rpx;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;

	// 	.navbar {
	// 		background-color: #1E2020;

	// 		.nav_title {
	// 			color: #FFFFFF;
	// 		}
	// 	}

	// 	.featured {
	// 		background-color: #1E2020;
			
	// 		.featured_item{
	// 			background-color: #292B2B;
	// 		}

	// 		.featured_content {
	// 			background-color: #292B2B !important;

	// 			.cont_title {
	// 				color: #FFFFFF !important;
	// 			}

	// 			.price_text {
	// 				color: #F7924C !important;
	// 			}
	// 		}
	// 	}

	// 	/deep/.u-model[data-v-713d0fd3] {
	// 		background-color: #303131 !important;
	// 	}
	// }
	.page {
		// padding-top: 30rpx;
	}
	.featured {
		// background-color: #FAF6F4;
		margin: 30rpx 30rpx 0 30rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.featured_item {
			border-radius: 20rpx;
			width: 334rpx;
			margin-bottom: 20rpx;
			// background-color: #FFFFFF;
			position: relative;

			.plan {
				width: 100%;
				height: 336rpx;
				overflow: hidden;
				display: block;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
				display: flex;
				align-items: center;
			}

			.featured_content {
				// background-color: #fff;
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;

				.cont_title {
					// color: #111111;
					font-size: 28rpx;
					font-weight: bold;
					padding: 30rpx 0 0 24rpx;
				}

				.cont_price {
					padding: 30rpx 24rpx 30rpx;
					// padding: 30rpx 24rpx 0 24rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.price_text {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						// color: #A11716;
						font-size: 34rpx;
						font-weight: bold;

						text {
							font-size: 22rpx;
						}
					}

					.num {
						font-size: 20rpx;
						// color: #999999;
					}

					.cont_num {
						// color: #999999;
						font-size: 20rpx;
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
							background-color: #999999;
							border-radius: 50%;
							margin-right: 6rpx;
						}
					}
				}

				.bot_time {
					font-size: 20rpx;
					// color: #999999;
					padding: 40rpx 20rpx 30rpx;
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
				background-color: rgba(255, 255, 255, .5);
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
		color: #FFFFFF;
		font-size: 20rpx;
	}

	/deep/.u-border-top:after {
		border: none;
	}

	/deep/.u-drawer-bottom {
		background-color: transparent;
	}

	.navbar {
		height: 88rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		margin: 0 24rpx;
		justify-content: space-between;
		text-align: center;

		.uicon,
		view {
			flex: 1;
		}

		.nav_title {
			color: #333333;
			font-size: 34rpx;
			font-weight: bold;
		}
	}
</style>
