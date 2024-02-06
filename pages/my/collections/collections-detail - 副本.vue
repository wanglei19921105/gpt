<template>
	<view class="page" :class="getThemeClass">
		<!-- 我的NFT藏品 -->
		<!-- <unavbar title="系列藏品"></unavbar> -->
		<!-- 藏品数据 -->
		
		<view class="featured">
			<empty v-if="!featuredList.length"></empty>
			<view class="featured_item card-bg" v-for="(item, index) in featuredList" :key="index">
				<!-- 图片 -->
				<view style="position: relative;">
					<view class="cover_box" @click="godetail(item.id)"><image :src="item.cover" mode="aspectFit"></image></view>
					<!-- 版/衍 -->
					<!-- <view class="tags">{{item.products_type==0?i18n.mylike2:i18n.mylike3}}</view> -->
				</view>
				<view class="featured_content">
					<!-- 标题 -->
					<view class="cont_title">{{ item.title }}</view>
					<!-- 价钱 -->
					<view class="cont_price color-red">
						{{ item.price }}
						<text>USDT</text>
					</view>
					<!-- 更多/转发 -->
					<view class="cont_bot">
						<!-- 更多 -->
						<view class="more" @click="moreCli(item.id)" @click.stop>
							<view class="more_item"></view>
							<view class="more_item"></view>
							<view class="more_item"></view>
						</view>
						<!-- 转发 -->  
						<view class="text-tips size-24" v-if="item.tab">编号：{{item.tab}}</view>
					</view>
					<view class="con_popup animated zoomIn card-bg" v-if="show ? item.id == popupId : false" @click.stop>
						<view @click="open(item)" v-if="item.products_type == 2">开启盲盒</view>
						<!-- 流转 -->
						<!-- <view @click="goUp(item)" v-if="item.products_type != 2 && open_sale == 1">{{ i18n.collections2 }}</view> -->
						<template v-if="open_sale == 1&&item.pre_sale_status==1">
							<!-- <view @click="goUp(item)" v-if="item.sale_status == 1">{{ i18n.collections2 }}</view> -->
							<view @click="goUp(item)" v-if="item.sale_status == 1">流转</view>
						</template>
						<!-- 拍卖 -->
						<template v-if="open_auction == 1">
							<view @click="auction(item)" v-if="item.products_type != 2">{{ i18n.collections3 }}</view>
						</template>
						<!-- 转赠 -->
						<!-- <view @click="giving(item)" v-if="item.products_type != 2 && open_transfer == 1">转赠</view> -->
						<template v-if="open_transfer == 1">
							<view @click="giving(item)" v-if="item.transfer_status == 1">转赠</view>
						</template>
						<!-- 查看详情 -->
						<!-- <view @click="godetail(item.id)" v-if="item.products_type != 2">{{ i18n.collections5 }}</view> -->
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
		<uni-load-more :status="loadStatus" v-if="featuredList.length>0"></uni-load-more>
		<u-mask :show="show" @click="umaskCli" :mask-click-able="true"></u-mask>
		<u-toast ref="uToast" />
		
		<!-- 盲盒挑选-弹窗 -->
		<u-popup v-model="showbox" mode="center" border-radius="20" width="690rpx" height="874rpx"
			:mask-close-able="false">
			<view class="popup_title">
				<!-- 请选择您要拆开的盲盒 -->
				{{i18n.blindbox2}}
			</view>
			<view class="box_flex">
				<view v-for="(item,index) in boxData" :key="index">
					<image class="box_img" :src="item.img" mode="widthFix" @click="openblindbox"></image>
				</view>
			</view>
		</u-popup>
		
		<view class="svgaPage" style="width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;" v-show="showSVGA">
			<!-- <view id="svgaBox" ref="svgaBox" style="width: 100vw;height: 100vh; background-color: aqua;" ></view> -->
			<l-svga style="width: 100vw; height: 100vh;" ref="svga"></l-svga>
		</view>
		
		<botBtn
			padding="24rpx 120px"
			radius="50rpx"
			class="collectBtn"
			@click="openAll"
			v-if="type == 1"
		>一键开启全部盲盒</botBtn>
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
			current: 0,
			
			cast_id:0,
			open_auction: 0,
			open_sale: 0,
			open_transfer: 0,
			open_transfer_out: 0,
			
			boxData: [
				// {
				// 	id: 1,
				// 	img: '/static/images/box1.png'
				// }, {
				// 	id: 2,
				// 	img: '/static/images/box2.png'
				// }, {
				// 	id: 3,
				// 	img: '/static/images/box3.png'
				// }, {
				// 	id: 4,
				// 	img: '/static/images/box4.png'
				// },
			],
			showbox:false,
			nowid:'',
			type: 0,
			
			// svgaFileUrl: `${uni.$myAppConfig.baseUrl}/svga/surprise_blind_box.svga`,
			svgaFileUrl: `/static/images/surprise_blind_box.svga`,
			showSVGA: false,
			player: null,
			parser: null,
			myVideoItem: null,
		};
	},
	onLoad(data) {
		this.type = data.type
		this.cast_id = data.id
		this.myObject(true);
	},
	onPullDownRefresh() {
		this.myObject(true);
	},
	onShow() {
		this.$u.api.open_status().then(res=>{
			this.open_auction = +res.data.sys.open_auction
			this.open_sale = +res.data.sys.open_sale
			this.open_transfer = +res.data.sys.open_transfer
			this.open_transfer_out = +res.data.sys.open_transfer_out
		})
	},
	onReachBottom() {
		if (this.loadStatus == 'noMore') return;
		this.page++;
		this.myObject();
	},
	methods: {
		openblindbox(){
			this.$u.api.open_box({ id: this.nowid }).then(res => {
				this.showbox = false
				uni.showToast({
					title:"开启成功",
					icon:"none"
				})
				this.page = 1;
				this.myObject(true);
			});
		},
		change(index) {
			if(this.current==index)return
			this.current = index;
			this.myObject(true)
		},
		myObject(flag) {
			if (flag) this.page = 1;

			this.$u.api
				.my_object({
					page: this.page,
					cast_id:this.cast_id,
					type: this.type
				})
				.then(res => {
					if (res.code == 200) {
						this.featuredList = flag ? res.data.list.data : this.featuredList.concat(res.data.list.data);
						this.loadStatus = res.data.list.next_page_url ? 'more' : 'noMore';
						this.plat_free = res.data.plat_free;
					}
					uni.stopPullDownRefresh()
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
				uni.redirectTo({
					url: '../go-up/go-up?id=' + item.id + '&fee=' + this.plat_free
				});
			}
			this.show = false;
		},
		// 拍卖
		auction(item) {
			uni.navigateTo({
				url: '../auction/auction?id=' + item.id
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
		},
		godetail(id) {
			uni.navigateTo({
				url: '../../market/goods-def/goods-detail?id=' + id
			});
		},
		open(data) {
			this.show = false;
			uni.showLoading({
				title: '加载中...'
			})
			this.$u.api.open_box({
				id: data.id
			}).then(res => {
				uni.hideLoading()
				this.svgPlay().then(() => {
					this.$refs.uToast.show({
						title: '开启成功',
						type: 'success',
						duration: 1000,
						callback: () => {
							this.page = 1;
							this.myObject(true);
							uni.navigateBack()
							// setTimeout(() => {
							// 	uni.switchTab({
							// 		url: '/pages/tabbar/mine/mine'
							// 	})
							// }, 500)
						}
					});
				})
			});
		},
		openAll() {
			// this.show = false;
			uni.showLoading({
				title: '加载中...'
			})
			this.$u.api.batch_open_box({
				cast_id: this.cast_id
			}).then(res => {
				uni.hideLoading()
				this.svgPlay().then(() => {
					this.$refs.uToast.show({
						title: '开启成功',
						type: 'success',
						duration: 1000,
						callback: () => {
							this.page = 1;
							this.myObject(true);
						}
					});
				})
			});
		},
		giving(item){
			// this.show = false
			this.item = item
			// if (item.products_type == 0) {
			// 	// this.show = true
			// 	return false
			// }
			// 如果是衍生品 直接跳转到 转赠衍生品页面
			uni.navigateTo({
				url: '/pages/my/derivatives/derivatives?id=' + item.id
			})
			this.show = false;
		},
		svgPlay() {
			return new Promise((res, rej) => {
				this.showSVGA = true
				this.loadSVGA().then(() => {
					this.player.startAnimation();
					this.player.onFinished(() => {
						this.showSVGA = false
						res()
					})
				})
				// if (!this.player) {
				// 	this.loadSVGA().then(() => {
				// 		this.player.startAnimation();
				// 		this.player.onFinished(() => {
				// 			this.showSVGA = false
				// 			res()
				// 		})
				// 	})
				// } else {
				// 	this.player.startAnimation();
				// 	this.player.onFinished(() => {
				// 		this.showSVGA = false
				// 		res()
				// 	})
				// }
			})
		},
		loadSVGA() {
			return new Promise((res, rej) => {
				this.$refs.svga.render(async (par, pla) => {
					this.player = pla
					this.parser = par
				  this.myVideoItem = await this.parser.load(this.svgaFileUrl);
				  await this.player.setVideoItem(this.myVideoItem);
					this.player.loops = 1
					this.player.clearsAfterStop = true
					res()
				})
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.page{
		padding-top: 0;
	}
	.collectBtn{
		position: fixed;
		bottom: 20rpx;
	}
	.coll-head{
		width: 750rpx;
		position: fixed;
		// top: calc(44px + var(--status-bar-height));
		// left: 0;
		z-index: 10;
	}
.popup_title {
		height: 160rpx;
		line-height: 160rpx;
		text-align: center;
		font-size: 34rpx;
		// color: #333333;
		font-weight: bold;
	}
	.box_flex {
		display: flex;
		flex-wrap: wrap;
		margin: 0 40rpx;
		justify-content: space-between;
	
		.box_img {
			width: 286rpx;
			height: 286rpx;
			margin-bottom: 66rpx;
			border-radius: 30rpx;
		}
	}
	
// page {
// 	height: 100%;
// 	background-color: #f9f9f9;
// }

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

// 			.cont_title {
// 				color: #ffffff !important;
// 			}

// 			.cont_price {
// 				color: #f7924c !important;
// 			}
// 		}
// 	}
// }
// .page{
// 	padding-top: 30rpx;
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
		// border-bottom-left-radius: 20rpx;
		// border-bottom-right-radius: 20rpx;
		border-radius: 20rpx;
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

			image {
				width: 100%;
			}
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
						background-color: #999999;
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
			background-color: rgba(255, 255, 255, 0.5);
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
