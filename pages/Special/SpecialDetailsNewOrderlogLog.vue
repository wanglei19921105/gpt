<template>
	<view class="page" :class="getThemeClass">
		<view class="coll-head">
			<u-tabs
				:list="tabs"
				:is-scroll="false"
				:current="current"
				@change="change"
				:active-color="getMainColor"
				:inactive-color="getNavInactiveColor"
				:bg-color="getBgColor"
			></u-tabs>
		</view>
		<view class="gap-100"></view>
		<empty v-if="!list.length"></empty>
    <view class="ListBox WidthGlobal1 MarginAuto">
      <view v-for="(item,index) in list" :key="index" class="Unit MarginT_30rpx PaddingT_32rpx PaddingB_32rpx Width100 BorderR_20rpx">
        <view class="Width100 PaddingB_32rpx BorderB">
          <view class="WidthGlobal1 MarginAuto">
            <view class="ImgBox FloatL BorderR_20rpx OverH">
              <image :src="(item.project || {}).cover_image" mode="aspectFill" class="Width100 Height100"></image>
            </view>
            <view class="FloatR Text">
              <text class="Block FontBold Color_FFFFFF FontS_48rpx Warp_E FloatL">{{(item.project || {}).name}} </text>
              <text class="Block FontS_28rpx FontBold Color_FFC393 FloatR">进行中</text>
              <view class="ClearB"></view>
              <view class="MarginT_12rpx Width100">
                <view class="Tag FloatL BorderR_4rpx">
                  <text class="Block FontBold FontS_24rpx Color_64340B">投资周期: {{ item.project.keep_days }}天</text>
                </view>
                <view class="FloatR">
                  <text class="Block FontBold FontS_32rpx Color_F52A2B TextRight">{{ item.project.profit_rate}}%</text>
                  <text class="Block FontBold FontS_28rpx Color_868789 MarginT_4rpx">日收益率</text>
                </view>
                <view class="ClearB"></view>
              </view>
<!--              <text class="Block FontS_28rpx Color_96FF44 MarginT_4rpx">兑换成功</text>-->
            </view>
            <view class="ClearB"></view>
          </view>
        </view>
        <view class="WidthGlobal1 MarginAuto">
          <view class="Width100 MarginT_30rpx">
            <text class="Block FontS_28rpx Color_C8C9CB FloatL">当日收益</text>
            <text class="Block FontS_36rpx FontBold Color_FFC393 FloatR">￥{{ item.amount }}</text>
            <view class="ClearB"></view>
          </view>
          <view class="Width100 MarginT_30rpx">
            <text class="Block FontS_28rpx Color_C8C9CB FloatL">共计收益</text>
            <text class="Block FontS_36rpx Color_FFC393 FloatR">{{ Math.floor(item.project.maxmum_investment * item.project.profit_rate / 100)  }}</text>
            <view class="ClearB"></view>
          </view>
          <view class="Width100 MarginT_30rpx">
            <text class="Block FontS_28rpx Color_C8C9CB FloatL">投资金额</text>
            <text class="Block FontS_28rpx Color_FFC393 FloatR">{{ item.project.maxmum_investment }}</text>
            <view class="ClearB"></view>
          </view>
          
         <view class="Width100 MarginT_30rpx">
           <text class="Block FontS_28rpx Color_C8C9CB FloatL">返现时间</text>
           <text class="Block FontS_28rpx Color_FFFFFF FloatR">{{ item.cashback_date }}</text>
           <view class="ClearB"></view>
         </view>
		 <!-- <view class="TextCenter MarginT_32rpx Width100" >
		   <view class="InlineBlock">
		     <text class="Block FontS_28rpx Color_C8C9CB FloatL">投资详情</text>
		     <image :src="$.imgSrc + '/images/right_icon1.png'" mode="aspectFit" class="RightIcon MarginT_4rpx MarginL_8rpx"></image>
		     <view class="ClearB"></view>
		   </view>
		 </view> -->
        </view>
      </view>
    </view>
<!--		<view v-for="(item, index) in list" :key="index" class="itemBox card-bg" @click="godetail(item.id)">-->
<!--			<view class="head_img">-->
<!--				<view class="casting_info">-->
<!--					<view class="casting_head">-->
<!--						<view class="head_left">-->
<!--							&lt;!&ndash; NFT铸品名称 &ndash;&gt;-->
<!--							<view class="name" v-if="current==0">-->
<!--								订单号码：{{ item.out_trade_no }}<br>-->
<!--								商品名称：{{ item.name }}<br>-->
<!--								下单时间：{{ item.created_at }}-->
<!--							</view>-->
<!--							<view class="name" v-if="current==1">-->
<!--								订单号码：{{ item.out_trade_no }}<br>-->
<!--								商品名称：{{ item.name }}<br>-->
<!--								快递单号：{{ item.kd_id }}<br>-->
<!--								发货时间：{{ item.updated_at }}-->
<!--							</view>-->
<!--							<view class="name" v-if="current==2">-->
<!--								订单号码：{{ item.out_trade_no }}<br>-->
<!--								商品名称：{{ item.name }}<br>-->
<!--								快递单号：{{ item.kd_id }}<br>-->
<!--								发货时间：{{ item.updated_at }}-->
<!--							</view>-->
<!--						</view>-->
<!--					</view>-->
<!--				</view>-->
<!--			</view>-->
<!--			<view class="btns" v-if="current==1">-->
<!--				&lt;!&ndash;<botBtn-->
<!--					padding="18rpx 78rpx"-->
<!--					@click="getExpress(item.id)"-->
<!--					type="error"-->
<!--					plain-->
<!--				>-->
<!--					<text>查看物流</text>-->
<!--				</botBtn>&ndash;&gt;-->
<!--				<botBtn-->
<!--					padding="20rpx 80rpx"-->
<!--					@click="shouhuo(item.id)"-->
<!--				>-->
<!--					<text>确认收货</text>-->
<!--				</botBtn>-->
<!--			</view>-->
<!--			&lt;!&ndash;<view class="btns" v-if="current==2">-->
<!--				 <botBtn-->
<!--					padding="18rpx 78rpx"-->
<!--					@click="getExpress(item.id)"-->
<!--					type="error"-->
<!--					plain-->
<!--				>-->
<!--					<text>查看物流</text>-->
<!--				</botBtn>-->
<!--				<botBtnp-->
<!--					padding="20rpx 80rpx"-->
<!--					@click="godetail(item.id)"-->
<!--				>-->
<!--					<text>查看详情</text>-->
<!--				</botBtnp>-->
<!--			</view>&ndash;&gt;-->

<!--		</view>-->
		<uni-load-more :status="loadStatus"></uni-load-more>

<!--		<express :express="express" ref="express"></express>-->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				list:[],
				loadStatus:'noMore',
				tabs: [{
					name:'未返现',
					id:0
				},{
					name:'已返现',
					id:1
				}],
				current: 0,
				express:{}
			}
		},
		onLoad(e) {
      if(typeof(e.id) != 'undefined'){
        this.id = e.id
      }
			this.loadData(true)
		},
		methods:{
			loadData(flag){
				if(flag)this.page=1
				this.$u.api.getProjectGoodsReturnLog({
						page: this.page,
          purchase_log_id:this.id ? this.id : '',
          status:this.tabs[this.current].id
					}).then(res => {
					if (res.code == 200) {
						this.list = flag? res.data.data:this.list.concat(res.data.data);
						this.loadStatus = res.data.current_page == res.data.last_page ?'noMore':'more'
					}
				})
			},
			change(index) {
				if(this.current==index)return
				this.list = []
				this.current = index;
				this.loadData(true)
			},
			getExpress(id){
				uni.showLoading({
					title: '加载中...',
					mask: false
				})
				this.$u.api.myOrders_express({
					order_id: id
				}).then(res=>{
					this.express = res.data.data
					this.$refs.express.show()
				})
			},
			shouhuo(id){
				this.$u.api.myOrders_receive({
					order_id: id
				}).then(res=>{
					uni.showToast({
						title:"操作成功",
						icon:"none"
					})
					this.loadData(true)
				})
			},
			godetail(id){
				uni.navigateTo({
					url:`/pages/my/logistics-order/logistics-detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
.RightIcon{
  width: 32rpx;
  height: 32rpx;
}
.BorderB{
  border-bottom: 2rpx solid #535559;
}
.ListBox{
  .Unit{
    .Tag{
      padding: 0rpx 16rpx;
      height: 42rpx;
      line-height: 42rpx;
      background: linear-gradient(270deg, #EBD0A4 0%, #F9E9CE 100%);
    }
    background: linear-gradient(270deg, #0C0C0F 0%, #282C37 100%);
    .ImgBox{
      width: 160rpx;
      height: 160rpx;
    }
    .Text{
      width: calc(100% - 192rpx);
    }
  }
}
	.coll-head{
		width: 750rpx;
		position: fixed;
		// top: calc(44px + var(--status-bar-height));
		// left: 0;
		z-index: 10;
	}
	.itemBox {
		overflow: hidden;
		margin: 32rpx 30rpx;
		border-radius: 30rpx;
		// background-color: #fff;
	}

	.head_img {
		image {
			width: 100%;
		}
	}

	.casting_info {
		padding: 30rpx;
		line-height: 60rpx;

		.casting_head {
			display: flex;
			align-items: center;
			justify-content: space-between;


			.name {
				// color: #111111;
				font-size: 32rpx;
				font-weight: bold;
			}

			.price {
				// color: #a11716;
				font-size: 38rpx;

				text {
					font-size: 26rpx;
				}
			}

			.head_right {
				// color: #eeb32e;
				font-weight: bold;
				font-size: 30rpx;
			}

		}

		.casting_flex {
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.casting_left {
				// color: #999999;
				font-size: 26rpx;
			}

			.casting_right {
				// color: #111111;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					margin-right: 24rpx;
					overflow: hidden;

					image {
						width: 100%;
					}
				}

				.uicon {
					margin-left: 20rpx;
					width: 22rpx;
					border-radius: 0;
				}
			}
		}

		.casting_flex + .casting_flex {
			border-top: 1px solid;
		}
	}

	.btns {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0 30rpx 0rpx;
			.btn {
				width: 300rpx;
				height: 94rpx;
				line-height: 94rpx;
				text-align: center;
				// background-color:  #764E39;
				// color: #fff;
				font-size: 32rpx;
				border-radius: 10rpx;
			}
			.cancel{
				background-color: #fff;
				border: 3rpx solid red;
				color: red;
			}
		}
		.dfk{
			display: flex;
			// color: #ffffff;
			width: 630rpx;
			margin-top: 20rpx;
		}
</style>
