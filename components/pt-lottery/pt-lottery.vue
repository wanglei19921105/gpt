<template>
	<view class="pt-lottery">
		<view class="pt-lottery-box">
			<view  :animation="animationData" class="pt-lottery-bg">
				<image :src="lotteryBg" class='pt-lottery-bg-img'></image>
				<view class="prize-list">
					<view class="prize-item" v-for="(data,index) in showPrizeList" :key="index">
						<view class="prize-item-info" :style="{'transform': 'rotate('+data.turn+')'}">
							<view class="prize-name">{{data.prize_name}}</view>
							<view v-if="data.prize_image" class="prize-icon"><image :src="data.prize_image" mode="aspectFit"></image></view>
						</view>
					</view>
				</view>
			</view>
			<view @click="throttle(getLottery,gapTimes)" class="pt-lottery-btn"><image :src="lotteryBtn"></image></view>
		</view>
	</view>
</template>

<script>
	/** 参数
	* lotteryBg 大转盘背景，不用纯色块，界面不好看
	* lotteryBtn 点击抽奖按钮
	* prizeList 奖品列表 [{prizeName,prizeIcon}]
	* times 抽奖次数
	* gapTimes 几秒钟内触发1次
	*	runTimes 转盘旋转时间与转动的速度
	*/
 let timer, flag;
	export default {
		props: {
			lotteryBg: {
				type: String,
				default: ''
			},
			lotteryBtn: {
				type: String,
				default: ''
			},
			prizeList: {
				type: Array,
				default () {
					return []
				}
			},
			gapTimes: {
				type: Number,
				default: 2000
			},
			runTimes: {
				type: Number,
				default: 5000
			}
		},
		data() {
			return {
        $:this.$,
				animationData: {},
				runDegs: '',
				is_lottery: false,
				showPrizeList: [],
			}
		},
		created(){
			var awardsConfig = this.prizeList,
				len = awardsConfig.length,
				awardsList = [],
				turnNum = 1 / len,
          num = 0
      console.log('awardsConfig',awardsConfig)
			for (var i = 0; i < len; i++) {
        console.log((i) * turnNum + 'turn')
				awardsList.push({ turn: ((i) * turnNum) + (i == 0 ? 0 : num) + 'turn', prize_name: awardsConfig[i].prize_name, prize_image: awardsConfig[i].prize_image, });
        // num = num + 0.02
			}
			this.showPrizeList = awardsList
      console.log('his.showPrizeList',this.showPrizeList)
		},
		methods: {
			// 节流，防止多次点击，目前设定的是2秒中内只触发一次，按需修改
			throttle(func, wait = 500, immediate = true) {
				if (immediate) {
					if (!flag) {
						flag = true;
						typeof func === 'function' && func();
						timer = setTimeout(() => {
							flag = false;
						}, wait);
					}
				} else {
					if (!flag) {
						flag = true
						timer = setTimeout(() => {
							flag = false
							typeof func === 'function' && func();
						}, wait);
					}
				}
			},
			// 点击抽奖按钮
			getLottery(){
				this.$emit('start')
			},
			// 开始旋转
			init(index){
				let _this = this
				if(this.is_lottery){
					console.log('正在抽奖中，请等待本轮抽奖结束再进行下次抽奖')
					return
				}
				this.is_lottery = true
				var awardIndex = 0;
				if(index>=0){
					awardIndex = index
				}else{
					awardIndex = Math.ceil(Math.random()*this.showPrizeList.length-1)
				}
				this.runDegs = this.runDegs || 0
				this.runDegs = this.runDegs + (360 - this.runDegs % 360) + (360 * this.showPrizeList.length - awardIndex * (360 / this.showPrizeList.length))
				var animationRun = uni.createAnimation({
					duration: _this.runTimes,
					timingFunction: 'ease'
				})
				animationRun.rotate(this.runDegs).step()
				this.animationData = animationRun.export()
				setTimeout(() => {
					this.is_lottery = false
					this.$emit('end')
				},_this.runTimes)
			}
		}
	}
</script>
<style>
	.pt-lottery-times {
		text-align: center;
		padding: 40rpx 0;
	}
	.pt-lottery-box {
		position: relative;
	  width: 650rpx;
	  height: 650rpx;
	  margin: 0 auto;
	  border-radius: 50%;
	  overflow: hidden;
	}
	.pt-lottery-bg {
	  position: absolute;
	  width: 650rpx;
	  height: 650rpx;
	  left: 0;
	  top: 0;
	  z-index: 1;
	  background-clip: padding-box;
	}
	.pt-lottery-bg-img {
	  width: 650rpx;
	  height: 650rpx;
	}
	.prize-list {
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 650rpx;
	  height: 650rpx;
	  z-index: 9999;
	}
	.prize-item {
	  position: absolute;
	  left: 0;
	  top: 0;
	  width: 100%;
	  height: 100%;
	  font-weight: 600;
	  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
	  overflow: hidden;
	}
  .Image{
    width: 40rpx!important;
    height: 40rpx!important;
  }
	.prize-item-info{
	  position: relative;
	  display: block;
	  margin: 0 auto;
	  text-align: center;
	  transform-origin: 50% 325rpx;
	  font-size: 24rpx;
	  padding-top: 95rpx;
	  color: #947600;
	}
	.prize-icon image{
		width: 80rpx;
		height: 80rpx;
		margin-top: 10rpx;
	}
	.pt-lottery-btn {
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	  z-index: 10;
	  width: 212rpx;
	  height: 212rpx;
	}
	.pt-lottery-btn image {
	  width: 212rpx;
	  height: 212rpx;
	}
</style>
