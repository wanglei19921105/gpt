<template>
	<view class="page">
    <unavbar :isback="false" :bg="'transparent'" class="my-nav-ber-a-box">
      <view class="Width100">
      </view>
      <u-icon class="MarginL_30rpx" name="arrow-left" color="#FFFFFF" size="40" @click="goBark"></u-icon>
    </unavbar>
		<image src="/static/images/ranking/yqfx_bg.png" class="page-bg" mode="widthFix"></image>

<!--    内容开始-->
    <view class="WidthGlobal4 MarginAuto ContentBox">
      <view class="Box Width100 BorderR_20rpx OverH BG_000000">
        <view class="TitleBox Width100 Btn_BG1">
          <view class="WidthGlobal6 MarginAuto PaddingT_1rpx">
            <text class="Block FontS_32rpx FontBold FloatL MarginT_20rpx">我的团队</text>
            <text class="Block FontS_64rpx FontBold FloatR Font2 Text1 MarginT_18rpx">My Team</text>
            <view class="ClearB"></view>
          </view>
        </view>
        <view class="Content WidthGlobal1 MarginAuto">
          <view class="Width100 MarginT_32rpx">
            <view class="UserImg OverH FloatL">
              <image :src="avatar" mode="aspectFill" class="Width100 Height100 BorderR_50"></image>
            </view>
            <text class="Block FontS_36rpx Color_FFFFFF FontBold FloatL MarginL_16rpx MarginT_30rpx">{{ name }}</text>
            <view class="ClearB"></view>
          </view>
          <view class="Width100 MarginT_46rpx">
            <view class="HeadBox FloatL PositionR">
              <view class="UnitHead PositionA BorderR_50 OverH" v-for="(item,index) in childList" :key="index" :style="'z-index:' + (index+1) + ';left:' + (index != 0 ? (index) * 44:0) + 'rpx;'">
                <image :src="(item.user || {}).avatar" mode="aspectFill" class="Width100 Height100 BorderR_50"></image>
              </view>
            </view>
            <view class="Check FloatR Btn_BG2 MarginT_6rpx" @click="checkChildList">
              <text class="Block FontS_24rpx Color_FFFFFF">查看下级</text>
            </view>
            <view class="ClearB"></view>
          </view>
          <view class="Width100 PaddingB_66rpx">
            <view class="ShowUnit Width100 MarginT_66rpx">
              <image :src="$.imgSrc + '/images/cgyqrs.png'" mode="aspectFit" class="FloatL"></image>
              <text class="Block FloatL FontS_28rpx FontBold Color_FFC393 MarginL_16rpx">成功邀请人数</text>
              <text class="Block FloatR FontS_28rpx FontBold Color_FFC393">{{topData.total_invitations}}人</text>
              <view class="ClearB"></view>
            </view>
            <view class="ShowUnit Width100 MarginT_30rpx">
              <image :src="$.imgSrc + '/images/hdhbjl.png'" mode="aspectFit" class="FloatL"></image>
              <text class="Block FloatL FontS_28rpx FontBold Color_FFC393 MarginL_16rpx">获得红包奖励</text>
              <text class="Block FloatR FontS_28rpx FontBold Color_FFC393">{{topData.total_red_packet}}元</text>
              <view class="ClearB"></view>
            </view>
            <view class="ShowUnit Width100 MarginT_30rpx">
              <image :src="$.imgSrc + '/images/hdjfjl.png'" mode="aspectFit" class="FloatL"></image>
              <text class="Block FloatL FontS_28rpx FontBold Color_FFC393 MarginL_16rpx">获得积分奖励</text>
              <text class="Block FloatR FontS_28rpx FontBold Color_FFC393">{{topData.total_points}}分</text>
              <view class="ClearB"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="Box Width100 BorderR_20rpx OverH BG_000000 MarginT_34rpx">
        <view class="TitleBox Width100 Btn_BG1">
          <view class="WidthGlobal6 MarginAuto PaddingT_1rpx">
            <text class="Block FontS_32rpx FontBold FloatL MarginT_20rpx">邀请链接</text>
            <text class="Block FontS_64rpx FontBold FloatR Font2 Text1 MarginT_18rpx">Invite link</text>
            <view class="ClearB"></view>
          </view>
        </view>
        <view class="Content WidthGlobal1 MarginAuto">
          <view class="Width100 MarginT_22rpx">
            <text class="Block FontS_32rpx Color_FFFFFF">邀请链接</text>
            <view class="Width100">
              <text class="Block Url MarginT_20rpx FontS_28rpx Color_B2B2B2 FloatL TextHidden">
                {{ QRcode }}</text>
              <view class="Check1 FloatR Btn_BG2 MarginT_6rpx" @click="copyValue(QRcode)">
                <text class="Block FontS_24rpx Color_FFFFFF">复制链接</text>
              </view>
              <view class="ClearB"></view>
              <view class="Line MarginT_20rpx"></view>
            </view>
            <view class="Width100 MarginT_18rpx">
              <image :src="$.imgSrc + '/images/djan.png'" mode="widthFix" class="Width100"></image>
            </view>
            <view class="Width100 MarginT_10rpx PaddingB_44rpx">
              <view class="InviteBtn MarginAuto TextCenter" @click="make">
                <text class="Block Color_FFFFFF FontS_28rpx">长按保存海报邀请好友</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="Box Width100 BorderR_20rpx OverH BG_000000 MarginT_34rpx">
        <view class="TitleBox Width100 Btn_BG1">
          <view class="WidthGlobal6 MarginAuto PaddingT_1rpx">
            <text class="Block FontS_32rpx FontBold FloatL MarginT_20rpx">邀请排行榜</text>
            <text class="Block FontS_64rpx FontBold FloatR Font2 Text1 MarginT_18rpx">Invitation list</text>
            <view class="ClearB"></view>
          </view>
        </view>
        <view class="Content Width100">
          <view class="ListBox Width100 MarginT_34rpx">
            <view class="Width100 TitleBox">
              <view class="WidthGlobal1 MarginAuto Flex Flex_C_S-B">
                <view class="Unit Width_10 TextLeft">
                  <text class="Block FontS_28rpx Color_B2B2B2">排名</text>
                </view>
                <view class="Unit Width_30 TextLeft">
                  <text class="Block FontS_28rpx Color_B2B2B2 MarginL_8rpx">昵称</text>
                </view>
                <view class="Unit Width_20 TextCenter">
                  <text class="Block FontS_28rpx Color_B2B2B2">赚红包</text>
                </view>
                <view class="Unit Width_20 TextCenter">
                  <text class="Block FontS_28rpx Color_B2B2B2">赚积分</text>
                </view>
                <view class="Unit Width_15 TextRight">
                  <text class="Block FontS_28rpx Color_B2B2B2">邀请人数</text>
                </view>
              </view>
            </view>
            <view class="Width100 TitleBox" v-for="(item,index) in list" :key="index" :class="(index+1) % 2 == 1 ? 'ListBg1':''">
              <view class="WidthGlobal1 MarginAuto Flex Flex_C_S-B">
                <view class="Unit Width_10">
                  <image v-if="index === 0" :src="$.imgSrc + '/images/rank1.png'" mode="aspectFit" class="RankIcon MarginL_6rpx"></image>
                  <image v-else-if="index === 1" :src="$.imgSrc + '/images/rank2.png'" mode="aspectFit" class="RankIcon MarginL_6rpx"></image>
                  <image v-else-if="index === 2" :src="$.imgSrc + '/images/rank3.png'" mode="aspectFit" class="RankIcon MarginL_6rpx"></image>
                  <text v-else class="Block FontS_28rpx Color_FFFFFF FontBold MarginL_16rpx">{{ index + 1 }}</text>
                </view>
                <view class="Unit Width_30">
                  <image :src="(item.user || {}).avatar" mode="aspectFit" class="FloatL Avatar BorderR_50 MarginL_8rpx"></image>
                  <text class="Block AvatarName FloatL FontS_24rpx Color_FFFFFF MarginL_8rpx TextHidden MarginT_6rpx">
                    {{ (item.user || {}).nickname }}</text>
                  <view class="ClearB"></view>
                </view>
                <view class="Unit Width_20 TextCenter">
                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.red_packet }}</text>
                </view>
                <view class="Unit Width_20 TextCenter">
                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.points }}</text>
                </view>
                <view class="Unit Width_20 TextRight">
                  <text class="Block FontS_28rpx Color_FFC393 FontBold">{{ item.total_invitations }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

		<create-poster ref="poster" :avatar="avatar" :qrVal="QRcode" :inviteBg="backImg" :name="name" @finish="finish"></create-poster>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inviteData: {},
			contentText: '',
			QRcode: '',
			backImg: '',

			avatar: '',
			name: '',
			posturl: '',
			invite_code: '000000',
			list:[],
			userId: 0,
			inviteNum: 0,
			inviteMaxNum: 0,
			user_invitation_limit:0,
			teamList: [],
      childList: [],
      topData: {
        total_invitations:'',
        total_points:'',
        total_red_packet:'',
      },
			sys_invitation_unlimited:0
		};
	},
	onShow() {
		this.recommend();
		this.invite()
    this.getTopData()
	},
	methods: {
    copyValue(val){
      this.$.copy(val)
    },
    goBark() {
      uni.navigateBack();
    },
    checkChild(item){
      uni.navigateTo({
        url: '/pages/my/invite/inviteChildren?id=' + item.user_id
      })
    },
    checkChildList(){
      uni.navigateTo({
        url: '/pages/my/invite/inviteNewChild?id=' + this.userId
      })
    },
		buycode(){
			uni.navigateTo({
				url:"/pages/my/invite/buyCode"
			})
		},
		recommend() {
			this.$u.api
				.recommend()
				.then(res => {
					this.list = res.data.ranking_list
					this.avatar = res.data.avatar;
					this.name = res.data.nickname;
					this.inviteData = res.data;
					this.QRcode = res.data.url;
					this.backImg = res.data.share.pic;
					this.invite_code = res.data.invite_code
					console.log(this.QRcode);
					this.contentText = res.data.share.content;
					this.user_invitation_limit = res.data.user_invitation_limit
					this.sys_invitation_unlimited = res.data.sys_invitation_unlimited
					setTimeout(()=>{
						this.$refs.qrcode._makeCode();
					},300)

				})
				.catch(err => {});
		},
    getTopData(){
      this.$u.api
          .inviteTopData()
          .then(res => {
            if(res.code == 200){
              this.topData = res.data
            }
          })
          .catch(err => {});
    },
		invite(){
			this.$u.api
				.invite()
				.then(res => {
					this.teamList = res.data.list
					this.avatar = res.data.users.avatar;
					this.name = res.data.users.nickname;
					this.userId = res.data.users.id
          this.getChildList();
					this.invite_code = res.data.users.invite_code
					this.inviteNum = res.data.users.child_num
					this.inviteMaxNum = res.data.users.invitation_limit
				})
				.catch(err => {});
		},
    getChildList() {
      this.$u.api
          .recommendChildrenList({parent_id:this.userId})
          .then(res => {
            if(res.data.ranking_list.length < 9){
              this.childList = res.data.ranking_list
            }else {
              this.childList = res.data.ranking_list.slice(0, 9)
            }

          })
          .catch(err => {});
    },
		back() {
			uni.navigateBack({});
		},
		init(num){
			return num.substr(0,3) + "****" + num.substr(7)
		},
		finish(data) {
			this.posturl = data.url;
			if (data.type == 1) this.share();
		},
		make() {
			if (this.posturl) {
				uni.previewImage({
					urls: [this.posturl]
				});
			} else {
				this.$refs.poster.create();
			}
		},
		copy(data){
			uni.setClipboardData({
				data: data,
				success: function () {
					uni.showToast({
						title:"复制成功",
						icon:"none"
					})
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.Width_10{
  width: 10%;
  min-width: 10%;
}
.Width_30{
  width: 30%;
  min-width: 30%;
}
.Width_20{
  width: 20%;
  min-width: 20%;
}
.ContentBox{
  position: relative;
  z-index: 1;
  .Box{
    border: 2rpx solid #B4B4B6;
    .ListBg1{
      background: linear-gradient(90deg, rgba(0,0,64,0.69) 0%, rgba(0,0,56,0) 100%);
    }
    .RankIcon{
      width: 40rpx;
      height: 40rpx;
    }
    .ShowUnit{
      image{
        width: 64rpx;
        height: 64rpx;
      }
      text{
        line-height: 64rpx;
      }
    }
    .TitleBox{
      height: 92rpx;
      .Text1{
        letter-spacing: 1rpx;
      }
    }
    .Content{
      .ListBox{
        .Avatar{
          width: 48rpx;
          height: 48rpx;
        }
        .AvatarName{
          width: calc(100% - 66rpx);
        }

      }
      .Check{
        width: 144rpx;
        height: 54rpx;
        text-align: center;
        line-height: 54rpx;
        border-radius: 54rpx;
      }
      .Check1{
        width: 160rpx;
        height: 64rpx;
        text-align: center;
        line-height: 64rpx;
        border-radius: 64rpx;
      }
      .InviteBtn{
        border-radius: 38rpx;
        width: calc(100% - 152rpx);
        height: 76rpx;
        text{
          line-height: 76rpx;
        }
        background: linear-gradient(90deg, #EC7CFF 0%, #5FF6FF 100%);
      }
      .Line{
        background: linear-gradient(to right, rgba(#9f9f9f,1),rgba(#9f9f9f,1), rgba(#9f9f9f,0));
        width: calc(100% - 32rpx);
        height: 2rpx;
      }
      .Url{
        width: calc(100% - 170rpx);
      }
      .UserImg{
        width:112rpx;
        height: 112rpx;
        background: linear-gradient(180deg, rgba(52, 86, 254, 1), rgba(95, 197, 255, 1));
        padding: 2rpx;
        border-radius: 50%;
      }
      .HeadBox{
        .UnitHead{
          background: linear-gradient(180deg, rgba(52, 86, 254, 1), rgba(95, 197, 255, 1));
          padding: 2rpx;
          width: 64rpx;
          height: 64rpx;
          top: 0rpx;
        }
      }
    }
  }
}
.page {
	// background-color: #010101;
	background: linear-gradient(180deg, #03096B 0%, #000000 100%);
	position: relative;
	padding-top: 770rpx;
	padding-bottom: 50rpx;
}

.page-bg{
	position: absolute;
	top: 0rpx;
	left: 0rpx;
	width: 100vw;
	z-index: 0;
}

.content-li-content-but {
							width: 100%;
							background: #2121D9;
							border-radius: 60rpx;
							padding: 30rpx 40rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-top: 50rpx;
							&:active {
								opacity: .8;
							}
						}

.content{
	position: relative;
	z-index: 1;

	.card-box{
		width: 100%;
		padding: 30rpx;
		background-color: #fff;
		border: solid #1A218D 15rpx;
		border-radius: 25rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50rpx;

		.title-box{
			background: linear-gradient(180deg, #2121D9 0%, #1010A8 100%);
			border-radius: 30rpx;
			padding: 10rpx 30rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #FFFFFF;
			width: max-content;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.content-box{
			width: 100%;
			padding: 30rpx 0rpx;

			.content-user-box {
				padding: 0rpx 0rpx 50rpx 0rpx;
				border-bottom: solid 1rpx #E8E8E8;
			}

			.content-li-box{
				width: 100%;
				margin-top: 50rpx;
				&:first-child {
					margin-top: 0rpx;
				}

				.content-li-title-box{
					display: flex;
					align-items: center;
					.content-li-title-icon{
						width: 50rpx;
						height: 50rpx;
						background: #4747EF;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						font-weight: 500;
						color: #FFFFFF;
						margin-right: 20rpx;
					}
					.content-li-title-text {
						font-size: 34rpx;
						font-weight: 800;
						color: #000000;
					}
				}

				.content-li-content-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-left: 30rpx;
					background-color: #F8F8F8;
					border-radius: 50rpx;
					margin-top: 40rpx;
					.content-li-content-left {
						width: 100%;
					}
					.content-li-content-right {
						flex-shrink: 0;
						margin-left: 30rpx;
						.content-li-content-but {
							background: #2121D9;
							border-radius: 60rpx;
							padding: 30rpx 40rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							&:active {
								opacity: .8;
							}
						}
					}
				}

				.content-li-content-box-image{
					display: flex;
					align-items: center;
					flex-direction: column;
					margin-top: 50rpx;
					.content-li-content-left {
						width: 240rpx;
						height: 240rpx;
						.content-li-content-image {
							width: 240rpx;
							height: 240rpx;
						}
					}
					.content-li-content-right {
						width: 90%;
						.content-li-content-but {
							width: 100%;
							background: #2121D9;
							border-radius: 60rpx;
							padding: 30rpx 40rpx;
							font-size: 32rpx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							justify-content: center;
							&:active {
								opacity: .8;
							}
						}
					}
				}
			}

			.content-table-box{
				.content-table-tr{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx;
					border: solid 1rpx #D7D8DB;
					border-top: none;
					&:first-child {
						border-top: solid 1rpx #D7D8DB;
					}

					.content-table-th{
            font-weight: 700;
						font-size: 24rpx;
						color: #4B505A;
						// &.name {
						// 	width: 40%;
						// }
						// &.phone {
						// 	width: 40%;
						// }
						// &.num {
						// 	width: 20%;
						// }
					}
					.content-table-td{
						font-size: 24rpx;
						color: #000000;
						//display: flex;
						//align-items: center;
            .Icon{
              position: absolute;
              width: 20rpx;
              height: 20rpx;
              right: 36%;
              bottom: -24rpx;
            }
						.content-table-td-avatar {
							width: 50rpx;
							height: 50rpx;
							margin-right: 40rpx;
						}

						//&.name {
						//	width: 40%;
						//}
						//&.phone {
						//	width: 40%;
						//}
						//&.num {
						//	width: 20%;
						//	font-weight: 800;
						//}
					}
				}
			}

			.content-list-box{
				.content-list-item {
					background: #F6FAFE;
					padding: 20rpx 30rpx;
					border-radius: 25rpx;
					margin-top: 20rpx;
					.content-list-item-tag {
						font-size: 20rpx;
						color: #fff;
						padding: 5rpx 15rpx;
						background: linear-gradient(289deg, #094A94 11%, #AED1F9 88%);
						border-radius: 50rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}

}
.PR{
  position: relative;
}
.Block{
  display: block;
}
</style>
