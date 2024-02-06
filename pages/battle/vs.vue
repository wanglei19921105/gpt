<template>
	<view class="vs">
		<view class="flex justify-between align-center">
			<view class="vs-left flex justify-end align-center" :style="{'right':moveX}">
				<view class="flex align-center">
					<view class="text-right u-m-r-24">
						<view class="size-28 text-white text-bold line-1 vs-name">{{other_user.nickname}}</view>
						<view class="fb size-22 u-m-t-10">胜场{{other_user.victories_num}}</view>
					</view>
					<image :src="other_user.avatar" mode="aspectFill" class="vs-avatar"></image>
				</view>
			</view>
			<image src="../../static/images/battle/vs.png" class="vs-img"
				:style="{'transform': `scale(${scale})`,'visibility':visibility}"></image>
			<view class="vs-right flex align-center" :style="{'left':moveX}">
				<image :src="self.avatar" mode="aspectFill" class="vs-avatar"></image>
				<view class="u-m-l-24">
					<view class="size-28 text-white text-bold line-1 vs-name">{{self.nickname}}</view>
					<view class="fb size-22 u-m-t-10">胜场{{self.victories_num}}</view>
				</view>
			</view>
		</view>

		<view class="text-center text-white size-34 u-m-t-80">自动进入倒计时</view>
		<view class="text-center u-m-t-25">
			<u-count-down :timestamp="diff" bg-color="transparent" color="#FEB033" separator-color="#FEB033"
				font-size="50" separator-size="50"></u-count-down>
		</view>

		<view class="vs-bot">
			<view class="flex justify-between align-center">
				<view class="vs-tab flex flex-direction justify-center align-center"
					:class="current==index?'vs-unactive':'vs-active'" v-for="(item,index) in list" :key="index"
					@click="tabClick(index)">
					<image :src="item.img" class="vs-icon"></image>
					<view class="vs-txt">{{item.name}}</view>
				</view>
			</view>
			<view class="vs-botbtn1 move-btn" v-if="isFinish">已出招</view>
			<view class="vs-botbtn move-btn" @click="repeatClick(vs)" v-else>确认出招</view>
		</view>

		<battle-popup ref="battle" iconPath="/static/images/battle/vs-alert.png" title="对战提示"
			content="如若退出，当倒计时结束且还未出招，系统将随机出招，以保证顺利完成" confrimTxt="确定退出" @confrim="confrim">
		</battle-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '石头',
						value: 2,
						img: '/static/images/battle/stone.png'
					},
					{
						name: '剪刀',
						value: 1,
						img: '/static/images/battle/scissor.png'
					},
					{
						name: '布',
						value: 3,
						img: '/static/images/battle/cloth.png'
					},
				],
				current: 0,
				
				// 动画状态
				moveX: '328rpx',
				scale: 4,
				visibility: 'hidden',
				
				// 数据
				self:{},
				other_user:{},
				diff:0,
				status:0,
				// 自己是否出过招了
				isFinish: false,
				
				
				// 定时器
				timer:null,
				// 定时器间隔
				interval: 10,
			}
		},
		onLoad() {
			this.loadData()
		},
		onShow() {
			this.initTimer()
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		onHide() {
			clearInterval(this.timer)
			this.timer = null
		},
		onBackPress(e) {
			if(e.from==="backbutton"){
				this.$refs.battle.show()
				return true
			}
		},
		methods: {
			initTimer(){
				this.loadData()
				this.timer = setInterval(()=>{
					this.loadData()
				},10000)
			},
			loadData() {
				this.$u.api.battle_battle_index().then(res=>{
					this.self = res.data.self
					this.other_user = res.data.other_user
					this.diff = res.data.diff
					this.status = res.data.status
					
					// 对战还未结束
					if(res.data.status==0){
						if(res.data.self.now_battle_num==0){
							// 自己还未出招
							this.isFinish = false
						}else{
							// 自己出过招了，并循环显示出的什么招
							this.isFinish = true
							for(let i=0;i<this.list.length;i++){
								if(this.list[i].value===res.data.self.now_battle_num){
									this.current = i
									break;
								}
							}
						}
						// 动画效果
						setTimeout(() => {
							this.moveX = 0
						}, 300)
						setTimeout(() => {
							this.scale = 1
							this.visibility = 'visible'
						}, 600)
					}else{
						// 对战已经结束
						uni.redirectTo({
							url:'./result'
						})
					}
				})
			},
			tabClick(index) {
				if(this.isFinish) return
				this.current = index
			},
			vs() {
				this.$u.api.battle_move({
					move_num: this.list[this.current].value
				}).then(res=>{
					uni.showToast({
						title:"操作成功"
					})
					this.loadData()
				})
			},
			confrim(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.vs {
		width: 750rpx;
		height: calc(100vh - var(--window-top));
		background-image: url("../../static/images/battle/battle-bg.png");
		background-size: cover;
		padding-top: 150rpx;

		.vs-left {
			background-image: url("../../static/images/battle/vs-left.png");
			width: 328rpx;
			height: 140rpx;
			background-size: 100% 100%;
			padding-right: 54rpx;
			position: relative;
			transition: all 0.3s;
		}

		.vs-img {
			width: 177rpx;
			height: 158rpx;
			transition: all 0.3s;
		}

		.vs-right {
			background-image: url("../../static/images/battle/vs-right.png");
			width: 328rpx;
			height: 140rpx;
			background-size: 100% 100%;
			padding-left: 54rpx;
			position: relative;
			transition: all 0.3s;
		}

		.vs-avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: 1rpx solid #FFFFFF;
		}

		.vs-name {
			width: 130rpx;
		}

		.vs-bot {
			width: 670rpx;
			height: 457rpx;
			border-radius: 24rpx;
			background-color: #DFE4FF;
			padding: 88rpx 44rpx 0 44rpx;
			position: fixed;
			bottom: 40rpx;
			left: 40rpx;

			.vs-tab {
				width: 178rpx;
				height: 178rpx;
				border-radius: 16rpx;

				.vs-icon {
					width: 98rpx;
					height: 98rpx;
				}

				.vs-txt {
					font-weight: bold;
					-webkit-text-stroke: 1rpx #25185D;
					-webkit-text-fill-color: #FFFFFF;
				}
			}

			.vs-botbtn {
				width: 438rpx;
				height: 96rpx;
				background-image: url("../../static/images/battle/vs-btn.png");
				background-size: 100% 100%;
				text-align: center;
				line-height: 96rpx;
				font-size: 40rpx;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #BB6E10;
				-webkit-text-fill-color: #FFFFFF;
				margin: 47rpx auto 0 auto;
			}
			.vs-botbtn1{
				width: 438rpx;
				height: 96rpx;
				background-color: #f9f9f9;
				border-radius: 48rpx;
				background-size: 100% 100%;
				text-align: center;
				line-height: 96rpx;
				font-size: 40rpx;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #BB6E10;
				-webkit-text-fill-color: #FFFFFF;
				margin: 47rpx auto 0 auto;
			}
		}
	}

	.fb {
		color: #FBC42E;
	}

	.vs-active {
		background-color: #B8BCE8;
	}

	.vs-unactive {
		background-color: #F1E5C1;
		border: 1rpx solid #F2AF45;
	}
</style>
