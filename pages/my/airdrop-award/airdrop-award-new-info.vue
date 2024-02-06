<template>
	<view class="page" :class="getThemeClass">
    <view v-if="info != null" class="BannerBox Width100 PositionR PaddingT_1rpx" :style="bgUrl1">
<!--      传奇图标-->
<!--      <image :src="$.imgSrc + '/images/chuanqi1.png'" mode="aspectFill" class="ChuanQi PositionA"></image>-->
      <view class="ImgBox BorderR_20rpx OverH">
        <swiper class="swiper Width100 Height100" circular :indicator-dots="true" :autoplay="true" :interval="2000"
                :duration="500">
          <swiper-item v-for="(item,index) in info.goods.carousel_images">
            <image :src="item" mode="aspectFill" class="Width100 Height100"></image>
          </swiper-item>
        </swiper>
      </view>
      <view class="WidthGlobal1 MarginAuto MarginT_120rpx">
        <text class="Block FloatL FontS_48rpx FontBold Color_FFC393">{{info.goods.points}}</text>
        <text class="Block FloatL FontS_24rpx MarginL_16rpx MarginT_16rpx Color_FFC393">积分</text>
        <view class="ClearB"></view>
<!--        <view class="MarginT_10rpx">-->
<!--          <text class="Block FloatL FontS_24rpx Color_FFC393">市场价: </text>-->
<!--          <text class="Block FloatL FontS_24rpx Color_FFC393 FontBold MarginT_4rpx">{{info.points}}</text>-->
<!--          <text class="Block FloatL FontS_24rpx Color_FFC393 MarginT_4rpx">USDT</text>-->
<!--          <view class="ClearB"></view>-->
<!--        </view>-->
      </view>
    </view>
    <view class="InfoBox Width100 BorderB PaddingT_32rpx PaddingB_32rpx">
      <view class="WidthGlobal1 MarginAuto">
        <text class="Block FontS_62rpx FontBold Color_FFFFFF Warp_E FloatL">{{ info.goods.name }}</text>
        <view class="FloatR DHXZ MarginT_16rpx" @click="checkNote">
          <text class="Block Color_FFFFFF FontS_28rpx FontBold FloatL MarginR_8rpx">兑换须知</text>
          <image :src="$.imgSrc + '/images/dhxz1.png'" mode="aspectFit" class="FloatL MarginT_6rpx"></image>
        </view>
        <view class="ClearB"></view>
        </view>
      </view>
    <view class="ContentBox Width100 BorderB">
      <view class="WidthGlobal1 MarginAuto PaddingB_48rpx PaddingT_32rpx">
        <text class="Block Title Color_FFFFFF FontS_32rpx">作品详情</text>
        <view class="Width100 PaddingT_40rpx PaddingB_40rpx Warp_E Warp_E_N" v-html="info.goods.description"></view>
      </view>
    </view>
    <view class="ContentBox Width100 BorderB">
      <view class="WidthGlobal1 MarginAuto PaddingB_48rpx PaddingT_32rpx">
        <text class="Block Title Color_FFFFFF FontS_32rpx">权益说明</text>
        <view class="Width100 PaddingT_40rpx PaddingB_40rpx" v-html="">

        </view>
      </view>
    </view>
    <view style="padding-bottom: 222rpx;"></view>


    <view class="BottomContentBox Width100">
      <view class="WidthGlobal1 MarginAuto">
        <view class="FloatL">
          <text class="Block FontS_48rpx Color_FFC393 FontBold FloatL MarginT_16rpx">{{info.goods.points}}</text>
          <text class="Block FontS_24rpx Color_FFC393 FloatL MarginT_32rpx MarginL_8rpx">积分</text>
          <view class="ClearB"></view>
        </view>
        <view @click="confirmSub" class="Btn FloatR TextCenter MarginT_22rpx" :style="bgUrl2">
          <text class="Block Color_0A1136 FontS_32rpx">立即兑换</text>
        </view>
        <view class="ClearB"></view>
      </view>
    </view>

    <view class="Width100 Height100 NoteBox" v-if="isShowNote" @click="closeNote">
      <view class="Content PositionA BorderR_30rpx PaddingT_40rpx PaddingB_40rpx OverF_Y_A" @click.stop="">
        <view class="WidthGlobal MarginAuto Text" v-html="info.config.point_note">

        </view>
        <view class="Btn MarginAuto MarginT_30rpx TextCenter" @click="closeNote">
          <text class="Block FontS_26rpx Color_FFFFFF">关闭</text>
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
				vip:0,
        isShowNote:false
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
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/info_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl2 = "background-image:url('"+ this.$.imgUrl +"/btn1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl3 = "background-image:url('"+ this.$.imgUrl +"/btn2.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			// this.produictDet(this.id)
		},
		methods: {
      checkNote(){
        this.isShowNote = true
      },
      closeNote(){
        this.isShowNote = false
      },
      returnImg(url){
        if(url){
          return url.split(',')
        }
        return []
      },
      confirmSub(){
        uni.navigateTo({
          url:`/pages/my/airdrop-award/airdrop-award-new-info-order?id=${this.id}`
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
      getGoodsInfo(id) {
				this.$u.api.getJFGoodsInfo({
					'id': this.id
				}).then(res => {
					if (res.code == 200) {
            this.info = res.data
					}
				}).catch(err => {

				})
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
.NoteBox{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0,0,0,0.5);
  .Content{
    background-color: #43454c;
    width: calc(100% - 200rpx);
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 600rpx;
    .Text{
      height: calc(100% - 70rpx);
    }
    .Btn{
      width: 120rpx;
      height: 60rpx;
      border-radius: 10rpx;
      line-height: 60rpx;
      background-color: #2f3342;
    }
  }
}
.DHXZ{
  image{
    width: 28rpx;
    height: 28rpx;
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
