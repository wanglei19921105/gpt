<template>
	<view class="page" :class="getThemeClass">
    <view class="TopBox">
      <view class="Left FloatL">
        <view class="ImgBox FloatL">
          <image :src="userData.avatar ? userData.avatar : `/static/images/my/${getThemeName}/my_bg.png`" class="" mode="aspectFill"></image>
        </view>
        <view class="FloatL Title">
          <text class="Color_FFFFFF Block Name">{{ userData.nickname }}</text>
          <text class="Color_FFFFFF Block FontS_22rpx FloatL">您已连续签到</text>
          <text class="Color_FF0000 Block FontS_22rpx FloatL">{{info.user_signs_total}}</text>
          <text class="Color_FFFFFF Block FontS_22rpx FloatL">天</text>
          <view class="ClearB"></view>
        </view>
        <view class="ClearB"></view>
      </view>
      <view class="Right FloatR">
        <view class="TagBox MarginT_16rpx">
          <image :src="`/static/images/jinbi.png`" class="FloatL" mode="aspectFill"></image>
          <text class="Block FontS_22rpx FloatL">赚{{userData.sign_in_points}}积分</text>
          <view class="ClearB"></view>
        </view>
        <view class="TagBox">
          <image :src="`/static/images/hongbao.png`" class="FloatL" mode="aspectFill"></image>
          <text class="Block FontS_22rpx FloatL">赚{{userData.sign_in_red_packet}}元红包</text>
          <view class="ClearB"></view>
        </view>
      </view>
      <view class="ClearB"></view>
    </view>
    <view class="MsgBox">
      <view class="Sub Width_100">
        <image :src="`/static/images/laba.png`" class="FloatL" mode="widthFix"></image>
        <view class="Text FloatL">
          <swiper class="Swiper" vertical circular :indicator-dots="false" :autoplay="true" :interval="3000"
                  :duration="1000">
            <swiper-item v-for="(item,index) in infoLB">
              <view class="Width_100 Height_100">
                <text class="Block FontS_22rpx Color_FFFFFF TextHidden">{{`${item.created_at} ${(item.user || {}).nickname}用户签到成功获得${item.points}积分${item.red_packet}元现金红包`}}</text>
              </view>
            </swiper-item>
          </swiper>
        </view>
        <view class="ClearB"></view>
      </view>
    </view>

    <view class="Btn Color_FFFFFF TextC FloatR" @click="info.is_signed ? '':signIn()">{{info.is_signed ? '已签到':'签到'}}</view>
    <view class="ClearB"></view>
    <!-- 签到人数 -->
    <view class="card-bg teamTitle TextC">
      <text class="Block Color_D4CFA7 FontS_30rpx LetterS_6rpx">今日签到人数</text>
      <text class="Block MarginT_16rpx Color_D4CFA7 FontS_60rpx LetterS_6rpx">{{ info.sign_total }}</text>
    </view>
		<!-- 排行榜 -->
		<view class="rankheat">
			<view class="rankheat_header flex justify-between align-center">
				<view class="rankheat_header_item Width_15">排行</view>
				<view class="rankheat_header_item rankheat_header_item1">昵称</view>
				<view class="rankheat_header_item Width_15">连续签到</view>
        <view class="rankheat_header_item Width_15">总赚积分</view>
        <view class="rankheat_header_item Width_15 TextR">总赚红包</view>
			</view>
<!--			<view class="rankheat-myRank flex justify-between align-center">-->
<!--				<view>{{users.ranking == null?'暂未上榜':users.ranking}}</view>-->
<!--				<view class="myRank_item flex justify-between align-center">-->
<!--					<image :src="users.avatar" mode="aspectFill" class="myRank_item_avatar"></image>-->
<!--					<view>{{users.user_account}}（我）</view>-->
<!--				</view>-->
<!--				<view>{{users.total_expenses}} USDT</view>-->
<!--			</view>-->
		</view>

		<scroll-view class="rankheat_item" scroll-y>
			<view class="ranknum flex justify-between align-center" v-for="(item,index) in info.ranking_list" :key="index">
				<view class="ranking-content-item-avatar Width_15">
					<template v-if="index < 3" class=" ">
						<image :src="`/static/images/index/light/top_${index + 1}.png`" class="ranking-content-item-avatar-mark" mode=""></image>
					</template>
					<template v-else>
						<text class="rankindex">{{ index + 1 }}</text>
					</template>
				</view>
				<view class="rank-item Width_40 flex justify-between align-center" >
					<view class="flex align-center">
						<image :src="item.avatar" mode="aspectFill" class="rank-avatar"></image>
						<view class="size-24">{{item.nickname}}</view>
					</view>
				</view>
        <view class="rank-num Width_15">{{item.total_signs}}天</view>
        <view class="rank-num Width_15">{{item.sign_in_points}}分</view>
        <view class="rank-num Width_15 TextR">{{item.sign_in_red_packet}}元</view>
			</view>
		</scroll-view>
    <u-modal class="my-modal" v-model="showSignIn" :content="`签到将获得 ${sign.sign_num} 积分和${sign.red_packet}元红包`" title="签到" :confirm-color="getMainColor" @confirm="signIn(1)" confirmText="签到" show-cancel-button asyncClose></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        sign: {
          sign_num: 0,
          red_packet: 0
        },
				list:[],
				itemData: [],
				listStatus: 'loading',
        showSignIn: false,
				page:1,
				teammore:true,
				users:[],
        infoLB: [],
        info: {},
        userData: {},
			};
		},
		onLoad() {
			this.getInfo()
      this.getNum()
      this.getInfoLB()
      this.getHomedata()
      this.getUserinfo()
		},
		methods:{
      getUserinfo() {
        this.$u.api.center_index().then(res => {
          if (res.code == 200) {
            this.userData = res.data.user
          }
          uni.stopPullDownRefresh()
        }).catch(err => {
          uni.stopPullDownRefresh()
        })
      },
      getHomedata() {
        this.$u.api.center_index().then(res => {
          if (res.code == 200) {
            this.sign = res.data.sign;
            this.user = res.data.user;
          }
          uni.stopPullDownRefresh()
        }).catch(err => {
          uni.stopPullDownRefresh()
        })
      },
      signIn(o) {
        this.getNum()
        if (!(this.user && this.user.phone)) {
          return uni.navigateTo({
            url: '/pages/my/bindPhone/bindPhone'
          })
        }
        if (o) {
          this.$u.api.signUp().then(res => {
            if (res.code == 200) {
              //this.getUserinfo()
              uni.showToast({
                icon: 'success',
                title: '签到成功'
              })
              this.showSignIn = false
            }
          })
        } else {
          this.showSignIn = true
        }
      },
      getInfoLB(){
        this.$u.api.my_sign_in({}).then(res => {
          if (res.code == 200) {
            if(typeof(res.data.faker_signs) != 'undefined'){
              this.infoLB = res.data.faker_signs
              console.log('this.infoLB',this.infoLB)
            }
          }
        }).catch(err => {

        })
      },
      getInfo(){
        this.$u.api.my_sign_in_info({}).then(res => {
          if (res.code == 200) {
            this.info = res.data
          }
        }).catch(err => {

        })
      },
      getNum(){
        this.$u.api.my_sign_in_info_num({}).then(res => {
          if (res.code == 200) {
            this.sign = res.data
          }
        }).catch(err => {

        })
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

<style lang="scss">
.Width_100{
  width: 100%;
}
.Height_100{
  height: 100%;
}
.MarginT_16rpx{
  margin-top: 16rpx;
}
.FontS_60rpx{
  font-size: 60rpx;
}
.TextC{
  text-align: center;
}
.LetterS_6rpx{
  letter-spacing:6rpx
}
.TextR{
  text-align: right;
}
.MsgBox{
  padding: 30rpx 44rpx;
  .Sub{
    border-radius: 30rpx;
    .Swiper{
      height: 40rpx;
    }
    image{
      width: 50rpx;
    }
    .Text{
      width: calc(100% - 80rpx);
      margin-left: 20rpx;
    }
  }
}
.FontS_30rpx{
  font-size: 30rpx;
}
.FontS_22rpx{
  font-size: 22rpx;
}
.Color_FF0000{
  color: #FF0000;
}
.Color_D4CFA7{
  color: #d4cfa7;
}
.Block{
  display: block;
}
.BlockI{
  display: inline-block;
}
.None{
  display: none;
}
.TopBox{
  padding: 30rpx 44rpx;
  .Title{
    margin-left: 20rpx;
    margin-top: 40rpx;
    .Name{
      font-size: 26rpx;
    }
    text{
      line-height: 50rpx;
    }
  }
  .Left{
    .ImgBox{
      width: 150rpx;
      height: 150rpx;
      border-radius:50% ;
      overflow: hidden;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .Right{
    margin-top: 10rpx;
    .TagBox{
      padding: 0rpx 16rpx;
      border: 2rpx solid rgba(255,255,255,0.2);
      height: 50rpx;
      border-radius: 50rpx;
      margin-top: 8rpx;
      image{
        width: 30rpx;
        height: 30rpx;
        margin-top: 10rpx;
        margin-right:6rpx;
      }
      text{
        line-height: 50rpx;
      }
    }
  }
}
.Btn{
  margin-right: 30rpx;
  line-height: 60rpx;
  font-size: 26rpx;
  width: 120rpx;
  height: 60rpx;
  border-radius: 10rpx;
  background-color: #1E1E1E;
}
.FloatL{
  float: left;
}
.FloatR{
  float: right;
}
.ClearB{
  clear: both;
}
/*英文换行*/
.Warp_E{
  word-break:break-all;
}
/*文字超出省略号-单行*/
.TextHidden{
  overflow: hidden;/*超出部分隐藏*/
  text-overflow:ellipsis;/* 超出部分显示省略号 */
  white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.teamTitle{
	padding: 30rpx 44rpx;
	margin: 28rpx;
	border-radius: 20rpx;
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
	//background: #1E1E1E;
	margin: 0 auto;
	border-radius: 20rpx 20rpx 0 0;
	.rankheat_header_item{
		color: #FFFFFF;
		font-size: 22rpx;
	}
  .rankheat_header_item1{
    width: 30%;
  }
}
.rankheat-myRank{
	width: 694rpx;
	height: 88rpx;
	color: #8BF9AB;
	font-size: 24rpx;
	padding: 0 30rpx;
	background: #232925;
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
  //background-color:#232323;
}
.rankheat_item{
	width: 694rpx;
	height: 801rpx;
	border-radius: 0 0 20rpx 20rpx;
	//background: #1E1E1E;
	margin: 0 auto;
	.ranknum{
		width: 100%;
		height: 88rpx;
		padding-right: 35rpx;
		.ranking-content-item-avatar{
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			.ranking-content-item-avatar-mark{
				width: 34rpx;
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
				margin-right: 2rpx;
			}
		}
		.rank-num{
			font-size: 22rpx;
		}
	}
}
.Width_15{
  width: 15%;
}
.Width_40{
  width: 40%;
}


</style>
