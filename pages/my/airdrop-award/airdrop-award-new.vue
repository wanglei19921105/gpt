<template>
	<view class="page" :class="getThemeClass">
    <view class="TopBox Width100 PaddingT_1rpx PositionR">
      <view class="Width100 TextCenter BG1">
        <image class="Width100" :src="$.imgSrc + '/images/jfsc_img1.png'" mode="widthFix"></image>
      </view>
      <view class="WidthGlobal1 MarginAuto">
        <view class="JFBG WidthGlobal1 MarginAuto" :style="bgUrl1" >
          <view class="WidthGlobal1 MarginAuto Height100 Flex Flex_C_S-B">
            <text class="Block FontS_36rpx Color_FFFFFF">积分余额</text>
            <text class="Block FontS_50rpx Color_FFFFFF FontBold">{{ getairDrop }}</text>
          </view>
        </view>
        <view class="BtnMain Width100 MarginT_98rpx">
          <image :src="$.imgSrc + '/images/l_btn1.png'" mode="aspectFit" class="FloatL" @click="goUrl('/pages/my/airdrop-bill/airdrop-bill')"></image>
          <image :src="$.imgSrc + '/images/r_btn1.png'" mode="aspectFit" class="FloatR" @click="goUrl('/pages/my/airdrop-award/airdrop-award-new-info-change-log')"></image>
          <view class="ClearL"></view>
        </view>
        <view class="BuyLog Width100 BorderR_20rpx BG_171717 PaddingT_16rpx PaddingB_48rpx MarginT_32rpx">
          <view class="BuyTitle TextCenter">
            <view class="InlineBlock">
              <view class="TopLine1 FloatL"></view>
              <text class="Block FontS_32rpx Color_FFFFFF FontBold FloatL MarginL_35rpx">兑换动态</text>
              <view class="TopLine2 FloatL MarginL_35rpx"></view>
              <view class="ClearL"></view>
            </view>
          </view>
          <view class="WidthGlobal1 LogBox OverF_Y_A MarginAuto MarginT_20rpx">
            <view class="ShowUnit" v-for="(item,index) in logList" :key="index" :class="index !== 0 ? 'MarginT_32rpx':''">
              <view class="ImgBox BorderR_50 OverH FloatL">
                <image :src="item.avatar" mode="aspectFill" class="Width100 Height100 BorderR_50"></image>
              </view>
              <view class="TextBox FloatR">
                <text class="Block FloatL FontS_24rpx Color_FFFFFF MarginT_4rpx">{{ item.name }}</text>
				<text class="Block FloatR FontS_24rpx Color_FFFFFF MarginT_4rpx">兑换 {{item.project_name}}</text>
				
                <view class="ClearL"></view>
                <text class="Block FloatL FontS_24rpx Color_B4B4B6 MarginT_12rpx">{{ item.mobile }}</text>
                <!-- <text class="Block FloatR FontS_24rpx Color_B4B4B6">{{ item.project_name }}</text>
                <text class="Block FloatR FontS_24rpx Color_B4B4B6">{{ item.created_at }}</text> -->
				
				<!-- <text class="Block FloatR FontS_24rpx Color_B4B4B6 MarginT_12rpx">{{ item.project_name }}</text> -->
				<text class="Block FloatR FontS_24rpx Color_B4B4B6 MarginT_12rpx">{{ item.created_at }} 兑换成功</text>
                <view class="ClearL"></view>
              </view>
              <view class="ClearL"></view>
            </view>
          </view>
        </view>
      </view>
<!--      <view class="NavBox WidthGlobal1 PositionA MarginAuto Flex Flex_C_S-A" :style="bgUrl2">-->
<!--        <text class="Block Color_FFC393 FontS_26rpx">|</text>-->
<!--&lt;!&ndash;        <view class="Unit" @click="goUrl('/pages/my/address/address')" v-if="wallet&&wallet.is_address == 0">&ndash;&gt;-->
<!--&lt;!&ndash;          <image class=" FloatL" :src="$.imgSrc + '/images/jfsc_dhjl_icon.png'" mode="aspectFit"></image>&ndash;&gt;-->
<!--&lt;!&ndash;          <text class="Block FontS_32rpx FontBold Color_FFC393 FloatL MarginL_8rpx">收货地址</text>&ndash;&gt;-->
<!--&lt;!&ndash;          <view class="ClearB"></view>&ndash;&gt;-->
<!--&lt;!&ndash;        </view>&ndash;&gt;-->
<!--&lt;!&ndash;        v-else&ndash;&gt;-->
<!--        <view class="Unit" @click="goUrl('/pages/my/airdrop-award/airdrop-award-new-info-change-log')">-->
<!--          <image class=" FloatL" :src="$.imgSrc + '/images/jfsc_dhjl_icon.png'" mode="aspectFit"></image>-->
<!--          <text class="Block FontS_32rpx FontBold Color_FFC393 FloatL MarginL_8rpx">兑换记录</text>-->
<!--          <view class="ClearB"></view>-->
<!--        </view>-->
<!--      </view>-->
<!--      <view class="Width100 IconBox IconBox1">-->
<!--        <view class="Width100 TextCenter">-->
<!--          <image class="Icon InlineBlock" :src="$.imgSrc + '/images/jfsc_dhgz.png'" mode="widthFix"></image>-->
<!--        </view>-->
<!--        <view @click="openWin(`/pages/my/airdrop-award/regulation`)" class="WidthGlobal1 MarginAuto PaddingT_32rpx PaddingB_32rpx Color_DEBAA7 ">-->
<!--          <text class="Block Width100 TextHidden">-->
<!--            为更好服务平台的各位用户，特此公告数字藏品的二次交易细则。鉴于不同属性的数字艺术的二次交易细则各有不同，请各位用户务必审慎阅读并同意相关规则后进行相应操作，以免造成不必要损失。-->
<!--          </text>-->
<!--        </view>-->
<!--      </view>-->
      <view class="Title WidthGlobal1 MarginAuto MarginT_32rpx">
        <view class="LineShu FloatL MarginT_8rpx"></view>
        <text class="Block FloatL FontS_32rpx Color_FFFFFF MarginL_12rpx">积分礼品</text>
        <text class="Block FloatL FontS_24rpx Color_FFFFFF MarginL_8rpx MarginT_16rpx">Bonus gift</text>
        <view class="ClearL"></view>
      </view>
      <view class="Width100 IconBox">
<!--        <view class="Width100 TextCenter">-->
<!--          <image class="Icon InlineBlock" :src="$.imgSrc + '/images/jfsc_jfsc.png'" mode="widthFix"></image>-->
<!--        </view>-->
        <view class="ListBox WidthGlobal1 MarginAuto">
          <view class="Unit MarginT_32rpx BorderR_20rpx" v-for="(item,index) in list" @click="skipInfo(item)" :key="index" :class="(index+1)%2 != 0 ? 'FloatL':'FloatR'">
            <view class="ImgBox OverH PositionR">
              <image :src="item.main_image" mode="aspectFill" class="Width100 Height100"></image>
            </view>
            <view class="Bottom PaddingT_1rpx Width100">
              <view class="WidthGlobal5 MarginAuto ">
                <text class="Block Color_FFFFFF FontBold FontS_32rpx MarginT_16rpx Warp_E MarginT_20rpx">{{item.name}}</text>
                <view class="MarginT_40rpx">
                  <text class="Block FontS_28rpx Color_FFC393 FontBold FloatL MarginT_4rpx">{{item.points}}</text>
                  <text class="Block FontS_24rpx Color_FFC393 FloatL MarginL_10rpx MarginT_6rpx">积分</text>
                  <view class="ClearB"></view>
                </view>
              </view>
            </view>
          </view>
          <view class="ClearB"></view>
          <uni-load-more :status="loadStatus"></uni-load-more>
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
				itemData: [],
				wallet: null,
				loadStatus: 'noMore',
				page: 1,
				limit: 10,
				list: [],
        logList: [],
				baseUrl:"",
        bgUrl1:"",
        bgUrl2:"",
        log:[]
			};
		},
		onShow() {
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/jfye_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl2 = "background-image:url('"+ this.$.imgUrl +"/jfsc_bg2.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			this.baseUrl = this.$myAppConfig.baseUrl + '/';
			this.getAirdrop()
      this.loadData()
			this.getList(true)
		},
		onReachBottom() {
			if (this.loadStatus == 'noMore') return
			this.page++
			this.getList()
		},
		computed: {
			getairDrop() {
				let num = '0';
				if (this.wallet && this.wallet.air_drop) {
					num = this.wallet.air_drop * 1
				}
				return num;
			}
		},
		methods: {
      loadData(){
        this.$u.api.jfBuyLog({
          page: 1
        }).then(res => {
          if (res.code == 200) {
            this.log = res.data.data;
          }
        })
      },
      skipInfo(item){
        uni.navigateTo({
          url: `/pages/my/airdrop-award/airdrop-award-new-info-20240209?id=${item.id}`
        })
      },
			goUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			goDetails(id) {
				this.$u.api.jifenduihuan({
					id: id
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '兑换成功'
						})
						if (res.data.type == 3) {
							if (this.address.length == 0) {
								uni.showToast({
									icon: 'error',
									title: '请添加收获地址'
								})
								uni.navigateTo({
									url: '/pages/my/address/address-add'
								});
							}
						}
					}
				}).catch(err => {
					console.log(err)
				});
			},
			getAirdrop() {
				this.$u.api.air_drop().then(res => {
					if (res.code == 200) {
						this.wallet = res.data.wallet
					}
				})
			},
			getList(flag) {
				if (flag) this.page = 1
				this.$u.api.getJFGoods({
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (res.code == 200) {
            this.logList = res.data.point_exchange_records
						this.list = flag ? res.data.data : this.list.concat(res.data.data);
						this.loadStatus = res.data.last_page != res.data.current_page ? 'more' : 'noMore'
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.LineShu{
  width: 4rpx;
  height: 32rpx;
  background: linear-gradient(180deg, #E97FFF 0%, #64F2FF 100%);
  border-radius: 4rpx;
}
.IconBox1{
  margin-top: 260rpx;
}
.Icon{
  width: 558rpx;
}
.ListBox{
  .Unit{
    overflow: hidden;
    width: calc(50% - 16rpx);
    .Bottom{
      height: 178rpx;
      background: linear-gradient(360deg, #131313 0%, #282828 100%);
    }
    .ImgBox{
      width: 100%;
      height: 266rpx;
      .BottomText{
        height: 64rpx;
        line-height: 64rpx;
        bottom: 0;
        left: 0;
        background: linear-gradient(360deg, #000000 0%, rgba(0,0,0,0) 100%);
      }
    }
  }
}
.TopBox{
  .BG1{
    margin-top: -120rpx;
  }
  .JFBG{
    position: absolute;
    left: 32rpx;
    top: 380rpx;
    height: 140rpx;
  }
  .BtnMain{
    image{
      width: 328rpx;
      height: 134rpx;
    }
  }
  .BuyLog{
    .LogBox{
      height: 300rpx;
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
  .NavBox{
    height: 140rpx;
    bottom: -70rpx;
    left:50%;
    transform: translateX(-50%);
    .Unit{
      image{
        width: 48rpx;
        height: 48rpx;
      }
      text{
        line-height: 48rpx;
      }
    }
  }
}
	.air-card {
		width: 335rpx;
		height: 526rpx;
		border-radius: 20rpx;
		padding: 24rpx 24rpx 0 24rpx;

		.air-img {
			width: 287rpx;
			height: 287rpx;
			border-radius: 20rpx;
		}

		.air-line {
			height: 1rpx;
		}
	}

	// .box {
	// 	height: 100%;
	// 	background-color: #F9F9F9;
	// }

	// page {
	// 	background-color: #F9F9F9;
	// }

	// .page-black {
	// 	background-color: #1E2020;
	// 	min-height: 100vh;

	// 	.title {
	// 		color: #FFFFFF;
	// 	}

	// 	.record_card {
	// 		background-color: #292B2B;

	// 		.card_name {
	// 			color: #FFFFFF;
	// 		}

	// 		.grey {
	// 			color: #F7924C !important;
	// 		}
	// 	}
	// }

	.title {
		margin: 40rpx 34rpx 30rpx;
		font-size: 30rpx;
		// color: #333333;
		font-weight: bold;

		&::before {
			content: '|';
			font-size: 32rpx;
			font-weight: 600;
			color: #73ADDE;
			margin-right: 8rpx;
		}
	}

	.record_card {
		display: flex;
		justify-content: space-between;
		// background-color: #fff;
		height: 140rpx;
		margin: 20rpx 30rpx;
		align-items: center;
		border-radius: 10rpx;
		padding-right: 24rpx;

		.card_left {
			display: flex;
			align-items: center;

			.avatar {
				border-radius: 50%;
				width: 80rpx;
				height: 80rpx;
				margin: 0 24rpx 0 28rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
			}

			.card_flex {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.card_name {
					font-size: 28rpx;
					font-weight: bold;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}


				.coding {
					// color: #999999;
					font-size: 24rpx;
					margin-top: 14rpx;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		.card_right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-between;

			.grey {
				// color: #764E39;
				font-weight: 800;
			}

			.time {
				margin-top: 14rpx;
				// color: #999999;
				font-size: 24rpx;
			}

		}
	}

	.recharge_btn {
		width: 126rpx;
		height: 54rpx;
		line-height: 54rpx;
		border-radius: 28rpx;
		text-align: center;
		border: 1px solid white;
	}

	.integration-box {
		padding: 60rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.integral-pic {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			padding-top: 20rpx;
		}

		.balance {
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}

		.units {
			font-size: 32rpx;
			margin-left: 10rpx;
		}
	}

	.integration-btn-box {
		padding: 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.integration-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 326rpx;
			height: 160rpx;
			// border: 2rpx solid #707070;
			border-radius: 80rpx;
			background-color: rgba(112, 112, 112, 0.1);

			.integration-btn-pic {
				width: 80rpx;
				height: 80rpx;
				margin-right: 16rpx;
				padding-top: 14rpx;
			}

			.integration-btn-hint {
				font-size: 32rpx;

			}
		}
	}

	.introduce-box {
		padding: 0 40rpx;
	}

	.introduce {
		width: 670rpx;
		border-radius: 80rpx;
		background-color: rgba(112, 112, 112, 0.1);
		padding: 36rpx 48rpx;
		font-size: 32rpx;
		color: #c5c5c5;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.zero {
		font-size: 64rpx;
	}
</style>
