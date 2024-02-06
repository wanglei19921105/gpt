<template>
	<view class="lucky">
		<view class="gap-50"></view>
		<image src="../../../static/images/draw-title.png" class="lucky-title"></image>
		<view class="lucky-card u-font-30 text-white">{{consumeGold}}积分抽奖一次，祝你好运</view>
		<view class="lucky-box">
			<pt-lottery ref="pt-lottery" lotteryBg="/static/components/round.png" lotteryBtn="/static/components/Start.png"
			:prizeList="prizeList" @start="start" @end="end" v-if="prizeList.length>0"></pt-lottery>
		</view>
		<view class="flex justify-center align-center">
			<image src="../../../static/images/draw-left.png" class="lucky-icon"></image>
			<view class="u-font-36 text-bold text-white u-m-l-24 u-m-r-24">活动规则</view>
			<image src="../../../static/images/draw-right.png" class="lucky-icon"></image>
		</view>
		<view class="lucky-cont text-white u-font-24">
			<view class="u-m-b-20" v-for="(item,index) in bonusRule" :key="index">{{item}}</view>
		</view>
		<view class="gap-100"></view>

		<uni-popup ref="popup" type="center">
			<view class="draw-pop flex flex-direction align-center">
				<image src="../../../static/images/draw-pop.png" class="draw-top"></image>
				<image :src="bonusLuckDetail.prize_image" class="draw-img"></image>
				<view class="draw-name u-m-t-30">{{bonusLuckDetail.prize_name}}</view>
				<view class="draw-btn text-bold u-m-t-40 more-btn" @click="closepop">我知道了</view>
			</view>
		</uni-popup>
    <view class="AlertBox Width100 Height100" v-if="isShowBox" @click="closeBox">
      <view class="PositionA Content BorderR_30rpx" @click.stop="">
        <view class="WidthGlobal1 MarginAuto TextCenter">
          <text class="Block FontS_36rpx FontBold Color_FFFFFF">活动未开启</text>
          <view class="Width100 TextCenter">
            <view class="InlineBlock">
              <view class="Btn TextCenter MarginAuto MarginT_40rpx BorderR_10rpx" @click="closeBox">
                <text class="Block FontS_30rpx FontBold Color_133127">关闭</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				prizeList: [],
				bonusRule:[],
				consumeGold:0,
				bonusLuckDetail:{},
				flag:true,
        isShowBox:false,
        isStart:false
			}
		},
		onLoad() {
			this.loadData()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:"/pages/my/lucky-draw/lucky-log"
			})
		},
		methods: {
      closeBox(){
        this.isShowBox = false
      },
      showBox(){
        this.isShowBox = true
      },
			loadData(){
				this.$u.api.bonus_index().then(res=>{
					this.bonusRule = res.data.bonusRule
					this.consumeGold = res.data.consumeGold
					let list = res.data.data
          // let list = [1]
          if(list.length != 6){
            this.isStart = false
            this.showBox()
          }else {
            this.isStart = true
          }
					let arr = []
					list.forEach(e=>{
						arr.push({
              prize_name: e.prize_name,
              prize_image: e.prize_image,
							id: e.id
						})
					})
					this.prizeList = arr
				})
			},
			start() {
        if(!this.isStart){
          this.showBox()
          return
        }
				if(!this.flag) return
				this.flag = false
				this.$u.api.bonus_start().then(res=>{
					this.bonusLuckDetail = res.data.res
					let id = res.data.res.prize_id
					for (let i = 0; i < this.prizeList.length; i++) {
						if(this.prizeList[i].id == id){
							this.$refs['pt-lottery'].init(i)
							break
						}
					}
				})
			},
			end() {
				this.$refs.popup.open()
				this.flag = true
			},
			closepop(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
.AlertBox{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(0,0,0,0.5);
  .Content{
    width: calc(100% - 200rpx);
    padding: 60rpx 0rpx;
    background: linear-gradient(270deg, #0C0C0F 0%, #282C37 100%);
    .Btn{
      width: 180rpx;
      height: 76rpx;
      line-height: 76rpx;
      background-color: #F5F5F5;
    }
    .InputBox{
      border-bottom: 2rpx solid #FFFFFF;
      padding-bottom: 20rpx;
      //width: calc(100% - 200rpx);
    }
  }
}
	.lucky{
		width: 100vw;
		min-height: calc(100vh - var(--window-top));
		background-image: url("../../../static/images/draw-bg.jpg");
		background-size: 100%;
		background-repeat: no-repeat;
		.lucky-title{
			width: 633rpx;
			height: 168rpx;
			margin: 0 58rpx;
		}
		.lucky-card{
			width: 410rpx;
			height: 72rpx;
			background-image: url('../../../static/images/draw-tag.png');
			background-size: 100% 100%;
			text-align: center;
			line-height: 72rpx;
			margin: 30rpx auto 0 auto;
			position: relative;
			z-index: 1;
		}
		.lucky-box{
			width: 750rpx;
			height: 857rpx;
			background-image: url('../../../static/images/draw-box.png');
			background-size: 100% 100%;
			padding-top: 60rpx;
			margin-bottom: 98rpx;
			position: relative;
			top: -30rpx;
		}
		.lucky-icon{
			width: 52rpx;
			height: 17rpx;
		}
		.lucky-cont{
			width: 670rpx;
			margin: 50rpx 40rpx 0 40rpx;
		}
	}
	.draw-pop{
		width: 600rpx;
		padding: 100rpx 0 66rpx 0;
		background: linear-gradient(180deg, #E3D8F5 0%, #EBE4F5 28%, #FFFFFF 100%);
		border-radius: 24rpx;
		position: relative;
		.draw-top{
			width: 378rpx;
			height: 106rpx;
			position: absolute;
			top: -40rpx;
			z-index: 5;
		}
		.draw-img{
			width: 150rpx;
			height: 150rpx;
		}
		.draw-name{
			color: #8438AA;
			font-size: 32rpx;
			font-weight: bold;
		}
		.draw-btn{
			width: 350rpx;
			height: 88rpx;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
			font-size: 36rpx;
			background: linear-gradient(167deg, #A679E9 0%, #C16AEC 100%);
		}
	}
</style>
