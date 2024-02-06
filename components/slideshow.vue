<template>
	<view>
		<view class="banner">
			<view class="item">
				<img :src="dataList[currentIndex]">
			</view>
			<view class="page" v-if="this.dataList.length > 1">
				<view @click="gotoPage(prevIndex)" @click.stop>
					<image class="turn_pages" src="../static/images/prevArrow.png" mode="widthFix"></image>
				</view>
				<!-- <view v-for="(item,index) in dataList" @click="gotoPage(index)"
						:class="{'current':currentIndex == index}" @click.stop> {{index+1}}</view> -->
				<view @click="gotoPage(nextIndex)" @click.stop>
					<image class="turn_pages" src="../static/images/nextArrow.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			imgList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0, //默认显示图片
				timer: null, //定时器
				dataList: []
			};
		},
		watch: {
			dataList: {
				handler(newVal) {
					this.dataList = newVal
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {
			this.$nextTick(function() {
				let arrImg = []
				arrImg = this.imgList
				arrImg.forEach((item) => {
					this.dataList.push(item.img)
				})
			})
		},
		computed: {
			//上一张
			prevIndex() {
				if (this.currentIndex == 0) {
					return this.dataList.length - 1;
				} else {
					return this.currentIndex - 1;
				}
			},
			//下一张
			nextIndex() {
				if (this.currentIndex == this.dataList.length - 1) {
					return 0;
				} else {
					return this.currentIndex + 1;
				}
			},
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
	* {
		margin: 0;
		padding: 0;
	}

	.banner {
		// max-width: 1200px;
		margin: 0 auto;
		position: relative;
	}

	.banner img {
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
	}

	.turn_pages {
		width: 48rpx;
		height: 48rpx;
	}
</style>
