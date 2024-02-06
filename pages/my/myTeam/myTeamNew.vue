<template>
	<view class="page" :class="getThemeClass">
    <unavbar :isback="false" :bg="'transparent'" class="my-nav-ber-a-box">
      <view class="Width100"></view>
      <u-icon
          class="MarginL_30rpx"
          name="arrow-left"
          color="#FFFFFF"
          size="40"
          @click="goBark"
      ></u-icon>
    </unavbar>
    <view class="TopBoxNewTeam Width100" :style="bgUrl1">
      <view class="WidthGlobal1 MarginAuto Height100 PositionR">
      </view>
    </view>
    <view class="ListBox WidthGlobal1 MarginAuto">
      <!-- 排行榜 -->
      <view class="rankheat">
        <view class="rankheat_header flex justify-between align-center">
          <view class="rankheat_header_item">级别</view>
          <view class="rankheat_header_item">人数</view>
          <view class="rankheat_header_item">佣金</view>
        </view>
      </view>
      <view class="Line1 Width100" style="margin-top: -1px;"></view>
      <scroll-view class="rankheat_item " scroll-y>
        <!-- <view style="padding-top: 100rpx;" v-if="!itemData.length && listStatus !== 'loading'">
          <empty></empty>@scrolltolower="rankUpdate"
        </view> -->
        <view class="ranknum flex justify-between align-center" v-for="(item,index) in list" :key="index">
          <view class="rank-num PaddingL_32rpx">{{item.name}}</view>
          <view class="rank-num">{{item.num}}</view>
          <view class="rank-num Flex" @click="$u.route('/pages/my/myTeam/myTeamDetails',{type:Number(index)})">
            <text class="Block FloatL Color_FFCD77">
              {{item.sum}}
            </text>
            <uni-icons type="right" size="16" class="FloatL" color="#FFCD77"></uni-icons>
          </view>
        </view>
        <!-- <u-loadmore :status="listStatus" :margin-top="30" color="#999" v-if="itemData.length > 0 || listStatus === 'loading'" /> -->
      </scroll-view>
      <image :src="$.imgSrc + '/images/myTeam/img1.png'" mode="widthFix" class="Width100 Block MarginT_20rpx"></image>
      <!-- 排行榜 -->
      <view class="rankheat" style="margin-top: -5px">
<!--        <image class="rankheat-title" src="/static/images/index/light/rankheat-title.png" mode="aspectFill" />-->
        <view class="rankheat_header flex justify-between align-center">
          <view class="rankheat_header_item">排行</view>
          <view class="rankheat_header_item">账号</view>
          <view class="rankheat_header_item">日消费额</view>
        </view>
      </view>

      <scroll-view class="rankheat_item rankheat_item1" scroll-y>
        <!-- <view style="padding-top: 100rpx;" v-if="!itemData.length && listStatus !== 'loading'">
          <empty></empty>@scrolltolower="rankUpdate"
        </view> -->
        <view class="ranknum flex justify-between align-center" v-for="(item,index) in itemData" :key="index">
          <view class="ranking-content-item-avatar">
            <template v-if="index < 3">
              <image :src="`/static/images/signIn/rank${index + 1}.jpg`" class="ranking-content-item-avatar-mark" mode=""></image>
            </template>
            <template v-else>
              <text class="rankindex">{{ index + 1 }}</text>
            </template>
          </view>
          <view class="rank-item flex justify-between align-center" >
            <view class="flex align-center">
              <image :src="item.avatar" mode="aspectFill" class="rank-avatar"></image>
              <view class="size-24">{{item.user_account}}</view>
            </view>
          </view>
          <view class="rank-num Color_FFC393">{{item.total_expenses}} USDT</view>
        </view>
        <!-- <u-loadmore :status="listStatus" :margin-top="30" color="#999" v-if="itemData.length > 0 || listStatus === 'loading'" /> -->
      </scroll-view>
    </view>






		<view class="tishi">提示：佣金显示为下级所获得的佣金金额，本人获得的佣金金额请在钱包中查看。</view>
		<view class="flex rank-rule" @click="activityRule">
			<view style="color:#747982">注：查看</view>
			<view>《活动规则与奖励说明》</view>
		</view>
    <view class="BottomContentBox Width100">
      <view class="WidthGlobal4 MarginAuto">
        <view class="rankheat-myRank flex justify-between align-center">
          <view>{{users.ranking == null?'暂未上榜':users.ranking}}</view>
          <view class="myRank_item flex justify-between align-center">
            <image :src="users.avatar" mode="aspectFill" class="myRank_item_avatar"></image>
            <view>{{users.user_account}}（我）</view>
          </view>
          <view>{{users.total_expenses}} USDT</view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        $:this.$,
				list:[],
				itemData: [],
				listStatus: 'loading',
				page:1,
				teammore:true,
				users:[],
        bgUrl1:'',
			};
		},
    onShow(){
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/myTeam_bg1.jpg');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
    },
		onLoad() {
			this.loadData()
			this.Leaderboard()
		},
		methods:{
      goBark() {
        uni.navigateBack();
      },
			loadData(){
				this.$u.api.my_team().then(res => {
					this.list = res.data.data
					console.log(this.list)
				}).catch(err => {})
			},
			Leaderboard(){
				this.$u.api.mechi_rank({
					// type:this.page
				}).then(res=>{
					if (res.code == 200) {
						this.itemData = res.data.rankings
						this.users  = res.data.users
						// this.listStatus = 'nomore'
					}
				})
			},
			activityRule(){
				uni.navigateTo({
					 url: '/pages/my/myTeam/rankRule'
				});
			},
			rankUpdate(){
				if (this.teammore) {
					this.listStatus = 'loading'
					this.page += 1
				}else{
					return
				}
				this.$u.api.rank({
					type:this.page
				}).then(res=>{
					if (res.code == 200) {
						if (res.data.ranking_list!= 0) {
							this.itemData = [...this.itemData, ...res.data.ranking_list]
						}else{
							this.teammore = false
							this.listStatus = 'nomore'
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

.BottomContentBox{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 202rpx;
  background-color: #0C0D0F;
  border-top: 2rpx solid #FFFFFF;
}
.ListBox{
  .Unit{
    //box-shadow: inset 0 0 10px rgba(255,255,255,0.5);
    .teamTitle{

    }
  }
}
.TopBoxNewTeam{
  height: 562rpx;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.ListBox{
  position: absolute;
  left: 32rpx;
  top: 470rpx;
  z-index: 999;
}
.Line1{
  height: 2rpx;
  background: linear-gradient(to right, rgba(255,255,255,.1), rgba(255,255,255,.5),rgba(255,255,255,.1));
}
.teamTitle{
	padding: 30rpx 0rpx;
	//margin: 28rpx;
	border-radius: 20rpx;
}
.BorderR1{
  border-radius: 20rpx 20rpx 0 0;
}
.BorderR2{
  border-radius: 0rpx 0rpx 20rpx 20rpx;
}
.rank-rule{
	padding: 30rpx;
}
.tishi{
	font-size: 22rpx;
	padding: 30rpx;
	color: #FFFFFF;
}
.rankheat-title{
	display: block;
	width: 234.5rpx;
	height: 37.5rpx;
	margin: 50rpx auto;
}
.rankheat_header{
	width: 694rpx;
	height: 88rpx;
	padding: 0 30rpx;
	background: #15171C;
	margin: 0 auto;
	border-radius: 20rpx 20rpx 0 0;
	.rankheat_header_item{
		color: #A4A6AC;
		font-size: 24rpx;
	}
}
.rankheat-myRank{
	width: 694rpx;
	height: 88rpx;
	//color: #8BF9AB;
	font-size: 24rpx;
	padding: 0 30rpx;
	//background: #232925;
	margin: 0 auto;
	.myRank_item{
		height: 88rpx;
		.myRank_item_avatar{
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
		}
	}
}
.rankheat_item .ranknum:nth-child(even) {
  background-color:#1C2234;
}
.teamTitle .titleUnit:nth-child(even) {
  background-color:#1C2234;
}
.rankheat_item1{
  height: 800rpx;
  padding-bottom: 100rpx;
}
.rankheat_item{
	width: 694rpx;
	//height: 801rpx;
  padding-bottom: 220rpx;
	border-radius: 0 0 20rpx 20rpx;
	background: #15171C;
	margin: 0 auto;
	.ranknum{
		width: 100%;
		height: 66rpx;
		padding-right: 35rpx;
		.ranking-content-item-avatar{
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			.ranking-content-item-avatar-mark{
				width: 40rpx;
				height: 40rpx;
			}
		}
		.rankindex{
			font-size: 24rpx;
			color: #E1E1E1;
		}
		.rank-item{
			height: 88rpx;
			.rank-avatar{
				width: 40rpx;
				height: 40rpx;
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}
		.rank-num{
			font-size: 24rpx;
		}
	}
}


</style>
