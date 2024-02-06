<template>
	<view class="page" :class="getThemeClass">
    <view v-if="info != null" class="GoodsInfo WidthGlobal1 MarginAuto BorderR_20rpx MarginT_30rpx">
      <view class="WidthGlobal MarginAuto ">
        <view class="ImgBox FloatL BorderR_10rpx OverH">
          <image :src="info.cover_image" mode="aspectFill" class="Width100 Height100"></image>
        </view>
        <view class="TextBox FloatR">
          <text class="Block FontS_30rpx Color_FFFFFF MarginT_10rpx">{{ info.name }}</text>
          <text class="Block FontS_30rpx FontBold Color_FFC393 MarginT_20rpx">{{ info.maxmum_investment }}金币</text>
        </view>
        <view class="ClearB"></view>
      </view>
    </view>
    <view style="padding-bottom: 222rpx;"></view>


    <view class="BottomContentBox Width100">
      <view class="WidthGlobal1 MarginAuto">
        <view class="FloatL" v-if="info != null">
          <text class="Block FontS_48rpx Color_FFC393 FontBold FloatL MarginT_16rpx">{{ info.maxmum_investment }}</text>
          <text class="Block FontS_24rpx Color_FFC393 FloatL MarginT_32rpx MarginL_8rpx">金币</text>
          <view class="ClearB"></view>
        </view>
        <view @click="showBox" class="Btn FloatR TextCenter MarginT_22rpx" :style="bgUrl2">
          <text class="Block Color_0A1136 FontS_32rpx">确认兑换</text>
        </view>
        <view class="ClearB"></view>
      </view>
    </view>
    <view class="AlertBox Width100 Height100" v-if="isShowPsw" @click="closeBox">
      <view class="PositionA Content BorderR_30rpx" @click.stop="">
        <view class="WidthGlobal1 MarginAuto">
          <text class="Block FontS_36rpx FontBold Color_FFFFFF">交易密码</text>
          <view class="InputBox Width100 MarginT_30rpx">
            <input v-model="security_password" type="password" placeholder="请输入交易密码" class="Width100 MarginT_10rpx FontS_26rpx Color_FFFFFF">
          </view>
          <view class="Width100 TextCenter">
            <view class="InlineBlock">
              <view class="Btn TextCenter MarginAuto MarginT_40rpx BorderR_10rpx" @click="confirmSub" :style="bgUrl2">
                <text class="Block FontS_30rpx FontBold Color_0A1136">确认</text>
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
		components: {
		},
		data() {
			return {
        $:this.$,
        psw:'',
        isShowPsw:false,
        addressInfo:{
          name:'小明',
          mobile:'13012341234',
          isDefault:true,
          id:'1',
          region:'山东青岛',
          region_code:'李沧'
        },
        info:null,
        bgUrl1:'',
        bgUrl2:'',
        bgUrl3:'',
				// 用户信息
				user: {
					id: 1,
					// 关注状态
					follow: false
				},
				show: false,
				collect: false,
				likeNum: 1235,
				// 安全密码支付-弹出框
				payStatus: {
					show: false,
					url: 2
				},
				goodsData: {}, //商品详情信息总和
				product_cast: {}, //商品信息
				authors: {}, //艺术家信息
				note: {}, //购买权益相关
				userId: null, //用户ID

				first_diff:0,
				user_is_first:0,
				user_lucky_status:0,

				id:'',

				new_type:0,

				avatar: '',
				QRcode: '',
				backImg: '',
				posturl: '',
        orderId: '',
        security_password: '',
        isDisabled:false,
        vip:0
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
        // this.vip = Number(option.vip)+1
        this.getGoodsInfo()
			}
		},
		onShow() {
      if(this.$.getData('addressInfo')){
        this.addressInfo = this.$.getData('addressInfo')
      }
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/info_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl2 = "background-image:url('"+ this.$.imgUrl +"/btn1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl3 = "background-image:url('"+ this.$.imgUrl +"/btn2.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			// this.produictDet(this.id)
		},
		methods: {
      closeBox(){
        this.isShowPsw = false
      },
      showBox(){
        this.isShowPsw = true
      },
      getGoodsInfo() {
        this.$u.api.getProjectGoodsInfo({
          'id': this.id
        }).then(res => {
          if (res.code == 200) {
            this.info = res.data.project
          }
        }).catch(err => {

        })
      },
      choose(){
        uni.navigateTo({
          url:`/pages/my/address/address?type=1`
        })
      },
      confirmBuy(){
        this.$u.api.getProjectGoodsInfoOrderBuy({
          id:this.orderId,
          security_password:this.security_password
        }).then(ress => {
          if (ress.code == 200) {
            this.security_password = ''
            this.$.toast(ress.message)
            this.closeBox()
            setTimeout(() => {
              this.$.open('/pages/Special/SpecialDetailsNewOrderlog')
              this.isDisabled = false
              this.$.back()
            },1500)
          }else{
            this.$.toast(ress.message)
            this.isDisabled = false
          }
        }).catch(err => {
          this.isDisabled = false
        })
      },
      confirmSub(){
        if(this.isDisabled){
          return
        }
        this.isDisabled = true
        this.$u.api.getProjectGoodsInfoOrder({
          project_id:this.id,
        }).then(res => {
          if (res.code == 200) {
            this.orderId = res.data.id
            this.confirmBuy()
          }else{
            this.$.toast(res.message)
            this.isDisabled = false
          }
        }).catch(err => {

          this.isDisabled = false
        })

      },
			share(){
				if (this.posturl) {
					uni.previewImage({
						urls: [this.posturl]
					});
				} else {
					this.$refs.poster.create();
				}
			},
			gothreed(){
				uni.navigateTo({
					url:`/pages/threeD/threeD?url=${this.product_cast.modeling}`
				})
			},
			finish(data) {
				this.posturl = data.url;
			},
			getUserid() {
				this.userId = uni.getStorageSync("id");
			},
			produictDet(id) {
			},
			// 分享
			shareCli() {
				this.show = true
			},
			// 分享取消
			cancelCli() {
				this.show = false
			},
			// 立即购买按钮	 this.product_cast.id
			buy(data) {
				uni.navigateTo({
					url:`/pages/Special/Special-buy?id=${this.product_cast.id}`
				})
			},
			// 收藏/数量
			likeCli(id) {
				let that = this
				if (!this.goodsData.like_status) {
					that.$u.api.like_add({
						'id': id
					}).then(res => {
						this.goodsData.like_status = 1
						this.product_cast.collect = this.product_cast.collect + 1
					}).catch(err => {})
				} else {
					that.$u.api.like_del({
						'id': id
					}).then(res => {
						this.goodsData.like_status = 0
						this.product_cast.collect = this.product_cast.collect - 1
					}).catch(err => {})
				}
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val
			},
			// 作者头像/名称点击事件
			authorInfo() {
				uni.navigateTo({
					url: '../artist-space/artist-space?id=' + this.authors.id
				})
			},
			// 关注/取消关注
			focuson(id) {
				// status为0 = 没关注
				if (!this.goodsData.status) {
					this.$u.api.attention({
						'user_id': id
					}).then(res => {
						this.goodsData.status = 1
					}).catch(err => {})
				} else {
					this.$u.api.callback_attention({
						'user_id': id
					}).then(res => {
						this.goodsData.status = 0
					}).catch(err => {})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
      width: 200rpx;
      height: 76rpx;
      line-height: 76rpx;
    }
    .InputBox{
      border-bottom: 2rpx solid #FFFFFF;
      padding-bottom: 20rpx;
      //width: calc(100% - 200rpx);
    }
  }
}
.address {
  padding: 30rpx;
  .RightIcon{
    width: 40rpx;
    height: 40rpx;
  }
}
.DHXZ{
  image{
    width: 28rpx;
    height: 28rpx;
  }
}
.GoodsInfo{
  background-color: #17191F;
  padding:50rpx 0rpx;
  .ImgBox{
    width: 100rpx;
    height: 100rpx;
  }
  .TextBox{
    width: calc(100% - 140rpx);
  }
}
.BottomContentBox{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 202rpx;
  background-color: #0C0D0F;
  border-top: 2rpx solid #FFFFFF;
  .Btn{
    width: 196rpx;
    height: 76rpx;
    text{
      line-height: 76rpx;
    }
  }
}
.ContentBox{
  .Copy{
    width: 40rpx;
    height: 40rpx;
  }
}
.TagList{
  .Tag{
    height: 42rpx;
    padding: 0rpx 16rpx;
    background: linear-gradient(270deg, #EBD0A4 0%, #F9E9CE 100%);
  }
  text{
    line-height: 42rpx;
  }
}
.ClassList{
  .Unit{
    .Line{
      width: 4rpx;
      height: 32rpx;
      background: linear-gradient(180deg, #6D29FF 0%, #2957FB 33%, #38FFFF 67%, #01B3FF 100%);
    }
  }
}
.BorderB{
  border-bottom: 2rpx solid #2F2F2F;
}
.SB{
  .ImgBox{
    width: 80rpx;
    height: 80rpx;
  }
  .RightIcon{
    width: 32rpx;
    height: 32rpx;
  }
  .GZBtn{
    width: 104rpx;
    height: 48rpx;
    background: rgba(22,21,26,0.2);
    opacity: 1;
    border: 2rpx solid #FFFFFF;
    border-radius: 30rpx;
    //border-image: linear-gradient(127deg, rgba(178, 186, 190, 1), rgba(61, 61, 61, 1), rgba(230, 237, 239, 1)) 1 1;
  }
}
.BannerBox{
  height: 874rpx;
  margin-top: -88rpx;
  .ChuanQi{
    width: 96rpx;
    height: 96rpx;
    right: 48rpx;
    top: 136rpx;
  }
  .ImgBox{
    width: 402rpx;
    height: 518rpx;
    margin: 0 auto;
    margin-top: 132rpx;
  }
}
	.xiangou{
		padding: 8rpx 10rpx;
		border-radius: 10rpx;
		font-size: 22rpx;
		border: 1rpx solid #EEEEEE;
		background-color: #EEEEEE;
		color: #090A0D;
	}
	.my-u-tag{
		// border-radius: 0rpx;
		transform: skewX(-15deg);
		/deep/ .u-tag-text {
			display: inline-block;
			// transform: skewX(15deg);
		}
	}
	.title_right {
		display: flex;
		align-items: center;

		.like_num {
			// color: #333333;
			font-size: 26rpx;
			margin: 0 36rpx 0 12rpx;
		}

		image {
			width: 38rpx;
		}
	}

	.head {
		image {
			width: 100%;
			height: 750rpx !important;
			box-sizing: border-box;
		}
		.head_main3d{
			// transform: translateY(-60rpx);
			border-radius: 20rpx;
			// background-color: #fff;
			margin: 30rpx;
			padding: 40rpx 32rpx;
		}
		.head_cent{
			padding-top: 80rpx;
			margin: 30rpx;
			position: relative;
		}
		.head_upperpart{
			width: 100%;
			height: 150rpx;
			background: linear-gradient(90deg, #696969 0%, #090A0D 100%);
			border-radius: 24rpx;
			position: absolute;
			top: 0;
			left: 0;
			.price_number {
				font-size: 38rpx;
				margin-top: 18rpx;
				margin-left: 18rpx;
				color: #fff;
				.symbol {
					font-size: 24rpx;
				}
			}
		}
		.head_main {
			width: 100%;
			// transform: translateY(-60rpx);
			border-radius: 20rpx;
			// background-color: #fff;
			padding: 40rpx 32rpx 40rpx;
			position: relative;
			.main_flex {
				display: flex;
				justify-content: space-between;

				.main_name {
					font-size: 32rpx;
					font-weight: bold;
					// color: #111111;
				}

				.instock {
					font-size: 24rpx;
					// color: #999999;
				}
			}

			.content {
				// color: #666666;
				font-size: 26rpx;
				margin-top: 42rpx;
			}
		}
	}

	.author {
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		// background-color: #fff;
		padding: 34rpx 30rpx 40rpx;

		.author_top {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.author_top_left {
				display: flex;
				align-items: center;

				.avatar {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
					}
				}

				.active_info {
					margin-left: 24rpx;

					.active_name {
						// color: #111111;
						font-size: 28rpx;
						font-weight: bold;

						.arrow {
							width: 12rpx;
							margin-left: 14rpx;
						}
					}

					.fans {
						margin-top: 16rpx;
						font-size: 22rpx;
						// color: #999999;
					}

				}
			}

			.focuson {
				width: 100rpx;
				height: 46rpx;
				border: 1px solid #764E39;
				color: #764E39;
				font-size: 22rpx;
				text-align: center;
				line-height: 46rpx;
				border-radius: 24rpx;
				font-weight: 500;
				// margin-right: 30rpx;
			}

			.unsubscribe {
				width: 120rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				border-radius: 24rpx;
				border: 1px solid #A2A2A2;
				color: #999999;
				font-size: 22rpx;
				font-weight: 500;
				// margin-right: 30rpx;
			}
		}

		.active_content {
			// color: #666666;
			font-size: 26rpx;
			margin-top: 38rpx;
			line-height: 1.6;
		}
	}

	.certification {
		// background-color: #fff;
		margin: 24rpx 30rpx;
		border-radius: 20rpx;
		padding: 32rpx 30rpx 0;

		.info_item {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 2rpx;
			&:last-child {
				border-bottom: none;
			}

			.item_name {
				// color: #999999;
				font-size: 27rpx;
				width: 280rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.item_value {
				display: flex;
				align-items: center;
				// color: #333333;
				font-size: 29rpx;
				justify-content: flex-end;
			}

			.item_valuetext {
				width: 300rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: right;
			}

			.copy_img {
				width: 22rpx;
				margin-left: 20rpx;
			}
		}

		// .info_item+.info_item {
		// 	// border-top: 1px solid #F2F2F2;
		// }
	}

	.buy {
		// background-color: #fff;
		margin-top: 52rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 0 24rpx 0 32rpx;
		width: 750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		border-top: solid 1rpx;
		padding: 15rpx 30rpx;

		.buy-countdown{
			font-size: 30rpx;
			// color: #764e39;
		}

		.buy-content{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			margin-top: 15rpx;
		}

		.price {
			display: flex;
			align-items: center;

			.price_text {
				// color: #333333;
				font-size: 26rpx;
			}

			.price_number {
				font-size: 38rpx;
				margin-left: 18rpx;

				.symbol {
					font-size: 24rpx;
				}
			}
		}

		.buy_btn {
			min-width: 200rpx;
			padding: 0 30rpx;
			height: 78rpx;
			background-color: #764E39;
			color: #fff;
			line-height: 78rpx;
			text-align: center;
			font-size: 28rpx;
			border-radius: 10rpx;
		}

		// 已售罄
		// .soldout {
		// 	background-color: #D2D2D2;
		// }
	}

	.popup_title {
		font-size: 30rpx;
		color: #999999;
		text-align: center;
		margin-top: 54rpx;
	}

	.popup_flex {
		display: flex;
		justify-content: space-around;
		margin-top: 86rpx;

		.popup_item {
			display: flex;
			flex-direction: column;
			align-items: center;


			image {
				width: 90rpx;
			}

			.popup_text {
				color: #333333;
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}
	}

	.cancel {
		margin: 90rpx 30rpx 0;
		background-color: #764E39;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 10rpx;
	}
</style>
