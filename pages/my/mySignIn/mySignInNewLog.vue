<template>
	<view class="page" :class="getThemeClass">
    <view class="SignInLog WidthGlobal1 MarginAuto">
      <view class="Unit Width100 PaddingT_32rpx PaddingB_32rpx BorderR_20rpx MarginT_32rpx" v-for="(item,index) in signInLog">
        <view class="WidthGlobal1 MarginAuto">
          <view class="FloatL">
            <text class="Block FontS_36rpx Color_FFFFFF">签到获得 商城 购物{{ item.type == 1 ? '积分':'红包' }}</text>
            <text class="Block FontS_28rpx Color_FFFFFF MarginT_8rpx">{{ item.created_at }}</text>
          </view>
          <view class="FloatR MarginT_20rpx">
            <text class="Block FloatL FontS_32rpx  FontBold MarginT_10rpx" :class="item.type == 1 ? 'Color_FFC393':'Color_7AE75B'">+{{ item.type == 1 ? item.points:item.red_packet }}</text>
            <image v-if="item.type == 1" :src="$.imgSrc + '/images/jinbi2.png'" mode="aspectFit" class="FloatL Icon MarginL_12rpx"></image>
            <image v-if="item.type == 2" :src="$.imgSrc + '/images/hongbao2.png'" mode="aspectFit" class="FloatL Icon MarginL_12rpx"></image>
            <view class="ClearB"></view>
          </view>
          <view class="ClearB"></view>
        </view>
      </view>
      <view class="Width100 TextCenter PaddingT_40rpx PaddingB_40rpx MarginT_40rpx" v-if="signInLog.length == 0">
        <text class="Block FontS_30rpx Color_FFFFFF">暂无记录</text>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        signInLog:[],
        signInNewLog:[],
        listQuery:{
          page:1
        }
			};
		},
		onLoad() {
      this.signInLog = []
      this.listQuery.page = 1
      this.getNewSignInLog()
		},
		onShow() {
		},
		methods: {
			goBark() {
				uni.navigateBack();
			},
      getNewSignInLog() {
        this.$u.api.getNewSignInLog(this.listQuery).then(res => {
          if (res.code == 200) {
            this.signInNewLog = []
            for(let a = 0; a < res.data.signs.data.length; a++){
              if(res.data.signs.data[a].points){
                let datas = {...{type:1},...res.data.signs.data[a]}
                this.signInNewLog.push(JSON.parse(JSON.stringify(datas)))
              }
              if(res.data.signs.data[a].red_packet > 0){
                let datas = {...{type:2},...res.data.signs.data[a]}
                this.signInNewLog.push(JSON.parse(JSON.stringify(datas)))
              }
            }
            console.log('this.signInNewLog',this.signInNewLog)
            this.signInLog.push(...this.signInNewLog)
            if(res.data.signs.last_page <= res.data.signs.current_page){
              this.isMore = false
            }else {
              this.isMore = true
            }
          }
        }).catch(err => {
        })
      },
		},
    onReachBottom() {
      if(this.isMore){
        this.listQuery ++
        this.getNewSignInLog()
      }
    },
	}
</script>

<style lang="scss" scoped>
.SignInLog{
  .Unit{
    border: 2rpx solid rgba(255,255,255,0.7);
    .Icon{
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>
