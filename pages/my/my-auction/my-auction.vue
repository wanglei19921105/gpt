<template>
	<view class="page" :class="getThemeClass">
		<!-- 我的竞拍 -->
		<!-- <unavbar :title="i18n.myauction1"></unavbar> -->
		<u-tabs
			:list="list" 
			:is-scroll="false" 
			:current="current" 
			@change="change" 
			:active-color="getMainColor" 
			:inactive-color="getNavInactiveColor" 
			:bg-color="getBgColor"
		></u-tabs>
		<!-- 已交保 -->
		<view v-if="current == 0">
			<empty v-if="!listData.length"></empty>
			<view class="auction_item card-bg" v-for="(item,index) in listData" :key="index">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<!-- NFT铸品名称 -->
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red">
									{{item.price}}<text>USDT</text>
								</view>
							</view>
							<!-- <view class="head_right">
							待付款
						</view> -->
						</view>
						<view class="casting_flex border-color">
							<!-- 保证金 -->
							<view class="casting_left text-call">{{i18n.myauction2}}</view>
							<view class="casting_right">
								<view class="weight_bold">{{item.bail}}USDT</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<!-- 结束时间 -->
							<view class="casting_left text-call">{{i18n.myauction3}}</view>
							<view class="casting_right text-content">
								<view>{{item.end_time}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 去竞拍 -->
				<botBtnp :btnText="i18n.myauction4" style="margin-top: 40rpx;" @click="goAuction(item.id)"></botBtnp>
			</view>
		</view>
		<!-- 竞价中 -->
		<view v-if="current == 1">
			<empty v-if="!listData.length"></empty>
			<view class="auction_item card-bg" v-for="(item,index) in listData" :key="index">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<!-- NFT铸品名称 -->
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red">
									{{item.price}}<text>USDT</text>
								</view>
							</view>
							<!-- <view class="head_right">
								待付款
							</view> -->
						</view>
						<view class="casting_flex border-color">
							<!-- 保证金 -->
							<view class="casting_left text-call">{{i18n.myauction2}}</view>
							<view class="casting_right">
								<view class="weight_bold">{{item.bail}}USDT</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<!-- 结束时间 -->
							<view class="casting_left text-call">{{i18n.myauction3}}</view>
							<view class="casting_right text-content">
								<view>{{item.end_time}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 去出价 -->
				<botBtnp :btnText="i18n.myauction5" style="margin-top: 40rpx;" @click="goBid(item.id,item.end_time)">
				</botBtnp>
			</view>
		</view>
		<!-- 已结束 -->
		<view v-if="current == 2">
			<empty v-if="!listData.length"></empty>
			<view class="auction_item card-bg" v-for="(item,index) in listData" :key="index">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix"></image>
					<view class="casting_info">
						<view class="casting_head">
							<view class="head_left">
								<!-- NFT铸品名称 -->
								<view class="name">{{item.title}}</view>
								<view class="name u-m-t-10" v-if="item.tab_no">
									<text class="u-font-24 text-content" style="font-weight: 500">编号：{{item.tab_no}}</text>
								</view>
								<view class="price color-red">
									{{item.price}}<text>USDT</text>
								</view>
							</view>
							<view class="head_right color-green" v-if="item.auction_status==1 && item.back_status!=2">
								竞拍成功
							</view>
							<view class="head_right color-red" v-if="item.auction_status== 0 && item.back_status!=2">
								未竞拍成功
							</view>
							<view class="head_right color-red" v-if="item.back_status==2">
								已失效
							</view>
						</view>
						<view class="casting_flex border-color">
							<!-- 保证金 -->
							<view class="casting_left text-call">{{i18n.myauction2}}</view>
							<view class="casting_right">
								<view class="weight_bold">{{item.bail}}USDT</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<!-- 结束时间 -->
							<view class="casting_left text-call">{{i18n.myauction3}}</view>
							<view class="casting_right text-content">
								<view>{{item.end_time}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 去支付 -->
				<botBtnp :btnText="i18n.myauction7" style="margin-top: 40rpx;" @click="goPay(item.id)" v-if="item.pay_status == 0 && item.auction_status==1 && item.back_status!=2"></botBtnp>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: ''
				}, {
					name: ''
				}, {
					name: ''
				}],
				current: 0,
				params: {
					type: 0, //类型0已交保1竞价中2已结束
					page: 1,
					limit: 2
				},
				listData: {}, //我的竞拍数据
				listStatus: 'loading',
			};
		},
		onShow() {
			this.change(this.current)
		},
		onPullDownRefresh() {
			this.change(this.current)
		},
		onLoad(option) {
			if (option.current) {
				if (option.current == 1) {
					this.params.type = 1
					this.current = option.current
				}
			}
			this.list[0].name =  this.i18n.myauction8
			this.list[1].name =  this.i18n.myauction9
			this.list[2].name =  this.i18n.myauction10
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/my/my-auction/my-auction-launch'
			})
		},
		onReachBottom() {
			if (this.listStatus === 'loadmore') {
				this.loadData()
			} else {
				this.$refs.uToast.show({
					// 已经翻到底啦~
					title: this.i18n.artist3,
					type: 'warning',
				})
			}
		},
		methods: {
			loadData(reset) {
			
				if(reset){
					this.params.page = 0
					this.listData = []
				}
				this.params.page += 1
				this.listStatus = 'loading'
			
				this.$u.api.my_auction(this.params).then(res => {
					if (res.code == 200) {
						this.listData = this.listData.concat(res.data.list.data)
						this.listStatus = res.data.list.next_page_url ? 'loadmore' : 'nomore'
						uni.stopPullDownRefresh()
					}
				}).catch(err => {
					uni.stopPullDownRefresh()
					this.listStatus = 'loadmore'
				})
			},
			change(index) {
				this.current = index
				this.params.type = index
				this.loadData(true)
			},
			// 去竞拍
			goAuction(id) {
				uni.navigateTo({
					url: '../../market/auction-payTheBid/auction-payTheBid?id=' + id
				})
			},
			// 去出价
			goBid(id, time) {
				let endTime = time
				let date = new Date(endTime)
				if (date.getTime() < Date.now()) { //过期
					this.$refs.uToast.show({
						// 拍卖时间已过期
						title: this.i18n.myauction11,
						type: 'warning',
					})
				} else {
					uni.navigateTo({
						url: '../../market/auction-payTheBid/auction-payTheBid?id=' + id
					})
				}
			},
			// 去支付
			goPay(id) {
				uni.navigateTo({
					url: '../auction-pay/auction-pay?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

	.weight_bold {
		font-weight: bold;
	}

	.auction_item {
		margin: 20rpx 30rpx 30rpx;
		border-radius: 30rpx;
		overflow: hidden;
		// background-color: #fff;
		padding-bottom: 40rpx;
	}

	.head_img {
		image {
			width: 100%;
		}
	}

	.casting_info {
		padding: 0 30rpx;

		.casting_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 230rpx;

			.name {
				// color: #111111;
				font-size: 32rpx;
				margin-bottom: 36rpx;
				font-weight: bold;
			}

			.price {
				// color: #A11716;
				font-size: 38rpx;
				font-weight: bold;

				text {
					font-size: 26rpx;
				}
			}

			.head_right {
				// color: #EEB32E;
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.casting_flex {
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.casting_left {
				// color: #999999;
				font-size: 26rpx;
			}

			.casting_right {
				// color: #111111;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					margin-right: 24rpx;
				}

				.uicon {
					margin-left: 20rpx;
					width: 22rpx;
					border-radius: 0;
				}
			}
		}

		.casting_flex+.casting_flex {
			border-top: 1px solid;
		}
	}

	.audit {
		margin: 40rpx 30rpx;
		background-color: #D2D2D2;
		color: #fff;
		font-size: 30rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 10rpx;
	}

	.release {
		margin: 40rpx 30rpx;
		background-color: #D1514B;
		color: #fff;
		font-size: 30rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 10rpx;
	}
</style>
