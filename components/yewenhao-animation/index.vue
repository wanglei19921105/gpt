<template>
	<view class="box">
		<view class="bg">
			<view style="height: 100%;width: 100%;">
				<view class="bb" :animation="animationData"><!-- 绑定滑动效果 -->
					<view class="ff item-1"
						v-for="(item,index) in 30" :key="index">
						<image class="good_img" src="../../static/logo.png"></image>
						<view class="good_text" v-if="item==17">
							最终大奖
						</view>
						<view class="good_text" v-else>
							普通奖品{{item}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--按钮提示-->
		<view class="button_tip" v-if="count!=0">
			<image class="button_get" src="/static/open/djs.gif"></image>
			<text class="button_djs">{{count}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				late: 0,
				time: 2, //过度时间
				// 定时器
				count: 5,//倒计时五秒结束
				timer: null,
				animationData: {},
				animationDataArr: [],
			}
		},
		onLoad(e) {
			setTimeout(() => {
				this.runLeft()
			}, 1000)
		},
		methods: {
			oneOpen() {
				clearInterval(this.timer)
			},
			runLeft() {
				var animation = uni.createAnimation({
					duration: 5000,
					timingFunction: 'ease',
				})
				this.animation = animation
				animation.translateX('-4200rpx').step()//调试这个值来决定停止位置
				this.animationData = animation.export()
				this.count = 5
				this.timer = setInterval(() => {
					// 创建定时器
					if (this.count == 0) {
						// 关闭定时器
						clearInterval(this.timer)
						this.timer = null
						this.count = 0
						this.Next()//回到初始位置 继续滚动 
					} else {
						this.count--
					}
				}, 1000)
			},
			Next() {
				var animation = uni.createAnimation({
					duration: 5000,
					timingFunction: 'ease',
				})
				this.animation = animation
				animation.translateX(0).step({
					duration: 500,
					timingFunction: 'step-start',
				})
				this.animationData = animation.export()
				setTimeout(() => {
					this.runLeft()
				}, 500)
			},
		}
	}
</script>

<style lang="less">
	view {
		box-sizing: border-box;
	}

	.topBox {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding-left: 20rpx;
		padding-right: 20rpx;

		.box_thum {
			width: 10%;
		}

		.box_thum_bord {
			width: 50rpx;
			height: 50rpx;
			border-radius: 4rpx;
			border: 1rpx solid #72ADDC;
		}

		.box_thum_num {
			position: relative;
			top: -54rpx;
			left: 40rpx;
			z-index: 99;
			font-size: 28rpx;
			font-family: YouSheBiaoTiHei;
			color: #AAFFDE;
			font-weight: bold;
		}
	}

	.bg {
		position: fixed;
		top: 0vh;
		z-index: 120;
		margin-top: 300rpx;
		height: 610rpx;
		width: 100%;
		background-image: url('../../static/open/good.png');
		background-size: 100% 100%;
	}

	.box {
		width: 100vw;
		height: 100vh;
		background-image: url('../../static/open/bg.gif');
		background-size: 100% 100%;
	}

	.bb {
		display: flex;
		align-items: center;
		padding-top: 120rpx;
		flex-shrink: 0;
		height: 100%;
		width: 100%;
	}

	.ff {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 256rpx;
		height: 380rpx;
		flex-shrink: 0;
		color: #fff;
		margin-right: 3%;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.good_text {
		padding-left: 30rpx;
		padding-right: 30rpx;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		color: #FFFFFF;
		font-size: 20rpx;
	}

	.button_tip {
		position: fixed;
		z-index: 10;

		@media screen and (max-height: 767px) {
			top: 70vh;
		}

		//24寸大屏
		@media screen and (min-width: 920px) and (max-width: 940px) {
			top: 70vh;
		}

		top: 60vh;
		width: 750rpx;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.button_get {
			width: 600rpx;
			height: 250rpx;
		}

		.button_djs {
			margin-top: -180rpx;
			margin-left: 300rpx;
			color: #FFFFFF;
			font-size: 98rpx;
			text-align: center;
			font-family: YouSheBiaoTiHei;
			z-index: 99;
		}
	}

	/* 浮动图片 */
	.good_flex {
		width: 40rpx;
		height: 40rpx;
	}

	.good_title {
		color: #AAFFDE;
		font-size: 20rpx;
		width: 80rpx;
		margin-top: -40rpx;
		font-family: YouSheBiaoTiHei;
	}

	.item-1 {
		background-image: url('../../static/open/b1.png');
		background-size: 100% 100%;
	}

	.item-2 {
		background-image: url('../../static/open/b2.png');
		background-size: 100% 100%;
	}

	.item-3 {
		background-image: url('../../static/open/b3.png');
		background-size: 100% 100%;
	}

	.topBox3 {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		top: 80rpx;
		width: 750rpx;
		height: 200rpx;
		padding-top: 30rpx;
		padding-left: 150rpx;
		padding-right: 150rpx;
		flex: 1;
		flex-wrap: wrap;
	}

	.topBox5 {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		top: 80rpx;
		width: 750rpx;
		height: 200rpx;
		padding-top: 30rpx;
		padding-left: 90rpx;
		padding-right: 90rpx;
		flex: 1;
		flex-wrap: wrap;
	}

	.topBox10 {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		top: 70rpx;
		width: 750rpx;
		height: 200rpx;
		padding-top: 30rpx;
		flex: 1;
		flex-wrap: wrap;
	}

	.topBox20 {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: center;
		top: 20rpx;
		width: 750rpx;
		height: 200rpx;
		margin-top: 30rpx;
		flex: 1;
		flex-wrap: wrap;
	}

	.box_thum3 {
		margin-left: 60rpx;
		position: relative;
		height: 70rpx;
		width: 80rpx;
		padding-top: 10rpx;
		flex: 1;
	}

	.box_thum_bord3 {
		width: 50rpx;
		height: 50rpx;
		border-radius: 4rpx;
		border: 1rpx solid #72ADDC;
	}

	.box_thum_num3 {
		position: absolute;
		top: -4rpx;
		right: 30rpx;
		z-index: 99;
		font-size: 28rpx;
		font-family: YouSheBiaoTiHei;
		color: #AAFFDE;
		font-weight: bold;
	}

	.box_thum5 {
		margin-left: 55rpx;
		position: relative;
		height: 70rpx;
		width: 50rpx;
		padding-top: 10rpx;
		flex: 1;
	}

	.box_thum_bord5 {
		width: 50rpx;
		height: 50rpx;
		border-radius: 4rpx;
		border: 1rpx solid #72ADDC;
	}

	.box_thum10 {
		margin-left: 22rpx;
		position: relative;
		height: 70rpx;
		width: 50rpx;
		padding-top: 10rpx;
		flex: 1;
	}

	.box_thum_bord10 {
		width: 50rpx;
		height: 50rpx;
		border-radius: 4rpx;
		border: 1rpx solid #72ADDC;
	}

	.box_thum_num {
		position: absolute;
		top: -4rpx;
		right: 0;
		z-index: 99;
		font-size: 28rpx;
		font-family: YouSheBiaoTiHei;
		color: #AAFFDE;
		font-weight: bold;
	}

	.buttons {
		width: 750rpx;
		display: flex;
		justify-content: space-around;
		padding-top: 100rpx;
	}

	.ljlq {
		color: #FFFFFF;
		font-size: 40rpx;
		font-weight: bold;
		width: 280rpx;
		height: 100rpx;
		align-items: center;
		display: flex;
		justify-content: center;
		border-radius: 10rpx;
		border: solid 2rpx #FFFFFF;
		font-family: YouSheBiaoTiHei;
	}

	.yjhs {
		color: #000000;
		font-size: 40rpx;
		font-weight: bold;
		width: 280rpx;
		height: 100rpx;
		align-items: center;
		display: flex;
		justify-content: center;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		font-family: YouSheBiaoTiHei;
	}

	/* 恭喜获得展示 */
	.popup_bg {
		width: 100%;
		height: 100vh;
		background-image: url('../../static/open/bg.gif');
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.popup_title {
		z-index: 99;
		width: 600rpx;
		height: 125rpx;
		margin-top: 200rpx;
	}

	.popup_one {
		width: 486rpx;
		height: 716rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 100rpx;
	}

	.goodOne {}

	.goodOne-img {
		width: 400rpx;
		height: 400rpx;
	}

	.goodOne-text {
		width: 400rpx;
		height: 130rpx;
		color: #FFFFFF;
		font-size: 20rpx;
		overflow: hidden;
	}

	.scroll-good {
		width: 100%;
		height: 50vh;
	}

	.getAll3 {
		display: flex;
		flex-wrap: wrap;
	}

	.getAll-item3 {
		width: 270rpx;
		height: 375rpx;
		margin-left: 70rpx;
		margin-top: 100rpx;
	}

	.getAll-img3 {
		width: 200rpx;
		height: 200rpx;
		margin-left: 35rpx;
		margin-top: 50rpx
	}

	.getAll-text3 {
		color: #FFFFFF;
		width: 200rpx;
		font-size: 18rpx;
		margin-left: 35rpx;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.getAll5 {
		display: flex;
		flex-wrap: wrap;
		margin-top: -50rpx;
	}

	.getAll-item5 {
		width: 216rpx;
		height: 320rpx;
		margin-left: 32rpx;
		margin-top: 50rpx;
	}

	.getAll-img5 {
		width: 150rpx;
		height: 150rpx;
		margin-top: 40rpx;
		margin-left: 35rpx;
	}

	.getAll-text5 {
		color: #FFFFFF;
		width: 150rpx;
		font-size: 18rpx;
		margin-left: 35rpx;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.getAll10 {
		display: flex;
		flex-wrap: wrap;
		margin-top: -50rpx;
	}

	.getAll-item10 {
		width: 216rpx;
		height: 320rpx;
		margin-top: 50rpx;
		margin-left: 32rpx;
	}

	.getAll-img10 {
		width: 150rpx;
		height: 150rpx;
		margin-top: 50rpx;
		margin-left: 35rpx;
	}

	.getAll-text10 {
		color: #FFFFFF;
		width: 150rpx;
		font-size: 18rpx;
		margin-left: 35rpx;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.getAll20 {
		display: flex;
		flex-wrap: wrap;
		margin-top: -50rpx;
	}

	.getAll-item20 {
		width: 216rpx;
		height: 320rpx;
		margin-top: 50rpx;
		margin-left: 32rpx;
	}

	.getAll-img20 {
		width: 150rpx;
		height: 150rpx;
		margin-left: 35rpx;
		margin-top: 50rpx;
	}

	.getAll-text20 {
		color: #FFFFFF;
		width: 150rpx;
		font-size: 18rpx;
		margin-left: 35rpx;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.recyclePopup {
		width: 640rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
	}

	.recycle_head {
		text-align: center;
		padding: 30rpx;
		font-size: 36rpx;
	}

	.recycle_line {
		height: 1rpx;
		background-color: #d6d6d6;
	}

	.recycle_price {
		padding: 30rpx;
	}

	.recycle_ul_li {
		flex-direction: row;
		margin-bottom: 15rpx;
	}

	.recycle_ul_li_txt {
		width: 400rpx;
		font-size: 26rpx;
		color: #929292;
	}

	.recycle_ul_li_price {
		font-size: 26rpx;
		color: #929292;
	}

	.recycle_ul_li_num {
		font-size: 28rpx;
		color: #F07F23;
	}

	.sure {
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FA6A95;
		color: #FFFFFF;
		border-radius: 50rpx;
		width: 180rpx;
	}

	.button_one {
		position: fixed;
		z-index: 10;
		width: 200rpx;
		height: 70rpx;
		top: 90vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border: solid 2rpx #FFFFFF;
		color: #FFFFFF;
		left: 40rpx;
	}
</style>