<template>
	<view class="page" :class="getThemeClass">
		<view class="specia-detail-cover" v-if="Object.keys(info).length">
			<image class="cover-img" :src="info.cover_image" mode="aspectFill"></image>
		</view>
		<view class="specia-detail-other">
			<view class="specia-detail-card">
				<view class="specia-detail-card-title">
					<view>
						<view class="item-info-name">{{ info.name }}</view>
						<view class="item-info-total">项目数量：{{ info.stock + info.sales }}</view>
					</view>
					<view class="item-price">
						<text class="item-price-unit">￥</text>
						<text class="item-price-num">{{ info.maxmum_investment }}</text>
					</view>
				</view>
				<view class="progress-bar">
					<view class="progress-bar-bg">
						<view class="progress" :style="'width:' + returnRate(info) +'%;'"></view>
					</view>
					<text class="progress-text">{{ returnRate(info) }}%</text>
				</view>
				<view class="specia-detail-card-content">
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text">{{ info.profit_rate + '%' }}</text>
						<text class="specia-detail-card-content-item-title">日收益率</text>
					</view>
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text">{{info.daily_returned || 0 }}</text>
						<text class="specia-detail-card-content-item-title">每日收益</text>
					</view>
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text">{{ info.keep_days }}天</text>
						<text class="specia-detail-card-content-item-title">投资周期</text>
					</view>
					<view class="specia-detail-card-content-item">
						<text class="specia-detail-card-content-item-text"> {{ info.fully_returned }}</text>
						<text class="specia-detail-card-content-item-title">到期总收益</text>
					</view>
				</view>	
				<view class="specia-detail-card-tips">
					<view class="tips-limit">
						<view class="tips-limit-tips">起购份数</view>
						<view class="tips-limit-total">{{ info.min_buy }}</view>
					</view>
					<view class="tips-limit">
						<view class="tips-limit-tips">限购份数</view>
						<view class="tips-limit-total">{{ info.limit }}</view>
					</view>
					<image class="tips-vip-icon" src="../../static/images/tab/light/VIP1.png"></image>
				</view>
			</view>
			<view class="specia-detail-purchase-list m-t-30" v-if="purchaseList.length">
				<view class="purchase-list-title">购买动态</view>
				<view class="purchase-list-content">
					<view class="purchase-list-item" v-for="(item, index) in purchaseList" :key="index">
						<view class="purchase-list-item-cover">
              <image class="purchase-list-item-cover-img" :src="item.avatar" mode="aspectFill"></image>
            </view>
						<view class="purchase-list-item-info">
							<view class="purchase-list-item-text">
								<view class="nick-name">{{ item.nickname || '用户昵称' }}</view>
              	<view class="quantity">获得总收益{{ item.amount }}元</view>
							</view>
							<view class="purchase-list-item-text">
								<view class="time" v-if="item.purchased_at ">{{ item.purchased_at }} 购买成功</view>
              	<view class="mount">￥{{ item.paid_amount || 0 }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="specia-detail-content m-t-30">
				<view class="specia-detail-content-text" v-html="info.details"></view>
			</view>
		</view>
		<!-- 底部购买按钮 -->
		<view class="bottom-buy-content" v-if="Object.keys(info).length">
      <view class="buy-content-price">
				<view class="buy-price">
					<text class="buy-price-unit">￥</text>
					<text class="buy-price-num">{{ returnPrice }}</text>
				</view>
        <view class="buy-content-icon">
          <image  class="buy-icon" src="../../static/images/add1.png" mode="aspectFit" @click="addS(1)"></image>
          <view class="buy-num">{{ num }}</view>
          <image  class="buy-icon" src="../../static/images/add2.png" mode="aspectFit" @click="addS(2)"></image>
        </view>
			</view>
			<view class="buy-content-btn" @click="confirmBuy()">
				<text class="buy-content-btn-text">{{ info.stock == 0 ? '已售罄' :'立即购买'}}</text>
			</view>
    </view>
		<!-- 交易密码弹窗 -->
		<view class="pay-popup-model" v-if="isShowPsw" @click="closeBox">
			<view class="pay-popup-content" @click.stop="">
				<view class="pay-popup-title">输入支付密码</view>
				<view class="pay-popup-input">
					<input 
						v-for="(item,index) in inputbox"
						:key="index"
						:ref="`ref${index}`"
						class="six-input-box"
						v-model="item.value"
						type="password"
						oninput="value=value.replace(/[^\d]/g,'')"
						@input="onInput(index)"
						@keyup.delete="onDelete(index)"
						maxlength="1" />
				</view>
				<view class="pay-popup-btn" @click="buyConfirm">
					<text class="pay-popup-btn-text">确认</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const defPurchaseList = [{
	amount: "10.00",
	avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/nAoD6adj1GHx0FVzLLNfx630UcsVVG9BC9lhABU6icekeLicVLmshhKJWJOwostQUNRmjnkvbR83SGCagGshzLAA/132",
	nickname: "GPT***N",
	paid_amount: "1000.00",
	purchased_at: "2024-02-14 08:56:30"
}, {
	amount: "10.00",
	avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKjfia2bB1KmJENFR1LcMDNYuTVNDjDp1eN5coLkZd4KcCeB06L68Uwrrd1ib84dSIFckYtnicA5QaGg/132",
	nickname: "铠武",
	paid_amount: "1000.00",
	purchased_at: "2024-02-14 09:06:30"
}, {
	amount: "10.00",
	avatar: "https://h5static.kuwo.cn/upload/image/4f768883f75b17a426c95b93692d98bec7d3ee9240f77f5ea68fc63870fdb050.png",
	nickname: "林小妞",
	paid_amount: "1000.00",
	purchased_at: "2024-02-14 11:40:30"
}]
export default {
	data() {
		return {
			id:'',
			num:1,
			info: {},
			purchaseList:[],
			isShowPsw:false,
			show: false,
			collect: false,
			likeNum: 1235,
			// 安全密码支付-弹出框
			payStatus: {
				show: false,
				url: 2
			},
			goodsData: {}, //商品详情信息总和
			security_password: '',
			orderId: '',
			isDisabled:false,
			inputbox: [
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        },
        {
          value: ''
        }
      ],
      isInputError: false,

		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id
			this.getGoodsInfo()
			this.getGoodsSoldList()
		}
	},
	computed:{
		returnPrice(){
			return (Number(this.info.maxmum_investment) * Number(this.num)).toFixed(2)
		},
	},
	methods: {
		addS(type = 1){
			if (type == 1){
				if (this.num > 1){
					this.num --
				}
			} else {
				if (this.info.stock == this.num){
					return
				}
				this.num ++
			}
		},
		closeBox(){
			this.isShowPsw = false
			this.isDisabled = false
		},
		returnDayRate(item){
			return Number(Number(item.maxmum_investment) * Number(item.profit_rate/100) / item.keep_days).toFixed(2)
		},
		returnRate(item){
			const rate =  Number(Number(item.sales / (item.stock + item.sales)).toFixed(2));
			if(rate > item.virtual_progress) {
				return rate;
			}
			return item.virtual_progress;
		},
		confirmBuy(){
			if (this.info.stock == 0) {
				this.$.toast('已售罄')
				return
			}
			this.isShowPsw = true;
			this.inputbox.forEach(item => {
				item.value = ''
			})
			this.showBox()
		},
		buyConfirm(){
			if (this.isDisabled) {
				return
			}
			this.isDisabled = true
			this.$u.api.getProjectGoodsInfoOrderBuy({
				id: this.orderId,
				security_password: this.security_password
			}).then(ress => {
				if (ress.code == 200) {
					this.security_password = ''
					this.$.toast(ress.message)
					this.closeBox()
					setTimeout(() => {
						this.$.open('/pages/Special/SpecialDetailsNewOrderlog')
						this.isDisabled = false
						// this.$.back()
					},1500)
				}else{
					this.$.toast(ress.message)
					this.isDisabled = false
				}
			}).catch(err => {
				this.isDisabled = false
			})
		},
		getGoodsInfo() {
			this.$u.api.getProjectGoodsInfo({
				'id': this.id
			}).then(res => {
				if (res.code == 200) {
					const data = res.data || {}
					const projectObj = data.project || {}
					this.info = projectObj
				}
			}).catch(err => {
				this.info = {}
			})
		},
		// 获取购买动态
		getGoodsSoldList() {
			this.$u.api.getProjectGoodsSoldList({
				id: this.id,
				page: 1,
			}).then(res => {
				if (res.code == 200) {
					const data = res.data || {}
					const userList = data && data.users && data.users.data || []
					this.purchaseList = userList;
					if (this.purchaseList.length == 0) {
						this.purchaseList = defPurchaseList
						this.purchaseList.forEach(item => {
							item.paid_amount = this.returnPrice
							item.purchased_at = this.$u.formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
						})
					}
				}
			}).catch(err => {
				this.purchaseList = []
			})
		},
		// 监听弹窗打开状态
		closeMain(val) {
			this.payStatus.show = val
		},

		showBox(){
			if(this.orderId) {
				this.isShowPsw = true
				return;
			}
			if(this.isDisabled){
				return
			}
			this.$u.api.getProjectGoodsInfoOrder({
				project_id: this.id,
				total:this.num
			}).then(res => {
				if (res.code == 200) {
					this.orderId = res.data.id
					this.isDisabled = false
					this.isShowPsw = true
				}else{
					this.isDisabled = false
					this.$.toast(res.message)
				}
			}).catch(err => {
		
			})
		},
		onInput (index) {
      // index < 5 ，如果是第6格，不触发光标移动至下一个输入框。
      if (this.inputbox[index].value && index < 5) {
        this.$refs['ref' + (index + 1)][0].$el.querySelector('input').focus()
      }
      let inputValue = ''
      this.inputbox.forEach(item => {
        inputValue = inputValue + item.value
      })
			this.security_password = inputValue;
      if (inputValue.length < 6) {
        this.isInputError = true
      } else {
        this.isInputError = false
      }
    },
    onDelete (index) {
      // 如果是第1格，不触发光标移动至上一个输入框
      if (index > 0) {
        this.$refs['ref' + (index - 1)][0].$el.querySelector('input').focus()
      }
    }
	}
}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	.specia-detail-cover {
		width: 100%;
		height: 750rpx;
		position: relative;
		z-index: 1;
		.cover-img {
			width: 100%;
			height: 100%;
		}
	}
	.specia-detail-other {
		position: relative;
		z-index: 10;
		top: -30rpx;
		width: 690rpx;
		margin: 0 auto;
		.m-t-30 {
			margin-top: 30rpx;
		}
		.specia-detail-card {
			width: 100%;
			height: 390rpx;
			border-radius: 10px;
			background: #1A1B1E;
			padding: 24rpx 30rpx 30rpx;
			.specia-detail-card-title {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.item-info-name {
					font-size: 30rpx;
					font-weight: 500;
					font-family: PingFang SC;
					color: #ffffff;
					line-height: 42rpx;
				}
				.item-info-total {
					font-family: PingFang SC;
					font-size: 22rpx;
					color: rgba(255, 255, 255, 0.6);
					margin-top: 6rpx;
					line-height: 22rpx;
				}
				.item-price {
					display: flex;
					align-items: flex-end;
					.item-price-unit {
						font-family: PingFang SC;
						font-size: 24rpx;
						color: #FFC999;
						margin-bottom: 7rpx;
					}
					.item-price-num {
						font-family: PingFang SC;
						font-size: 42rpx;
						color: #FFC999;
					}
				}
			}
			.progress-bar {
				display: flex;
				align-items: center;
				margin-top: 8rpx;
				.progress-bar-bg {
					width: 279rpx;
					height: 10rpx;
					background-color: #3B3E44;
					border-radius: 5rpx;
					.progress {
						height: 10rpx;
						background-color: #00E0BD;
						border-radius: 5rpx;
					}
				}
				.progress-text {
					font-family: PingFang SC;
					font-size: 24rpx;
					color: #FFFFFF;
					margin-left: 12rpx;
					line-height: 34rpx;
				}
			}
			.specia-detail-card-content {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;
				.specia-detail-card-content-item {
					width: 144rpx;
					height: 120rpx;
					border-radius: 6rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					background: #2A2D32;
					.specia-detail-card-content-item-text {
						font-family: PingFang SC;
						font-size: 28rpx;
						color: #00FFD7;
						line-height: 39rpx;
					}
					.specia-detail-card-content-item-title {
						font-family: PingFang SC;
						font-size: 22rpx;
						color: rgba(255, 255, 255, 0.6);
						margin-top: 6rpx;
						line-height: 31rpx;
					}
				}
			}
			.specia-detail-card-tips {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				.tips-vip-icon {
					width: 74rpx;
					height: 40rpx;
				}
				.tips-limit {
					display: flex;
					margin-right: 16rpx;
					.tips-limit-tips {
						line-height: 40rpx;
						padding: 5rpx 10rpx;
						border-top-left-radius: 5rpx;
						border-bottom-left-radius: 5rpx;
						background-color: #00E0BD;
						font-family: PingFang SC;
						font-size: 22rpx;
						color: #000000;
					}
					.tips-limit-total {
						line-height: 40rpx;
						padding: 5rpx 10rpx;
						border-top-right-radius: 6rpx;
						border-bottom-right-radius: 6rpx;
						border: 1rpx solid rgba(255, 255, 255, 0.4);
						border-left-width: 0;
						font-family: PingFang SC;
						font-size: 22rpx;
						color: #FFFFFF;
					}
				}
			}
		}
		.specia-detail-purchase-list {
			width: 100%;
			border-radius: 10px;
			background: #1A1B1E;
			padding: 30rpx 0 16rpx;
			.purchase-list-title {
				font-family: PingFang SC;
				font-size: 30rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 42rpx;
				text-align: center;
			}
			.purchase-list-content {
				width: 100%;
				margin-top: 16rpx;
				.purchase-list-item {
					display: flex;
					align-items: center;
					padding: 20rpx 30rpx;
					.purchase-list-item-cover {
						width: 92rpx;
						height: 92rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-right: 16rpx;
						.purchase-list-item-cover-img {
							width: 100%;
							height: 100%;
						}
					}
					.purchase-list-item-info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						.purchase-list-item-text {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.nick-name {
								font-family: PingFang SC;
								font-size: 28rpx;
								line-height: 39rpx;
								color: #FFFFFF;
								max-width: 260rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.quantity {
								font-family: PingFang SC;
								font-size: 24rpx;
								line-height: 34rpx;
								color: #00FFD7;
							}
							.time {
								font-family: PingFang SC;
								font-size: 24rpx;
								line-height: 34rpx;
								color: rgba(255, 255, 255, 0.6);
							}
							.mount {
								font-family: PingFang SC;
								font-size: 24rpx;
								line-height: 34rpx;
								color: #FFFFFF;
							}
						}
					}
				}
				.no-data {
					display: flex;
					justify-content: center;
					font-size: 30rpx;
					font-weight: 500;
					color: rgba(255, 255, 255, 0.3);
					line-height: 42rpx;
				}
			}
		}
		.specia-detail-content {
			width: 100%;
			border-radius: 10px;
			background: #1A1B1E;
			padding: 30rpx;
			min-height: 200rpx;
			margin-bottom: 260px;
			.specia-detail-content-text {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.3);
				line-height: 42rpx;
			}
		}
	}
	.bottom-buy-content {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 260rpx;
		padding: 25rpx 30rpx 20rpx;
		background: #0D0E12;
		.buy-content-price {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.buy-price {
				display: flex;
				align-items: flex-end;
				height: 60rpx;
				.buy-price-unit {
					font-family: PingFang SC;
					font-size: 24rpx;
					color: #FFFFFF;
					margin-bottom: 7rpx;
				}
				.buy-price-num {
					font-family: PingFang SC;
					font-size: 42rpx;
					color: #FFFFFF;
				}
			}
			.buy-content-icon {
				display: flex;
				align-items: center;
				.buy-icon {
					width: 48rpx;
					height: 48rpx;
				}
				.buy-num {
					font-family: PingFang SC;
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
					margin: 0 32rpx;
				}
			}
		}
		.buy-content-btn {
			width: 670rpx;
			height: 88rpx;
			border-radius: 44rpx;
			background: #00E0BD;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
			.buy-content-btn-text {
				font-family: PingFang SC;
				font-size: 30rpx;
				font-weight: 500;
				color: #000000;
			}
		}
	}
	.pay-popup-model {
		width: 100%;
		height: 100%;
		position: fixed;
	  left: 0;
	  top: 0;
	  z-index: 999;
	  background-color: rgba(0,0,0,0.5);
		.pay-popup-content {
			width: 560rpx;
			height: 370rpx;
			border-radius: 16rpx;
			background: #1A1B1E;
			position: absolute;
			top: 50%;
			left: 50%; 
 			transform: translate(-50%, -50%);
			padding: 40rpx;
			.pay-popup-title {
				font-size: 30rpx;
				line-height: 42rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
			}
			.pay-popup-input {
				width: 480rpx;
				height: 80rpx;
				margin: 40rpx auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.six-input-box {
					width: 70rpx;
					height: 80rpx;
					border-radius: 6rpx;
					background: #2A2D32;
					text-align: center;
					border: 0;
				}
			}
			.pay-popup-btn {
				width: 480rpx;
				height: 88rpx;
				border-radius: 44rpx;
				background: #00E0BD;
				display: flex;
				justify-content: center;
				align-items: center;
				.pay-popup-btn-text {
					font-family: PingFang SC;
					font-size: 30rpx;
					font-weight: 500;
					color: #000000;
				}
			}
		}
	}
}
</style>
