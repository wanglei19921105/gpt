<template>
	<view>
		<!-- 盲盒列表 - 暂已弃用 -->
		<empty v-if="!itemData.length"></empty>
		<view class="blindbox" :class="curScreenStyle? 'page-black' : 'page-white'" v-for="(item,index) in itemData"
			:key="index" @click="openWin('/pages/frontPage/blindBox-def/blindBox-def?id='+item.id)">
			<view class="banner">
				<view class="item">
					<!-- <image v-if="item.img.constructor===Array" :src="item.img[currentIndex]"> -->
					<!-- <image v-else :src="item.img"> -->
					<view class="cover_box">
						<image :src="item.cover" mode="widthFix"></image>
						<view class="soldout" v-if="item.num == 0">已售罄</view>
						<view class="soldout" v-if="item.num != 0 && item.diff > 1">
							<count :end="item.diff"></count>
							<text class="u-font-28">{{i18n.market22}}</text>
						</view>
					</view>
				</view>
				<!-- <view class="page" v-if="item.img.constructor===Array">
					上页
					<view @click="gotoPage(prevIndex)" @click.stop>
						<image class="turn_pages" src="/static/images/prevArrow.png" mode="widthFix"></image>
					</view>
					下页
					<view @click="gotoPage(nextIndex)" @click.stop>
						<image class="turn_pages" src="/static/images/nextArrow.png" mode="widthFix"></image>
					</view>
				</view> -->
			</view>

			<view class="blindbox_name">
				{{item.title}}
			</view>
			<view class="in_stock">
				库存：{{item.num}}/{{item.cast_num}}
			</view>
		</view>
	</view>
</template>

<script>
	import slideshow from './slideshow.vue';
	import count from '@/components/count.vue';
	export default {
		components: {
			slideshow,
			count
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		name: "blindbox",
		data() {
			return {
				itemData: [],
				currentIndex: 0, //默认显示图片
				timer: null, //定时器
			};
		},
		watch: {
			list(val) {
				this.itemData = val
			}
		},
		computed: {
			//上一张
			prevIndex() {
				if (this.currentIndex == 0) {
					return this.itemData.length - 1;
				} else {
					return this.currentIndex - 1;
				}
			},
			//下一张
			nextIndex() {
				if (this.currentIndex == this.itemData.length - 1) {
					return 0;
				} else {
					return this.currentIndex + 1;
				}
			},
		},
		mounted() {
			this.itemData = this.list
		},
		methods: {
			gotoPage(index) {
				this.currentIndex = index;
			},
			// 定时器翻页
			runInv() {
				this.timer = setInterval(() => {
					this.gotoPage(this.nextIndex)
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-black {
		background-color: #292B2B !important;

		.blindbox_name {
			color: #FFFFFF !important;
		}

		.in_stock {
			color: #999999 !important;
		}
	}

	.blindbox {
		margin: 30rpx;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
		// border-top-left-radius: 30rpx;
		// border-top-right-radius: 30rpx;

		.blindbox_img {
			width: 100%;
			display: block;
		}

		.blindbox_name {
			color: #111;
			font-size: 32rpx;
			font-weight: bold;
			margin: 44rpx 32rpx 0;
		}

		.in_stock {
			font-size: 24rpx;
			color: #747474;
			padding: 30rpx 32rpx 36rpx;
		}
	}
	
	.cover_box{
		height: 690rpx;
		overflow: hidden;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		display: flex;
		align-items: center;
		position: relative;
	}

	.banner {
		// max-width: 1200px;
		margin: 0 auto;
		position: relative;
	}

	.banner image {
		width: 100%;
		height: 690rpx;
		display: block;
	}

	.banner .page {
		position: absolute;
		top: 50%;
		margin-top: -30rpx;
		height: 60rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 26rpx;

		view {
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
