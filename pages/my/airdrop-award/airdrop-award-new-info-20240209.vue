<template>
	<view class="page" :class="getThemeClass">
    <view class="BannerBox Width100 PositionR PaddingT_1rpx" :style="bgUrl1" v-if="info != null">
<!--      传奇-->
<!--      <image :src="$.imgSrc + '/images/chuanqi1.png'" mode="aspectFill" class="ChuanQi PositionA"></image>-->
      <view class="ImgBox" style="height: 100%;width: 100%">
        <swiper class="swiper Width100 Height100" circular :indicator-dots="false" :autoplay="true" :interval="2000"
                :duration="500">
          <swiper-item v-for="(item,index) in [info.goods.main_image]">
            <image :src="item" mode="aspectFill" class="Width100 Height100"></image>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="Content PositionA WidthGlobal1" v-if="info != null">
      <view class="Top Width100 BorderR_20rpx">
        <view class="Money WidthGlobal1 MarginAuto">
          <text class="Block FontBold Color_FFC393 FontS_48rpx">{{info.goods.points}} 积分</text>
        </view>
        <view class="TopBottom Width100 PaddingT_32rpx PaddingB_32rpx BG_171717 BorderR_20rpx MarginT_16rpx">
          <view class="WidthGlobal1 MarginAuto">
            <text class="Block Color_FFFFFF FontBold FontS_40rpx">{{info.goods.name}}</text>
            <view class="TagList MarginT_40rpx">
              <view class="Tag1 FloatL BG_FFFFFF BorderR_6rpx MarginR_32rpx">
                <text class="Block FontS_20rpx FontBold FloatL Color_000000">库存</text>
                <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000">{{info.goods.limit}}</text>
                <view class="ClearL"></view>
              </view>
              <view class="Tag1 FloatL BG_FFFFFF BorderR_6rpx MarginR_32rpx">
                <text class="Block FontS_20rpx FontBold FloatL Color_000000">类型</text>
                <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000" v-if="info.goods.type ==0">金币</text>
                <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000" v-if="info.goods.type ==1">现金</text>
                <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000" v-if="info.goods.type ==2">实物</text>
                <view class="ClearL"></view>
              </view>
              <view class="Tag1 FloatL BG_FFFFFF BorderR_6rpx MarginR_32rpx">
                <text class="Block FontS_20rpx FontBold FloatL Color_000000">已兑</text>
                <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000">{{ info.goods.sold }}</text>
                <view class="ClearL"></view>
              </view>
              <view class="ClearL"></view>
              <view class="ClearB"></view>
            </view>
          </view>
        </view>
      </view>
      <view class="MainTitle Width100">
        <view class="Title Width100 MarginT_32rpx">
          <view class="LineShu FloatL MarginT_8rpx"></view>
          <text class="Block FloatL FontS_32rpx Color_FFFFFF MarginL_12rpx">产品详情</text>
          <text class="Block FloatL FontS_24rpx Color_FFFFFF MarginL_8rpx MarginT_16rpx">Details of works</text>
          <view class="ClearL"></view>
        </view>
      </view>
      <view class="ContentBox Width100 MarginT_16rpx">
        <view class="Width100 MarginAuto PaddingB_48rpx PaddingT_32rpx BG_171717 BorderR_20rpx">
          <view class="WidthGlobal1 MarginAuto PaddingT_40rpx PaddingB_40rpx">
            <rich-text :nodes="info.goods.description"></rich-text>
          </view>
        </view>
      </view>
      <view style="padding-bottom: 440rpx;"></view>
    </view>
    <view class="BottomContentBox Width100"  v-if="info != null">
      <view class="WidthGlobal1 MarginAuto">
        <view class="FloatL">
          <text class="Block FontS_48rpx Color_FFFFFF FontBold MarginT_16rpx">{{ returnPrice }}</text>
          <view class="ClearB"></view>
        </view>
        <view class="NumBox FloatR MarginT_32rpx Flex Flex_C_S-B">
          <image :src="$.imgSrc + '/images/add1.png'" mode="aspectFit" class="Add FloatL" @click="addS(1)"></image>
          <view class="Line Height100 MarginL_16rpx"></view>
          <text class="Block Color_FFFFFF FontS_32rpx FontBold FloatL TextCenter Height100">{{num}}</text>
          <view class="Line Height100 "></view>
          <image :src="$.imgSrc + '/images/add2.png'" mode="aspectFit" class="Add FloatL MarginL_16rpx" @click="addS(2)"></image>
          <view class="ClearL"></view>
        </view>
        <view class="ClearB"></view>
        <view class="Btn TextCenter BG_0FDBBE Width100 MarginT_32rpx" @click="info.goods.stock != 0 ? confirmSub():''">
          <text class="Block Color_0A1136 FontS_32rpx FontBold">{{info.goods.stock == 0 ? '已售罄' :'立即购买'}}</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
import piaoyiProgressBar from '@/components/piaoyi-progress-bar/piaoyi-progress-bar.vue';
	// import explain from '../../components/explain.vue'
	export default {
		components: {
			// explain
      piaoyiProgressBar
		},
		data() {
			return {
        num:1,
        $:this.$,
        dataShow:{
          '0':'天',
          '1':'周',
          '2':'月',
          '3':'天',
          '4':'小时',
          '5':'天',
        },
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
        bgUrl4: '',
        info: null,
        infoMain:{},
        list:[],
        showList1:[],
        showList2:[],
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
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/info_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl2 = "background-image:url('"+ this.$.imgUrl +"/btn1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl3 = "background-image:url('"+ this.$.imgUrl +"/btn2.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
      this.bgUrl4 = "background-image:url('"+ this.$.imgUrl +"/name_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			// this.produictDet(this.id)
		},
    computed:{
      returnPrice(){
        return (Number(this.info.goods.points) * Number(this.num)).toFixed(2)
      },
    },
		methods: {
      confirmSub(){
        uni.navigateTo({
          url:`/pages/my/airdrop-award/airdrop-award-new-info-order?id=${this.id}&num=${this.num}`
        })
      },
      addS(type = 1){
        if(type == 1){
          if(this.num > 1){
            this.num --
          }
        }else {
          if(this.info.goods.stock == this.num){
            return
          }
          this.num ++
        }
      },
      returnDayRate(item){
        return Number(Number(item.maxmum_investment) * Number(item.profit_rate) / item.keep_days).toFixed(2)
      },
      returnRate(item){
        return Number(Number(item.sales / (item.stock + item.sales)).toFixed(1))
      },
      confirmBuy(){
        uni.navigateTo({
          url:`/pages/Special/SpecialDetailsNeworder?id=${this.id}&num=${this.num}&price=${this.returnPrice}`
        })
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
      changeUser1(e){
        let index = e.detail.current
        let arr = this.list.slice(index, index + 10)
        this.showList1 = arr
      },
      changeUser2(e){
        let index = e.detail.current
        let arr = this.list.slice(index, index + 10)
        this.showList2 = arr
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
				this.$u.api.vip_product_detail({
					'cast_id': id
				}).then(res => {
					if (res.code == 200) {
						this.user_lucky_status = res.data.user_lucky_status
						this.new_type = res.data.product_cast.new_type
						this.first_diff = res.data.first_diff
						this.user_is_first = res.data.user_is_first
						this.goodsData = res.data
						this.product_cast = res.data.product_cast
						this.authors = res.data.authors
						this.note = res.data.note
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
.LineShu{
  width: 4rpx;
  height: 32rpx;
  background: linear-gradient(180deg, #E97FFF 0%, #64F2FF 100%);
  border-radius: 4rpx;
}
.Content{
  top: 748rpx;
  left: 32rpx;
  z-index: 99;
  .ShowUnit{
    .ImgBox{
      width: 80rpx;
      height: 80rpx;
    }
    .TextBox{
      width: calc(100% - 96rpx);
    }
  }
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
    padding-top: 16rpx;
    background: linear-gradient(270deg, #0C0C0F 0%, #282C37 100%);
    .TopBottom{
      .TagList{
        .Tag1{
          height: 40rpx;
          padding: 0rpx 16rpx;
          text{
            line-height: 40rpx;
          }
        }
        .Tag2{
          width: 92rpx;
          height: 40rpx;
          text{
            line-height: 40rpx;
            background-image:-webkit-linear-gradient(bottom,#3A4461,#9A9EC3);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }
        }
        .Tag{
          padding-right: 20rpx;
          background-color: #2E2D2D;
          border-radius: 6rpx;
          .TagL{
            width: 112rpx;
            height: 40rpx;
            border-radius: 6rpx;
            background: linear-gradient(90deg, #E97FFF 0%, #64F2FF 100%);
            line-height: 40rpx;
          }
          .TagR{
            padding-left:20rpx;
            text{
              line-height: 40rpx;
            }
          }
        }
      }
      .ProgressBox{
        .ProgressMain{
          width: 218rpx;
          height: 8rpx;
          .Progress{
            background: linear-gradient(90deg, #2360EB 0%, #5FC5FF 100%);
          }
        }
      }
    }
  }

  .SignInLog{
    height: 2000rpx;
    .Unit{
      border: 2rpx solid rgba(255,255,255,0.7);
      .ImgBox{
        width: 80rpx;
        height: 80rpx;
      }
      .TextContent{
        width: calc(100% - 96rpx);
      }
      .Icon{
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .UnitBox1{
    height: 340rpx;
  }
  .UnitBox{
    border: 2rpx solid #FFFFFF;
    .UserList{
      .UserUnit{
        width: 20%;
        .ImgBox{
          width: 80rpx;
          height: 80rpx;
        }
        .Text{
          width: 80rpx;
        }
      }
    }
    .UserList::after{
      content:'';
      flex: 1;
    }
    .Line{
      height: 2rpx;
      background:linear-gradient(to right, rgba(159,159,159,0.25), rgba(159,159,159,0.50), rgba(159,159,159,1), rgba(159,159,159,0.25), rgba(159,159,159,0.25));
    }
    .DataList{
      .Data{
        width: 33.33%;
        image{
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
  }
}
.LineShu{
  width: 4rpx;
  height: 32rpx;
  background: linear-gradient(180deg, #E97FFF 0%, #64F2FF 100%);
  border-radius: 4rpx;
}
.BannerBox{
  height: 770rpx;
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
.BottomContentBox{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 300rpx;
  background-color: #0C0D0F;
  border-top: 2rpx solid #FFFFFF;
  .NumBox{
    padding: 0rpx 16rpx;
    border: 2rpx solid #FFFFFF;
    border-radius: 16rpx;
    width: 218rpx;
    height: 68rpx;
    text{
      line-height: 68rpx;
      width: 54rpx;
    }
    .Line{
      width: 2rpx;
      background:linear-gradient(to top, rgba(159,159,159,0), rgba(159,159,159,0.50), rgba(159,159,159,1), rgba(159,159,159,0.25), rgba(159,159,159,0));
    }
    image{
      width: 48rpx;
      height: 48rpx;
    }
  }
  .Btn{
    height: 92rpx;
    border-radius: 92rpx;
    text{
      line-height: 92rpx;
    }
  }
}
.ContentBox{
  .Copy{
    width: 40rpx;
    height: 40rpx;
  }
}
//.TagList{
//  .Tag{
//    height: 42rpx;
//    padding: 0rpx 16rpx;
//    background: linear-gradient(270deg, #EBD0A4 0%, #F9E9CE 100%);
//  }
//  text{
//    line-height: 42rpx;
//  }
//}
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
