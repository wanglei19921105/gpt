<template>
	<view class="page" :class="getThemeClass">
		<unavbar :isback="false" :bg="'transparent'" class="my-nav-ber-a-box">
			<view class="Width100 TextC">
        <text class="FontS32rpx Block Color_FFFFFF FontBold">每日签到</text>
      </view>
			<u-icon class="MarginL_30rpx" name="arrow-left" color="#FFFFFF" size="40" @click="goBark"></u-icon>
		</unavbar>
		<view class="TopBoxNew Width100" :style="bgUrl1">
		</view>
    <view class="BottomBox Width100" :class="getThemeClass">
      <view class="WidthGlobal1 MarginAuto Height100 PositionR">
        <view class="HeadMain Width100">
          <view class="HeadBox BorderR_50 OverH FloatL">
            <image :src="userData.avatar ? userData.avatar : `/static/images/my/${getThemeName}/my_bg.png`" mode="aspectFill" class="Width100 Height100 BorderR_50"></image>
          </view>
          <view class="FloatR HeadRight">
            <view class="FloatL">
              <text class="Block FontS_36rpx Color_FFFFFF FontBold">{{ userData.nickname }}</text>
              <view class="MarginT_16rpx">
                <text class="Block Color_FFFFFF FontS_28rpx FloatL MarginT_10rpx">您已连续签到</text>
                <text class="Block FontS_48rpx FontBold FloatL Text1 Color_9EF797 MarginL_8rpx">{{ signInfo.user_signs_total }}</text>
                <text class="Block Color_FFFFFF FontS_28rpx FloatL MarginT_10rpx MarginL_8rpx">天</text>
                <view class="ClearB"></view>
              </view>
            </view>
            <view class="BtnBox FloatR TextC MarginT_20rpx" @click="signStatus == 1 ? '':signIn()">
              <text class="Block Color_FFFFFF FontS_32rpx">{{signStatus == 1 ? '已签到':'立即签到'}}</text>
            </view>
          </view>
          <view class="ClearB"></view>
        </view>
        <view class="NavBox MarginT_30rpx Width100">
          <view class="Left FloatL">
            <view class="Nav1 TextC OverH" :style="bgUrl2" @click="checkQDLog">
              <text class="Block Color_FFFFFF FontS_48rpx MarginT_40rpx">签到记录</text>
              <text class="Block Color_FFFFFF FontS_24rpx MarginT_10rpx">签到记录这里查看</text>
            </view>
          </view>
          <view class="Right FloatR">
            <view class="Nav2 OverH" :style="bgUrl3">
              <text class="Block Color_B77946 FontS_28rpx MarginT_28rpx MarginL_35rpx">累计签到红包</text>
              <view class="MarginL_35rpx">
                <text class="Block Color_5A3C1E FontS_40rpx FontBold FloatL">{{userData.sign_in_red_packet}}元</text>
                <view class="ClearB"></view>
              </view>
            </view>
            <view class="Nav2 OverH MarginT_30rpx" :style="bgUrl4">
              <text class="Block Color_64340B FontS_28rpx MarginT_24rpx MarginL_35rpx">累计签到积分</text>
              <view class="MarginL_35rpx">
                <text class="Block Color_5A3C1E FontS_40rpx FontBold FloatL">{{userData.sign_in_points}}分</text>
                <view class="ClearB"></view>
              </view>
            </view>
          </view>
          <view class="ClearB"></view>
        </view>
      </view>
      <view class="UnitBox BG_171717 WidthGlobal1 MarginAuto BorderR_20rpx MarginT_30rpx PaddingT_1rpx">
        <view class="TodayBox WidthGlobal5 MarginAuto MarginT_16rpx">
          <view class="Top Width100   PaddingT_1rpx" :style="bgUrl5">
            <text class="Block TextC FontS_96rpx Color_FFFFFF FontBold Font1 MarginT_32rpx">{{ signInfo.sign_total }}</text>
            <text class="Block TextC FontS_28rpx Color_FFFFFF MarginT_28rpx">今日签到会员</text>
          </view>
          <view class="BuyLog Width100 BorderR_20rpx BG_171717 PaddingT_16rpx PaddingB_48rpx MarginT_32rpx">
            <view class="BuyTitle TextCenter">
              <view class="InlineBlock">
                <view class="TopLine1 FloatL"></view>
                <text class="Block FontS_32rpx Color_FFFFFF FontBold FloatL MarginL_35rpx">签到动态</text>
                <view class="TopLine2 FloatL MarginL_35rpx"></view>
                <view class="ClearL"></view>
              </view>
            </view>
            <view class="DanMu Width100 OverF_Y_A">
              <view class="WidthGlobal1 MarginAuto MarginT_20rpx">
                <view class="ShowUnit" v-for="(item,index) in infoLB" :key="index" :class="index !== 0 ? 'MarginT_32rpx':''">
                  <view class="ImgBox BorderR_50 OverH FloatL">
                    <image :src="(item.user || {}).avatar" mode="aspectFill" class="Width100 Height100 BorderR_50"></image>
                  </view>
                  <view class="TextBox FloatR">
                    <text class="Block FloatL FontS_24rpx Color_FFFFFF MarginT_4rpx">{{ (item.user || {}).nickname }}</text>
                    <text class="Block FloatR Color_FFFFFF MarginT_4rpx FontS32rpx" >获得 <b style="color:red">{{item.red_packet}}元微信红包&nbsp;&nbsp;</b><b style="color: yellow;">{{item.points}}积分</b></text>
                    <view class="ClearL"></view>
                    <text class="Block FloatL FontS_24rpx Color_B4B4B6 MarginT_12rpx">{{ item.mobile }}</text>
                    <text class="Block FloatR FontS_24rpx Color_B4B4B6 MarginT_12rpx">{{ item.created_at }}签到成功</text>
                    <view class="ClearL"></view>
                  </view>
                  <view class="ClearL"></view>
                </view>
              </view>
            </view>
          </view>
<!--          <view class="DanMu Width100 MarginT_28rpx">-->
<!--            <l-barrage :data="infoLB" :trackHeight="50" :speed="10" :defer="0.5">-->
<!--              &lt;!&ndash; 自定义每条弹幕样式 content 为你传入的数据&ndash;&gt;-->
<!--              <template #default="{content}">-->
<!--                <view class="UnitDM">-->
<!--                  <view class="Head FloatL">-->
<!--                    <image :src="(content.user || {}).avatar" mode="aspectFill" class="Width100 Height100 BorderR_50"></image>-->
<!--                  </view>-->
<!--                  <view class="Text FloatL MarginL_6rpx">-->
<!--                    <view class="MarginT_4rpx">-->
<!--                      <text class="Block FontS_20rpx Color_FFFFFF FloatL">获得</text>-->
<!--                      <image :src="$.imgSrc + '/images/hongbao2.png'" mode="aspectFit" class="DMIcon FloatL MarginT_2rpx MarginL_2rpx"></image>-->
<!--                      <text class="Block FontS_20rpx Color_FFFFFF FloatL MarginL_2rpx">{{ content.red_packet }}元</text>-->
<!--                      <image :src="$.imgSrc + '/images/jinbi2.png'" mode="aspectFit" class="DMIcon FloatL MarginT_2rpx MarginL_6rpx"></image>-->
<!--                      <text class="Block FontS_20rpx Color_FFFFFF FloatL MarginL_6rpx">{{ content.points }}积分</text>-->
<!--                      <view class="ClearB"></view>-->
<!--                    </view>-->
<!--                    <view class="MarginT_4rpx">-->
<!--                      <text class="Block FontS_20rpx Color_FFFFFF FloatL">{{ (content.user || {}).nickname }} {{-->
<!--                          content.created_at-->
<!--                        }}签到成功</text>-->
<!--                      <view class="ClearB"></view>-->
<!--                    </view>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
<!--              </template>-->
<!--            </l-barrage>-->
<!--          </view>-->
        </view>
      </view>
      <view class="UnitBox BG_171717 WidthGlobal1 MarginAuto BorderR_20rpx MarginT_30rpx PaddingT_1rpx">
        <view class="ListBox Width100 MarginT_34rpx PaddingB_40rpx">
          <view class="Width100 TitleBox">
            <view class="WidthGlobal1 MarginAuto Flex Flex_C_S-B">
              <view class="ListUnit Width_15 TextLeft">
                <text class="Block FontS_28rpx Color_FFFFFF">排名</text>
              </view>
              <view class="ListUnit Width_40 TextLeft">
                <text class="Block FontS_28rpx Color_FFFFFF MarginL_8rpx">昵称</text>
              </view>
<!--              <view class="ListUnit Width_20 TextCenter">-->
<!--                <text class="Block FontS_28rpx Color_B2B2B2">连签</text>-->
<!--              </view>-->
              <view class="ListUnit Width_20 TextCenter">
                <text class="Block FontS_28rpx Color_FFFFFF">总赚积分</text>
              </view>
              <view class="ListUnit Width_20 TextRight">
                <text class="Block FontS_28rpx Color_FFFFFF">总赚红包</text>
              </view>
            </view>
          </view>
          <view class="Width100 MarginT_20rpx">
            <view class="Width100 TitleBox PaddingT_20rpx PaddingB_20rpx" v-for="(item,index) in info" :key="index" :class="(index+1) % 2 == 1 ? 'ListBg1':''">
              <view class="WidthGlobal1 MarginAuto Flex Flex_C_S-B">
                <view class="ListUnit Width_15">
                  <image v-if="index === 0" :src="$.imgSrc + '/images/rank1.png'" mode="aspectFit" class="RankIcon"></image>
                  <image v-else-if="index === 1" :src="$.imgSrc + '/images/rank2.png'" mode="aspectFit" class="RankIcon"></image>
                  <image v-else-if="index === 2" :src="$.imgSrc + '/images/rank3.png'" mode="aspectFit" class="RankIcon"></image>
                  <text v-else class="Block FontS_28rpx Color_FFFFFF FontBold MarginL_24rpx">{{ index + 1 }}</text>
                </view>
                <view class="ListUnit Width_40">
                  <image :src="item.avatar" mode="aspectFit" class="FloatL Avatar BorderR_50 MarginL_8rpx"></image>
                  <text class="Block AvatarName FloatL FontS_24rpx Color_FFFFFF MarginL_16rpx TextHidden MarginT_20rpx">
                    {{ item.nickname }}</text>
                  <view class="ClearB"></view>
                </view>
<!--                <view class="ListUnit Width_20 TextCenter">-->
<!--                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.total_signs }}天</text>-->
<!--                </view>-->
                <view class="ListUnit Width_20 TextCenter">
                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.sign_in_points }}</text> 
                </view>
                <view class="ListUnit Width_20 TextRight">
                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.sign_in_red_packet }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
		<u-modal class="my-modal" v-model="showSignIn" :content="`签到将获得 ${sign.red_packet}元红包和 ${sign.sign_num} 积分`"
			title="签到" :confirm-color="getMainColor" @confirm="signIn(1)" confirmText="签到" show-cancel-button
			asyncClose></u-modal>
		<u-modal class="my-modal" v-model="showSignInText" :content="alertText" title="提示" :confirm-color="getMainColor"
			@confirm="showSignInText = false" confirmText="确定" show-cancel-button asyncClose></u-modal>
		<!-- <view class="BottomContentBox Width100" v-if="rankData != null">
			<view class="WidthGlobal4 MarginAuto" v-if="rankData != null">
				<scroll-view class="rankheat_item" scroll-y>
					<view class="ranknum flex justify-between align-center">
						<view class="ranking-content-item-avatar Width_15">
							<template v-if="rankData.rank < 3" class=" ">
								<image :src="`/static/images/signIn/rank${rankData.rank}.png`"
									class="ranking-content-item-avatar-mark" mode=""></image>
							</template>
							<template v-else>
								<text class="rankindex">{{ rankData.rank }}</text>
							</template>
						</view>
						<view class="rank-item Width_40 flex justify-between align-center">
							<view class="flex align-center">
								<image :src="rankData.avatar" mode="aspectFill" class="rank-avatar"></image>
								<view class="size-24">{{rankData.nickname}}</view>
							</view>
						</view>
						<view class="rank-num Width_15">{{rankData.total_signs}}天</view>
						<view class="rank-num Width_15">{{rankData.sign_in_points}}</view>
						<view class="rank-num Width_15 TextR">{{parseFloat(rankData.sign_in_red_packet)}}</view>
					</view>
				</scroll-view>
			</view>
			<view class="Width100 TextC MarginT_40rpx" v-else>
				<text class="Block FontS_30rpx Color_FFFFFF">暂无上榜！</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	import LBarrage from "../../../components/l-barrage/l-barrage";
  export default {
    components: {LBarrage},
    data() {
			return {
				signPage: 1,
				rankPage: 1,
				sign: {
					sign_num: 0,
					red_packet: 0
				},
				signInfo: {
					is_signed: false,
					sign_total: 0,
					user_signs_total: 0
				},
				signStatus: 0,
				list: [],
				rankData: null,
				itemData: [],
				listStatus: 'loading',
				showSignIn: false,
				showSignInText: false,
				alertText: '',
				page: 1,
				teammore: true,
        times: null,
				users: [],
				infoLB: [],
				info: {},
				infoSelf: {},
				userData: {},
        listQuery: {
          page:1
        },
        isMore:true,
				$: this.$,
				bgUrl1: '',
				bgUrl2: '',
				bgUrl3: '',
				bgUrl4: '',
        bgUrl5: '',
        signInLog:[],
			};
		},
		onLoad() {
      clearInterval(this.times)
			this.getHomedata()
			this.getInfoLB()
			this.getInfo()
      this.signInLog = []
      this.listQuery.page = 1
		},
    onUnload(){
      clearInterval(this.times)
    },
		onShow() {
			this.bgUrl1 = "background-image:url('" + this.$.imgUrl +
				"/qiandao_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.bgUrl2 = "background-image:url('" + this.$.imgUrl +
				"/qiandao_log1.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
			this.bgUrl3 = "background-image:url('" + this.$.imgUrl +
				"/ljqdhb1.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
			this.bgUrl4 = "background-image:url('" + this.$.imgUrl +
				"/ljqdjf1.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
      this.bgUrl5 = "background-image:url('" + this.$.imgUrl +
          "/qiandao_bg2.png');background-repeat: no-repeat;background-position: center center;background-size:cover;"
		},
		methods: {
      // 查看签到页面
      checkQDLog(){
        return uni.navigateTo({
          url: '/pages/my/mySignIn/mySignInNewLog'
        })
      },
			goBark() {
				uni.navigateBack();
			},
			getHomedata() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.userData = res.data.user;
						this.signStatus = res.data.sign.status;
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
			async signIn(o) {
				let data = await this.getNum()
				if (data.code == 400) {
					this.showSignInText = true
					this.alertText = data.message
					return
				} else {
					this.sign = data.data
				}
				if (!(this.userData && this.userData.phone)) {
					return uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				}
				if (o) {
					this.$u.api.signUp().then(res => {
						if (res.code == 200) {
							uni.showToast({
								icon: 'success',
								title: '签到成功'
							})
							this.showSignIn = false
							this.signStatus = 1
							this.getHomedata()
							this.getInfoLB()
							this.getInfo()
						}
					})
				} else {
					this.showSignIn = true
				}
			},
			getInfoLB() {
				this.$u.api.my_sign_in({
					page: this.signPage
				}).then(res => {
					if (res.code == 200) {
						const data = res.data || {}
						if (data && data.faker_signs && data.faker_signs.data) {
							this.infoLB = data.faker_signs.data
						}
					}
				}).catch(err => {

				})
			},
			getInfo() {
				this.$u.api.my_sign_in_info({
					page: this.rankPage
				}).then(res => {
					if (res.code == 200) {
						const data = res.data || {}
						this.signInfo = {
							is_signed: data.is_signed,
							sign_total: data.sign_total,
							user_signs_total: data.user_signs_total
						}
						if (data && data.ranking_list && data.ranking_list.data) {
							this.info = data.ranking_list.data
						}
						// if (this.info.ranking_list.length > 0) {
						// 	let user = JSON.parse(this.$.getData('usr'))
							
						// 	for (let a = 0; a < this.info.ranking_list.length; a++) {
						// 		if (user.id == this.info.ranking_list[a].id) {
						// 			this.rankData = this.info.ranking_list[a]
						// 			this.rankData.rank = ''
						// 			this.rankData.rank = a + 1
						// 			break;
						// 		}
						// 	}
						// }
					}
				}).catch(err => {

				})
			},
			getNum() {
				return new Promise(resolve => {
					this.$u.api.my_sign_in_info_num({}).then(res => {
						resolve(res)
					}).catch(err => {

					})
				})
			},
			loadData() {
				this.$u.api.my_team().then(res => {
					this.list = res.data.data
					console.log(this.list)
				}).catch(err => {})
			},
			Leaderboard() {
				this.$u.api.mechi_rank({
					// type:this.page
				}).then(res => {
					if (res.code == 200) {
						this.itemData = res.data.rankings
						this.users = res.data.users
						// this.listStatus = 'nomore'
					}
				})
			},
			activityRule() {
				uni.navigateTo({
					url: '/pages/my/myTeam/rankRule'
				});
			},
			rankUpdate() {
				if (this.teammore) {
					this.listStatus = 'loading'
					this.page += 1
				} else {
					return
				}
				this.$u.api.rank({
					type: this.page
				}).then(res => {
					if (res.code == 200) {
						if (res.data.ranking_list != 0) {
							this.itemData = [...this.itemData, ...res.data.ranking_list]
						} else {
							this.teammore = false
							this.listStatus = 'nomore'
						}
					}
				})
			},
		},
		pageNext() {
			console.log('jiazai');
		}
	}
</script>

<style lang="scss" scoped>
.ListBg1{
  background: linear-gradient(90deg, #282D37 0%, rgba(3,3,3,0) 100%);
}
.Width_10{
  width: 10%;
  min-width: 10%;
}
.Width_30{
  width: 30%;
  min-width: 30%;
}
.Width_25{
  width: 25%;
  min-width: 25%;
}
.Width_40{
  width: 40%;
  min-width: 40%;
}
.Width_15{
  width: 15%;
  min-width: 15%;
}
.Width_20{
  width: 20%;
  min-width: 20%;
}
	.BottomContentBox {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		height: 202rpx;
		background-color: #0C0D0F;
		border-top: 2rpx solid #FFFFFF;
	}

	.Text1 {
		text-shadow: 0 0 10px #9EF797;
	}

	.TopBoxNew {
		height: 684rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}

	.BottomBox {
    .NavBox{
      .Left,.Right{
        width: 328rpx;
      }
      .Nav1{
        width: 328rpx;
        height: 296rpx;
      }
      .Nav2{
        width: 328rpx;
        height: 132rpx;
      }
    }
    .HeadMain{
      padding-top: var(--status-bar-height);
      margin-top: 120rpx;
      .BtnBox{
        width: 208rpx;
        height: 80rpx;
        background: linear-gradient(90deg, #3FE0AA 0%, #02DAC3 100%);
        border-radius: 38rpx;
        text{
          line-height: 80rpx;
        }
      }
    }
    .HeadBox{
      width: 120rpx;
      height: 120rpx;
      background: linear-gradient(180deg, rgba(52, 86, 254, 1), rgba(95, 197, 255, 1));
      padding: 2rpx;
      border-radius: 50%;
    }
    .HeadRight{
      width: calc(100% - 132rpx);
    }
    padding-bottom: 300rpx;
		position: absolute;
		left: 0;
		top: 0rpx;
		z-index: 999;
    .UnitBox{
      //border: 2rpx solid #B4B4B6;
      .ListBox{
        .RankIcon{
          width: 64rpx;
          height: 64rpx;
        }
        .Avatar{
          width: 80rpx;
          height: 80rpx;
        }
        .AvatarName{
          width: calc(100% - 106rpx);
        }

      }
    }
    .UnitDM{
      //float: left;
      width: 400rpx;
      height: 72rpx;
      padding-right: 12rpx;
      border-radius: 100rpx;
      background: linear-gradient(90deg, #65F1FF 0%, rgba(101,241,255,0) 100%);
      .Head{
        width: 72rpx;
        height: 72rpx;
      }
      .DMIcon{
        width: 24rpx;
        height: 24rpx;
      }
    }
    .ShowUnit{
      .ImgBox{
        width: 80rpx;
        height: 80rpx;
      }
      .TextBox{
        width: calc(100% - 96rpx);
      }
    }
    .TodayBox{
      .BuyLog{
        .TopLine1{
          width: 190rpx;
          height: 2rpx;
          background: linear-gradient(to right, rgba(#9f9f9f,1),rgba(#9f9f9f,1), rgba(#9f9f9f,0));
          margin-top: 24rpx;
        }
        .TopLine2{
          width: 190rpx;
          height: 2rpx;
          background: linear-gradient(to right, rgba(#9f9f9f,1),rgba(#9f9f9f,1), rgba(#9f9f9f,0));
          margin-top: 24rpx;
        }
      }
      .Top{
        width: calc(100% - 32rpx);
        height: 230rpx;
        margin: 0 auto;
      }
    }
    .DanMu{
      height: 320rpx;
    }

		.UserInfo {
			.UserImg {
				width: 40px;
				height: 40px;
				background: linear-gradient(135deg, #3456FE, #5FC5FF);

				.ImgBox {
					width: 38px;
					height: 38px;
					margin: 1px;
				}
			}

			height: 254rpx;

			.TotalData {
				.BtnBox {
					width: 152rpx;
					height: 60rpx;

					text {
						text-align: center;
						line-height: 60rpx;
					}
				}

				.Text1 {
					text-shadow: 0 0 10px #FFC393;
				}
			}

			.LaBa {
				image {
					width: 40rpx;
					height: 40rpx;
				}

				.Swiper {
					margin-top: 2rpx;
					margin-left: 10rpx;
					width: calc(100% - 100rpx);
					height: 40rpx;
				}
			}
		}
	}

	.Width_100 {
		width: 100%;
	}

	.Height_100 {
		height: 100%;
	}

	.MarginT_16rpx {
		margin-top: 16rpx;
	}

	.FontS_60rpx {
		font-size: 60rpx;
	}

	.TextC {
		text-align: center;
	}

	.LetterS_6rpx {
		letter-spacing: 6rpx
	}

	.TextR {
		text-align: right;
	}

	.MsgBox {
		padding: 30rpx 44rpx;

		.Sub {
			border-radius: 30rpx;

			.Swiper {
				height: 40rpx;
			}

			image {
				width: 50rpx;
			}

			.Text {
				width: calc(100% - 80rpx);
				margin-left: 20rpx;
			}
		}
	}

	.FontS_30rpx {
		font-size: 30rpx;
	}

	.FontS_22rpx {
		font-size: 22rpx;
	}

	.Color_FF0000 {
		color: #FF0000;
	}

	.Color_FFFFFF {
		color: #FFFFFF;
	}

	.Color_D4CFA7 {
		color: #d4cfa7;
	}

	.Block {
		display: block;
	}

	.BlockI {
		display: inline-block;
	}

	.None {
		display: none;
	}

	.TopBox {
		padding: 30rpx 44rpx;

		.Title {
			margin-left: 20rpx;
			margin-top: 40rpx;

			.Name {
				font-size: 26rpx;
			}

			text {
				line-height: 50rpx;
			}
		}

		.Left {
			.ImgBox {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.Right {
			margin-top: 10rpx;

			.TagBox {
				padding: 0rpx 16rpx;
				border: 2rpx solid rgba(255, 255, 255, 0.2);
				height: 50rpx;
				border-radius: 50rpx;
				margin-top: 8rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-top: 10rpx;
					margin-right: 6rpx;
				}

				text {
					line-height: 50rpx;
				}
			}
		}
	}

	.Btn {
		margin-right: 30rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		width: 120rpx;
		height: 60rpx;
		border-radius: 10rpx;
		background-color: #1E1E1E;
	}

	.FloatL {
		float: left;
	}

	.FloatR {
		float: right;
	}

	.ClearB {
		clear: both;
	}

	/*英文换行*/
	.Warp_E {
		word-break: break-all;
	}

	/*文字超出省略号-单行*/
	.TextHidden {
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
	}

	.teamTitle {
		padding: 30rpx 44rpx;
		margin: 28rpx;
		border-radius: 20rpx;
	}

	.rank-rule {
		padding: 30rpx;
	}

	.tishi {
		font-size: 22rpx;
		padding: 30rpx;
		color: #FFFFFF;
	}

	.rankheat-title {
		display: block;
		width: 100%;
		height: 37.5rpx;
		margin: 50rpx auto;
	}

	.rankheat_header {
		width: 694rpx;
		height: 88rpx;
		padding: 0 30rpx;
		//background: #1E1E1E;
		margin: 0 auto;
		border-radius: 20rpx 20rpx 0 0;

		.rankheat_header_item {
			color: #B2B2B2;
			font-size: 22rpx;
		}

		.rankheat_header_item1 {
			width: 30%;
		}
	}

	.rankheat-myRank {
		width: 694rpx;
		height: 88rpx;
		color: #8BF9AB;
		font-size: 24rpx;
		padding: 0 30rpx;
		background: #232925;
		margin: 0 auto;

		.myRank_item {
			height: 88rpx;

			.myRank_item_avatar {
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

	.Height_96rpx {
		height: 96rpx;
	}

	.LH_96rpx {
		line-height: 96rpx;
	}

	.rankheat_item {
		width: 694rpx;
		//height: 801rpx;
		border-radius: 0 0 20rpx 20rpx;
		//background: #1E1E1E;
		margin: 0 auto;

		.ranknum {
			width: 100%;
			height: 88rpx;
			padding-right: 35rpx;

			.ranking-content-item-avatar {
				width: 100rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;

				.ranking-content-item-avatar-mark {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.rankindex {
				font-size: 24rpx;
				color: #E1E1E1;
			}

			.rank-item {
				height: 88rpx;

				.rank-avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 20rpx;
					margin-right: 2rpx;
				}
			}

			.rank-num {
				font-size: 22rpx;
			}
		}
	}

	.Width_15 {
		width: 15%;
	}

	.Width_40 {
		width: 40%;
	}
</style>
